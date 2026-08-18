const API_BASE_URL = process.env.REACT_APP_API_URL || ''  // TODO: maybe move to api/config.js

const TOKEN_KEY = 'app-token'
const USER_KEY = 'app-userId'


async function get(path, jwt=null) {
    let response = null
    let headers = {
        'Content-Type': 'application/json'
    }
    if (jwt !== null) {
        headers = {
            ...headers,
            'Authorization': `Bearer ${jwt}`
        }
    }
    try {
        response = await fetch(
            `${API_BASE_URL}${path}`,
            {
                method: "GET",
                headers,
            }
        )
    } catch (err) {
        throw new Error('Could not reach the server')
    }

    let data = {}
    try {
        data = await response.json()
    } catch(_) {}

    if (!response.ok) {
        throw new Error(data.error || `Request failed (${response.status})`)
    }
    return data
}

async function post(path, body, jwt=null) {
    let headers = {
        'Content-Type': 'application/json'
    }
    if (jwt !== null) {
        headers = {
            ...headers,
            'Authorization': `Bearer ${jwt}`
        }
    }

    let response = null
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        })
    } catch (err) {
        throw new Error('Could not reach the server')
    }

    let data = {}
    try {
        data = await response.json()
    } catch (_) {}

    if (!response.ok) {
        throw new Error(data.error || `Request failed (${response.status})`)
    }
    return data
}

async function postMedia(file, jwt=null) {
    let headers = {}
    if (jwt !== null) {
        headers = {
            'Authorization': `Bearer ${jwt}`
        }
    }

    let response = null
    const formData = new FormData()
    formData.append('image', file)

    try {
        response = await fetch(`${API_BASE_URL}/media`, {
        method: 'POST',
        headers,
        body: formData,
        })
    } catch (err) {
        throw new Error('Could not reach the server')
    }

    let data = {}
    try {
        data = await response.json()
    } catch (_) {}

    if (!response.ok) {
        throw new Error(data.error || `Request failed (${response.status})`)
    }
    return data
}

function getMediaUrl(id) {
    return `${API_BASE_URL}/media/${id}`
}

export {
    post,
    postMedia,
    get,
    getMediaUrl,
    TOKEN_KEY,
    USER_KEY
}