import { getMediaUrl } from "../api/api";
import TileWrapper from "./TileWrapper";

export default function CardTile({ item }) {
  return (
    <TileWrapper to={`/items/${item.id}`}>
      <div className="card__thumb">
        {item.picture_media_id && (
          <img src={getMediaUrl(item.picture_media_id)} alt={item.title} />
        )}
      </div>
      <div className="card__body">
        <div className="card__meta">
          <div className="card__title truncate">{item.title}</div>
        </div>
      </div>
    </TileWrapper>
  );
}
