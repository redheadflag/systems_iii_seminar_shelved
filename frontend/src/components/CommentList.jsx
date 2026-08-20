import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import Comment from "./Comment"
import UserProfile from "./UserProfile"

export default function CommentList({ comments, handleCommentSubmit }) {
    const { isLogged, username } = useContext(UserContext)
    const [text, setText] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await handleCommentSubmit(text)
            setText('')
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="comments">
            <h3 className="comments__head">{comments?.length} Comment{comments?.length === 1 ? '' : 's'}</h3>

            {isLogged && (
                <form className="comment-compose" onSubmit={handleSubmit}>
                    <UserProfile user={{ username }} variant="comment" />
                    <div className="comment-compose__body">
                        <textarea
                            className="comment-input"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder="Add a comment..."
                            rows={2}
                        />
                        <div className="comment-compose__actions">
                            <button className="btn btn-primary btn-sm" type="submit">
                                Post
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {comments && comments.map((e) => (
                <Comment key={e.id} user={e.user} text={e.comment} />
            ))}
        </div>
    )
}
