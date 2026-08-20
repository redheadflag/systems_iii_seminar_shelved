import Comment from "./Comment"

export default function CommentList({comments}) {
    return (
        <div className="comments">
            <h3 className="comments__head" >{comments?.length} Comment{comments?.length === 1 ? '' : 's'}</h3>
            {comments && (
                    comments.map((e) => {
                        return (
                            <Comment user = {e.user} text = {e.comment} />
                        )
                    }
                )
            )}
        </div>
    )
}