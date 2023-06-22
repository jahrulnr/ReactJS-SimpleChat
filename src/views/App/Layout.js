import React, { useState } from "react"
import { isMobile } from "react-device-detect";
import { Sidebar } from 'primereact/sidebar';
import Nav from "./Nav"
import { Auth } from "../../services/cookie"

function Layout({children}) {

  const [showNav, setShowNav] = useState(!isMobile)

  const Logout = (e) => {
    Auth().remove()

    setTimeout(() => {window.location.reload()}, 1000)
  }

  return (
    <div className="wrapper">

      <div className="card bg-dark">
        <Sidebar visible={showNav} onHide={() => setShowNav(false)}>
          <Nav />
        </Sidebar>
      </div>
      <div className="main">
        <nav className="navbar navbar-expand navbar-light navbar-bg">
          <a className="sidebar-toggle" onClick={() => setShowNav(true)} href={undefined}>
            <i className="hamburger align-self-center"></i>
          </a>

          <div className="navbar-collapse">
            <ul className="navbar-nav navbar-align">
              <li className="nav-item dropdown">
                <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href={undefined}
                  data-bs-toggle="dropdown">
                  <i className="align-middle" data-feather="settings"></i>
                </a>
                <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href={undefined}
                  data-bs-toggle="dropdown">
                  <i className="fas fa-user me-1"></i>
                  <span className="text-dark mx-1">{Auth().get().name}</span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#profil">
                    <i className="align-middle me-1" data-feather="user"></i> Profil</a>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" href={undefined} onClick={Logout}>Keluar</button>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <main className="content">
          <div className="container-fluid p-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout