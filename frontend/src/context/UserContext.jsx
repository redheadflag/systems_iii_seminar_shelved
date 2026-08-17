import { login } from "../api/auth.js"
import { getUser } from "../api/user.js"
import { USER_KEY, TOKEN_KEY } from "../api/api.js"
import { createContext, useEffect, useMemo, useState } from "react"

const UserContext = createContext(null)

function UserProvider({children}) {
    const [userId, setUserId] = useState(() => localStorage.getItem(USER_KEY))
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
    const [username, setUsername] = useState(String())

    useEffect(() => {
        if (!token || !userId || username) return

        getUser(userId, token)
            .then(data => setUsername(data.username))
            .catch(() => {})
    }, [token, userId, username])

    async function handleLogin(username, password) {
        const data = await login(username, password)
        setUserId(String(data.user_id))
        setToken(data.token)
        setUsername(username)
    }

    function handleLogout() {
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(TOKEN_KEY)
        setUserId(null)
        setToken(null)
        setUsername(null)
    }

    const value = useMemo(
        () => ({ userId, token, username, isLogged: token !== null, handleLogin, handleLogout }),
        [userId, username, token]
    )

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}

export {
    UserProvider,
    UserContext,
}
