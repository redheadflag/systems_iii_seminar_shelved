import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppShell from "../components/AppShell"
import { UserContext } from "../context/UserContext"
import { createCollection } from "../api/collection"


export default function AddCollection() {
    const { token, username } = useContext(UserContext)
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isPublic, setIsPublic] = useState(true)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')

        if (name === '') {
            setError('Collection name is required')
            return
        }

        try {
            await createCollection({ name, description, is_public: isPublic }, token)
            navigate(`/profile/${username}`)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <AppShell>
            <form className="collection-form" onSubmit={handleSubmit}>
                <h1 className="mb-4">New collection</h1>

                <div className="field">
                    <label>Name</label>
                    <input
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Collection name"
                    />
                </div>

                <div className="field">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="What's this collection about?"
                        rows={3}
                    />
                </div>

                <div className="field form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="collection-public"
                        checked={isPublic}
                        onChange={e => setIsPublic(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="collection-public">Public collection</label>
                </div>

                {error && (
                    <div className="field">
                        <div className="field__error" role="alert">{error}</div>
                    </div>
                )}

                <button className="btn btn-primary btn-lg" type="submit">
                    Create
                </button>
            </form>
        </AppShell>
    )
}
