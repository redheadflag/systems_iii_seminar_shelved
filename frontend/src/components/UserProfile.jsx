import { getMediaUrl } from "../api/api"
import { colorFromString } from "../utils/color"

export default function UserProfile({ user, variant = "topbar", className = "", showName = true }) {
    if (!user?.username) return null

    const { username, profile } = user
    const mediaId = profile?.avatar_media_id

    let avatarStyleClass
    if (variant === "topbar")
        avatarStyleClass = "avatar--sm"
    else if (variant === "profile")
        avatarStyleClass = "avatar--xl"
    else if (variant === "comment")
        avatarStyleClass = "avatar--md"

    return (
        <div className={`user-profile user-profile--${variant} ${className}`.trim()}>
            <div
                className={`avatar ${avatarStyleClass}`}
                style={mediaId ? undefined : { background: colorFromString(username), color: '#fff' }}
            >
                {mediaId ? (
                    <img src={getMediaUrl(mediaId)} alt={username} />
                ) : username.slice(0, 2)}
            </div>
            {showName && <span className="user-profile__name">{username}</span>}
        </div>
    )
}
