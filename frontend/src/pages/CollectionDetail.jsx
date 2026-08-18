import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "../api/collection";
import AppShell from "../components/AppShell";
import CardTile from "../components/CardTile";
import EmptyCardTile from "../components/EmptyCardTile";
import { UserContext } from "../context/UserContext";

export default function CollectionDetail() {
    const collectionId = useParams().id
    const { userId } = useContext(UserContext)
    const [isOwner, setIsOwner] = useState(false)

    const [collection, setCollection] = useState()
    useEffect(() => {
        getCollection(collectionId)
            .then((res) => {
                setCollection(res)
                setIsOwner(String(res.user_id) === userId)
            })
            .catch(() => {})
    }, [collectionId, userId])

    if (!collection) {
        return null
    }

    return (
        <AppShell>
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