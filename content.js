const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

const hiddenModules = new Set();
const moduleTitles = {};

let hideButtonSvg = '';

async function loadSvg() {
    const url = browserAPI.runtime.getURL('icons/hide-button.svg');
    const response = await fetch(url);
    hideButtonSvg = await response.text();
}

function setHidden(ids) {
    hiddenModules.clear();

    for (const id of ids ?? []) {
        hiddenModules.add(id);
    }
}

async function persist() {
    await browserAPI.storage.local.set({
        hiddenModules: [...hiddenModules],
        moduleTitles,
    });
}

async function init() {
    await loadSvg();

    const result = await browserAPI.storage.local.get(['hiddenModules', 'moduleTitles']);

    setHidden(result.hiddenModules);
    Object.assign(moduleTitles, result.moduleTitles ?? {});

    processSections();

    const observer = new MutationObserver(() => {
        processSections();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    browserAPI.storage.onChanged.addListener((changes, area) => {
        if (area !== 'local') {
            return;
        }

        if (changes.moduleTitles) {
            for (const key of Object.keys(moduleTitles)) {
                delete moduleTitles[key];
            }

            Object.assign(moduleTitles, changes.moduleTitles.newValue ?? {});
        }

        if (changes.hiddenModules) {
            setHidden(changes.hiddenModules.newValue);
            syncVisibility();
        }
    });
}

function syncVisibility() {
    document.querySelectorAll('section[data-module-id]').forEach(section => {
        const hidden = hiddenModules.has(section.dataset.moduleId);
        section.classList.toggle('dhs-hidden', hidden);
    });
}

function processSections() {
    document.querySelectorAll('section.channel-section, section[data-testid="deezer-generic-section"]').forEach(section => {
        const moduleLink = section.querySelector('a[href^="/channels/module/"]');

        let sectionId;

        if (moduleLink) {
            sectionId = moduleLink.getAttribute('href');
        } else {
            const title = section.querySelector('h2');

            if (!title) {
                return;
            }

            sectionId = title.textContent.trim();
        }

        section.dataset.moduleId = sectionId;

        if (hiddenModules.has(sectionId)) {
            section.classList.add('dhs-hidden');
        }

        addButton(section, sectionId);
    });
}

function addButton(section, moduleId) {
    const title = section.querySelector('h2[data-testid="section_title"]');

    if (!title) {
        return;
    }

    if (title.querySelector('.dhs-hide-button')) {
        return;
    }

    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'dhs-hide-button';
    button.innerHTML = hideButtonSvg;
    button.title = 'Hide this section';

    button.addEventListener('click', async event => {
        event.preventDefault();
        event.stopPropagation();

        const clone = title.cloneNode(true);
        clone.querySelectorAll('.dhs-hide-button, .chakra-button, a, button').forEach(el => el.remove());

        hiddenModules.add(moduleId);
        moduleTitles[moduleId] = clone.textContent.trim() || moduleId;

        await persist();

        section.classList.add('dhs-hidden');
    });

    title.appendChild(button);
}

init();
