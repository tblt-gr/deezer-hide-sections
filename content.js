const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

const hiddenModules = new Set();

let hideButtonSvg = '';

async function loadSvg() {
    const url = browserAPI.runtime.getURL('icons/hide-button.svg');
    const response = await fetch(url);
    hideButtonSvg = await response.text();
}

async function init() {
    await loadSvg();

    const result = await browserAPI.storage.local.get(['hiddenModules']);

    for (const id of result.hiddenModules ?? []) {
        hiddenModules.add(id);
    }

    processSections();

    const observer = new MutationObserver(() => {
        processSections();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
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

        hiddenModules.add(moduleId);

        await browserAPI.storage.local.set({
            hiddenModules: [...hiddenModules],
        });

        section.classList.add('dhs-hidden');
    });

    title.appendChild(button);
}

init();
