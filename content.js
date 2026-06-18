const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

const hiddenSections = {};

let hideButtonSvg = '';

async function loadSvg() {
    const url = browserAPI.runtime.getURL('icons/hide-button.svg');
    const response = await fetch(url);
    hideButtonSvg = await response.text();
}

function setHidden(sections) {
    for (const key of Object.keys(hiddenSections)) {
        delete hiddenSections[key];
    }

    Object.assign(hiddenSections, sections ?? {});
}

async function persist() {
    await browserAPI.storage.local.set({ hiddenSections });
}

async function init() {
    await loadSvg();

    const result = await browserAPI.storage.local.get('hiddenSections');

    setHidden(result.hiddenSections);

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

        if (changes.hiddenSections) {
            setHidden(changes.hiddenSections.newValue);
            syncVisibility();
        }
    });
}

function syncVisibility() {
    document.querySelectorAll('section[data-module-id]').forEach(section => {
        const hidden = Object.hasOwn(hiddenSections, section.dataset.moduleId);
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

        if (Object.hasOwn(hiddenSections, sectionId)) {
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

        hiddenSections[moduleId] = clone.textContent.trim() || moduleId;

        await persist();

        section.classList.add('dhs-hidden');
    });

    title.appendChild(button);
}

init();
