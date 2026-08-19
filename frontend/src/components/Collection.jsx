import { Link } from "react-router-dom";

export default function Collection({ collection }) {
  let cardCount = 0
  if (collection.cards && collection.cards.length > 0) {
    cardCount = collection.cards.length
  }

  return (
    <div className="tile">
      <Link className="card__link" to={`/collection/${collection.id}`}>
        <div className="cover cover--card">
          <div className="cover__badges">
            <span className="cover__badge">{cardCount} item{cardCount === 1 ? '' : 's'}</span>
            <span className="cover__visibility">{collection.is_public ? 'Public' : 'Private'}</span>
          </div>
        </div>
        <div className="card__body">
          <div className="card__meta">
            <div className="card__title truncate">{collection.name}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
