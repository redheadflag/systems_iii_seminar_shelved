import { Link } from "react-router-dom";

export default function TileWrapper({ to, children }) {
  return (
    <div className="tile">
      <Link className="card__link" to={to}>
        {children}
      </Link>
    </div>
  );
}
