import { post, TOKEN_KEY, USER_KEY } from "./api"

async function login(username, password) {
    const data = await post('/user/login', { username, password })
    console.log(data)
    persistSession(data)
    return data
}

function persistSession({ token, user_id }) {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    if (user_id != null) localStorage.setItem(USER_KEY, String(user_id))
}

function isLogged() {
    return localStorage.getItem(TOKEN_KEY) !== null
}


export {
    login,
    isLogged,
}
