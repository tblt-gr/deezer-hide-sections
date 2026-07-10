const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

const list = document.getElementById('dhs-list');
const empty = document.getElementById('dhs-empty');
const status = document.getElementById('dhs-status');
const exportButton = document.getElementById('dhs-export');
const importButton = document.getElementById('dhs-import');

let hiddenSections = {};

async function render() {
    const result = await browserAPI.storage.local.get('hiddenSections');

    hiddenSections = result.hiddenSections ?? {};

    const scrollTop = list.scrollTop;

    list.textContent = '';

    const ids = Object.keys(hiddenSections);
    empty.hidden = ids.length > 0;

    for (const id of ids) {
        const value = hiddenSections[id];
        const text = getTitle(value, id);
        const hidden = isHidden(value);

        const item = document.createElement('li');
        item.classList.toggle('dhs-shown', !hidden);

        const label = document.createElement('span');
        label.className = 'dhs-title';
        label.textContent = text;
        label.title = text;

        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = hidden ? 'Show' : 'Hide';
        button.addEventListener('click', () => toggle(id));

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'dhs-remove';
        removeButton.textContent = '×';
        removeButton.title = 'Remove from list';
        removeButton.addEventListener('click', () => remove(id));

        item.append(label, button, removeButton);
        list.appendChild(item);
    }

    list.scrollTop = scrollTop;
}

function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle('dhs-error', isError);
    status.hidden = !message;
}

function exportData() {
    const data = JSON.stringify(hiddenSections, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const date = new Date().toISOString().slice(0, 10);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `deezer-hidden-sections-${date}.json`;
    anchor.click();

    URL.revokeObjectURL(url);

    setStatus(`Exported ${Object.keys(hiddenSections).length} section(s).`);
}

function openImport() {
    browserAPI.tabs.create({ url: browserAPI.runtime.getURL('import/import.html') });
}

async function toggle(id) {
    const value = hiddenSections[id];
    const title = getTitle(value, id);

    hiddenSections[id] = { title, hidden: !isHidden(value) };

    await browserAPI.storage.local.set({ hiddenSections });
}

async function remove(id) {
    delete hiddenSections[id];

    await browserAPI.storage.local.set({ hiddenSections });
}

exportButton.addEventListener('click', exportData);
importButton.addEventListener('click', openImport);

browserAPI.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.hiddenSections) {
        render();
    }
});

render();
