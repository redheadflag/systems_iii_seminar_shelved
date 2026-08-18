import { useContext, useState } from "react";
import CredentialsFormShell from "../components/CredentialsFormShell";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { handleRegistration } = useContext(UserContext)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await handleRegistration(username, password)
            navigate("/")
        }
        catch (err) {
            setError(err.message)
        }
    }

    return (
        <CredentialsFormShell pageTitle={"Register"}>
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
                    Register
                </button>
            </form>
        </CredentialsFormShell>
    )
}