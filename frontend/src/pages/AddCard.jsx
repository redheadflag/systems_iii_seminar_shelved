import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppShell from "../components/AppShell";
import { createCard } from "../api/card";
import { getCollection } from "../api/collection";
import { postMedia } from "../api/api";

export default function AddCard() {
    const { collectionId } = useParams()
    const [collection, setCollection] = useState(null)

    const { token, userId } = useContext(UserContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isTradeable, setIsTradeable] = useState(false)
    const [pictureFile, setPictureFile] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        getCollection(collectionId, token)
            .then((res) => {
                setCollection(res)
            })
            .catch(() => { })
    }, [collectionId, token])

    function handlePictureChange(e) {
        setPictureFile(e.target.files[0] ?? null)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')

        if (title === '') {
            setError('Card name is required')
            return
        }

        try {
            let picture_media_id = null
            if (pictureFile) {
                const media = await postMedia(pictureFile, token)
                picture_media_id = media.id
            }

            const card = await createCard({
                collection_id: collectionId,
                title,
                description,
                picture_media_id,
                is_tradeable: isTradeable,
            }, token)
            navigate(`/item/${card.id}`)
        } catch (err) {
            setError(err.message)
        }
    }

    if (!collection) {
        return <AppShell>
            Collection not found:(
        </AppShell>
    }

    if (collection && (String(collection.user_id) !== userId)) {
        console.log(collection)
        console.log(collection.user_id)
        console.log(userId)
        return (
            <AppShell>
                <h2>You cannot create items for collections of other users!</h2>
                <button className="btn btn-primary btn-sm" onClick={() => navigate(`/collection/${collectionId}`)}>Go back</button>
            </AppShell>
        )
    }

    return (
        <AppShell>
            <form className="add-form" onSubmit={handleSubmit}>
                <h1 className="mb-2">Add Card</h1>
                <h3 className="mb-4">For <Link className="add_card__sub" to={`/collection/${collectionId}`}><code>{ collection.name }</code></Link> collection</h3>

                <div className="field">
                    <label>Name</label>
                    <input
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Card name"
                    />
                </div>

                <div className="field">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description of the card"
                        rows={6}
                    />
                </div>

                <div className="field">
                    <label>Picture</label>
                    <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        onChange={handlePictureChange}
                    />
                </div>

                <div className="field form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="card-tradeable"
                        checked={isTradeable}
                        onChange={e => setIsTradeable(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="card-tradeable">Tradeable</label>
                </div>

                {error && (
                    <div className="field">
                        <div className="field__error" role="alert">{error}</div>
                    </div>
                )}

                <button className="btn btn-primary btn-lg" type="submit">
                    Add card
                </button>
            </form>
        </AppShell>
    )
}