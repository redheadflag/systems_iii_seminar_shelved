import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCard } from "../api/card";
import { createComment } from "../api/comment";
import { getMediaUrl } from "../api/api";
import AppShell from "../components/AppShell";
import CommentList from "../components/CommentList";
import { UserContext } from "../context/UserContext";

export default function CardDetail() {
    const cardId = useParams().id
    const { token, userId } = useContext(UserContext)

    const [item, setItem] = useState()
    useEffect(() => {
        getCard(cardId)
            .then((res) => setItem(res))
            .catch(() => {})
    }, [cardId])

    async function handleCommentSubmit(text) {
        await createComment({ card_id: cardId, user_id: userId, comment: text }, token)
        const updatedCard = await getCard(cardId)
        setItem(updatedCard)
    }

    if (!item) {
        return null
    }
    // TODO: hide private items and collections

    return (
        <AppShell>
            <div className="watch">
                <div>
                    <h1 className="watch__title">{item.title}</h1>
                    <Link className="card__sub watch__collection" to={`/collection/${item.collection_id}`}>
                        {item.collection_name}
                    </Link>
                    <div className="watch__media">
                        {item.picture_media_id && (
                            <img src={getMediaUrl(item.picture_media_id)} alt={item.title} />
                        )}
                    </div>
                    <div className="watch__desc">
                        <div className="watch__desc-meta">
                            <span>{new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span className="watch__like">
                                <span className="material-symbols-outlined micon">favorite</span>
                                {item.card_likes.length}
                            </span>
                        </div>
                        {item.description && <p>{item.description}</p>}
                    </div>
                    <CommentList comments={item.comments} handleCommentSubmit={handleCommentSubmit} />
                </div>
            </div>
        </AppShell>
    )
}
