function isHidden(value) {
    if (value === null || value === undefined) {
        return false;
    }

    return typeof value === 'string' ? true : Boolean(value.hidden);
}

function getTitle(value, id) {
    return (typeof value === 'string' ? value : value?.title) || id;
}

function normalizeSection(value, id) {
    if (typeof value === 'string') {
        return { title: value, hidden: true };
    }

    if (value && typeof value === 'object') {
        return { title: value.title || id, hidden: value.hidden !== false };
    }

    return { title: id, hidden: true };
}