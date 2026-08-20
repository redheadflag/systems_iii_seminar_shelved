import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCollection } from "../api/collection";
import { getUser } from "../api/user";
import AppShell from "../components/AppShell";
import CardTile from "../components/CardTile";
import EmptyCardTile from "../components/EmptyCardTile";
import { UserContext } from "../context/UserContext";

export default function CollectionDetail() {
    const collectionId = useParams().id
    const { userId } = useContext(UserContext)
    const [isOwner, setIsOwner] = useState(false)

    const [collection, setCollection] = useState()
    const [owner, setOwner] = useState()
    useEffect(() => {
        getCollection(collectionId)
            .then((res) => {
                setCollection(res)
                setIsOwner(String(res.user_id) === userId)
                return getUser(res.user_id)
            })
            .then(setOwner)
            .catch(() => {})
    }, [collectionId, userId])

    if (!collection) {
        return null
    }

    return (
        <AppShell>
            <h2 className="mb-4">{collection.name} {owner && <span>by <Link className="muted" to={`/profile/${owner.username}`}>{owner.username}</Link></span>}</h2>
            {collection.description && <p className="muted mb-4" style={{ fontSize: '2em' }}>{collection.description}</p>}
            {collection.cards.length === 0 && !isOwner ? (
                <div className="empty">
                    <div className="empty__icon">
                        <span className="material-symbols-outlined">inventory_2</span>
                    </div>
                    <h3>No cards yet</h3>
                    <p>Cards added to this collection will show up here.</p>
                </div>
            ) : (
                <div className="grid grid--wide">
                    {collection.cards.map(card => {
                        return <CardTile key={card.id} item={card} />
                    })}
                    {isOwner && <EmptyCardTile collectionId={collectionId} />}
                </div>
            )}
        </AppShell>
    )
}