import { Outlet, Link } from "react-router-dom";
import appConfig from "../../config/app";
import { RoutePath } from "../../route/route";

const Nav = () => {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <Link to={RoutePath.HOME} className="sidebar-brand">
          <span className="align-middle">{appConfig.NAME}</span>
        </Link>

        <ul className="sidebar-nav">
          <li className="sidebar-header">
            Menu
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to={RoutePath.HOME}>
              <i className="align-middle fa-solid fa-envelope"></i> <span
                className="align-middle">Pesan</span>
            </Link>
          </li>
        </ul>

        <Outlet />
      </div>
    </nav>
  )
};

export default Nav;
