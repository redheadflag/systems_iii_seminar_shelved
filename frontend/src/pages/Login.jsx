import { Link, useNavigate } from "react-router-dom"
import { login } from "../api/auth.js"
import { useState } from "react"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await login(username, password)
            navigate("/")
        }
        catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            <div className="auth view-enter">
                <div className="auth__card">
                    <div className="auth__brand">
                        <div>
                            <h1 className="auth__title">Shelved</h1>
                            <div className="auth__subtitle">Login page</div>
                        </div>
                    </div>
                    <form className="auth__panel" onSubmit={handleSubmit}>
                        <div className="field">
                            <input
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="field">
                            <input
                                className="form-control"
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            
                            </input>
                        </div>
                        {error && (
                            <div className="field">
                                <div className="field__error" role="alert">
                                {error}
                                </div>
                            </div>
                        )}
                        <button
                            className="btn btn-primary btn-block btn-lg"
                            type="submit"
                        >
                            Sign in
                        </button>
                    </form>
                    <div className="auth__foot">
                        <div>
                            You don't have an account? Click <Link to="/sign-up">here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}