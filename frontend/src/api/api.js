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

async function post(path, body) {
    let response = null
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

export {
    post,
    get,
    TOKEN_KEY,
    USER_KEY
}