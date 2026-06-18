const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

const list = document.getElementById('dhs-list');
const empty = document.getElementById('dhs-empty');

let hiddenModules = [];
let moduleTitles = {};

async function render() {
    const result = await browserAPI.storage.local.get(['hiddenModules', 'moduleTitles']);

    hiddenModules = result.hiddenModules ?? [];
    moduleTitles = result.moduleTitles ?? {};

    list.textContent = '';
    empty.hidden = hiddenModules.length > 0;

    for (const id of hiddenModules) {
        const text = moduleTitles[id] ?? id;

        const item = document.createElement('li');

        const label = document.createElement('span');
        label.className = 'dhs-title';
        label.textContent = text;
        label.title = text;

        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Show';
        button.addEventListener('click', () => unhide(id, item));

        item.append(label, button);
        list.appendChild(item);
    }
}

async function unhide(id, item) {
    hiddenModules = hiddenModules.filter(entry => entry !== id);
    delete moduleTitles[id];

    item.remove();
    empty.hidden = hiddenModules.length > 0;

    await browserAPI.storage.local.set({
        hiddenModules,
        moduleTitles,
    });
}

render();
