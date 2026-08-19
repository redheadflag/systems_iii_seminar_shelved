import { getCollectionsByUserId } from "../api/collection"
import { getUserByUsername } from "../api/user"
import AppShell from "../components/AppShell"
import Collection from "../components/Collection"
import UserProfile from "../components/UserProfile"
import { UserContext } from "../context/UserContext"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ProfileDetail() {
    const { username } = useParams()
    const { token } = useContext(UserContext)
    const [profileUser, setProfileUser] = useState(null)
    const [collections, setCollections] = useState()

    useEffect(
        () => {
            getUserByUsername(username, token)
                .then(data => setProfileUser(data))
                .catch(() => {})
        },
        [username, token]
    )

    useEffect(
        () => {
            if (!profileUser) return

            getCollectionsByUserId(profileUser.id, token)
                .then(data => setCollections(data))
                .catch(() => {})
        },
        [profileUser, token]
    )

    return (
        <>
            <AppShell>
                <UserProfile variant="profile" user={profileUser} className="mb-2" />

                {profileUser && (
                    <p className="muted text-center mb-4">
                        {profileUser.followers_count} followers · {profileUser.following_count} following
                    </p>
                )}

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