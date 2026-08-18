import { getCollectionsByUserId } from "../api/collection"
import AppShell from "../components/AppShell"
import Collection from "../components/Collection"
import { UserContext } from "../context/UserContext"
import { useContext, useEffect, useState } from "react"

export default function ProfileDetail() {
    const { userId, token } = useContext(UserContext)
    const [collections, setCollections] = useState()

    useEffect( // load user's collections
        () => {
            getCollectionsByUserId(userId, token)
                .then(data => setCollections(data))
                .catch(() => {})
        },
        [userId, token]
    )

    return (
        <>
            <AppShell>
                {collections?.length > 0 ? (
                    <div className="grid grid--lg">
                        {collections.map(collection => (
                            <Collection key={collection.id} collection={collection} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <div className="empty__icon">
                            <span className="material-symbols-outlined">inventory_2</span>
                        </div>
                        <h3>No collections yet</h3>
                        <p>Collections you create will show up here.</p>
                    </div>
                )}
            </AppShell>
        </>
    )
}