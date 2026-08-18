import TileWrapper from "./TileWrapper";

export default function EmptyCardTile({ collectionId }) {
  return (
    <TileWrapper to={`/collection/${collectionId}/add`}>
      <div className="card__thumb card__thumb--plain">
        <span className="card__thumb-plus">+</span>
      </div>
    </TileWrapper>
  );
}
