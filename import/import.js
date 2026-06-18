const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

const status = document.getElementById('dhs-status');
const pickButton = document.getElementById('dhs-pick');
const fileInput = document.getElementById('dhs-file');

function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle('dhs-error', isError);
    status.hidden = !message;
}

async function importData(file) {
    let parsed;

    try {
        parsed = JSON.parse(await file.text());
    } catch {
        setStatus('Invalid JSON file.', true);
        return;
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        setStatus('Invalid file: expected an { id: title } object.', true);
        return;
    }

    const result = await browserAPI.storage.local.get('hiddenSections');
    const hiddenSections = result.hiddenSections ?? {};

    const importedIds = Object.keys(parsed);

    for (const id of importedIds) {
        hiddenSections[id] = typeof parsed[id] === 'string' ? parsed[id] : id;
    }

    await browserAPI.storage.local.set({ hiddenSections });

    setStatus(`Imported ${importedIds.length} section(s). You can close this tab.`);
}

pickButton.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];

    if (file) {
        await importData(file);
    }

    fileInput.value = '';
});
