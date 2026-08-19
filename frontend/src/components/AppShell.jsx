import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import UserProfile from "./UserProfile"

export default function AppShell({ children }) {
  const { isLogged, username } = useContext(UserContext)
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
            <UserProfile variant="topbar" user={{ username }} />
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
          <Link className="nav-item" to={isLogged ? `/profile/${username}` : "/login"}>
            <span className="nav-item__icon">
              <span className="material-symbols-outlined micon">person</span>
            </span>
            <span className="nav-item__label">My profile</span>
          </Link>
          {isLogged && (
            <Link className="nav-item" to="/collections/new">
              <span className="nav-item__icon">
                <span className="material-symbols-outlined micon">add</span>
              </span>
              <span className="nav-item__label">Add collection</span>
            </Link>
          )}
        </div>
      </nav>

      <main className="main">
        <div className="page">{children}</div>
      </main>
    </>
  );
}
