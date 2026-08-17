import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "context/UserContext"

export default function AppShell({ children }) {
  const { isLogged, userId, username } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <>
      <header className="topbar">
        <div className="topbar__left">
          <Link className="brand" to="/">
            <span className="brand__name">Shelved</span>
          </Link>
        </div>
        <div className="topbar__center">
          <div className="search">
            <div className="search__field">
              <input className="search__input" placeholder="Search collections, cards..." />
            </div>
            <button className="search__btn">
              <span className="material-symbols-outlined micon">search</span>
            </button>
          </div>
        </div>

        {isLogged ? (
          <div className="topbar__right">
            <button className="icon-btn">
              <span className="material-symbols-outlined micon">notifications</span>
              <span className="icon-btn__dot">?</span>
            </button>
            <div className="avatar avatar--sm">{username.slice(0,2)}</div>
          </div>
        ) : (
          <div className="topbar__right">
            <button className="btn btn-primary btn-sm" onClick={() => navigate("/login")}>
              <span className="material-symbols-outlined micon">login</span>
              Log in
            </button>
          </div>
        )}
      </header>

      <nav className="sidebar">
        <div className="sidebar__section">
          <Link className="nav-item" to="/">
            <span className="nav-item__icon">
              <span className="material-symbols-outlined micon">home</span>
            </span>
            <span className="nav-item__label">Home</span>
          </Link>
          <Link className="nav-item" to={isLogged ? `/collections/${userId}` : "/login"}>
            <span className="nav-item__icon">
              <span className="material-symbols-outlined micon">style</span>
            </span>
            <span className="nav-item__label">My collections</span>
          </Link>
        </div>
      </nav>

      <main className="main">{children}</main>
    </>
  );
}
