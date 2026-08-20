import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function Comment({ user, text }) {
    return (
        <div className="comment">
            <Link to={`/profile/${user?.username}`}>
                <UserProfile user={user} variant="comment" showName={false} />
            </Link>
            <div className="comment__body">
                <Link className="comment__author" to={`/profile/${user?.username}`}>{user?.username}</Link>
                <p className="comment__text">{text}</p>
            </div>
        </div>
    )
}