import UserProfile from "./UserProfile";

export default function Comment({ user, text }) {
    return (
        <div className="comment">
            <UserProfile user={user} variant="comment" />
            <div className="comment__body">
                <p className="comment__text">{text}</p>
            </div>
        </div>
    )
}