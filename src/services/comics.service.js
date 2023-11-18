function createCommicService() {
    const baseUrl = '/api/comics';
    const headers = {
        'Content-Type': 'application/json',
    };
    async function getMany(page, limit = 5) {
        let url = `${baseUrl}?page=${page}&limit=${limit}`;
        return await fetch(url).then((res) => res.json());
    }
    async function create(comic) {
        return await fetch(baseUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(comic),
        }).then((res) => res.json());
    }
    async function deleteAll() {
        return await fetch(baseUrl, {
            method: 'DELETE',
    }).then((res) => res.json());
    }
    async function getOne(id) {
        return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
    }
    async function update(id, comic) {
        return await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(comic),
    }).then((res) => res.json());
    }
    async function deleteOne(id) {
        return await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
    }).then((res) => res.json());
    }
    return {
        getMany,
        deleteAll,
        getOne,
        create,
        update,
        deleteOne,
    };
}

export default createCommicService();