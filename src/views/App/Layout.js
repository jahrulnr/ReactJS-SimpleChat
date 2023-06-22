import React, { useRef, useState } from "react"
import Nav from "./Nav"
import { Auth } from "../../services/cookie"
import { Toast } from "primereact/toast"

function Layout({ children }) {
  const toast = useRef(null)
  const [showNav, setNav] = useState(false)
  const navUpdate = (show) => {
    setNav(show)
  }

  const Logout = (e) => {
    toast.current.show({ severity: 'success', detail: 'Sampai jumpa lagi!' })

    Auth().remove()
  }

  return (
    <div className="wrapper">
      <Toast ref={toast} />
      <div className="card bg-dark">
        <Nav show={showNav} callback={navUpdate} />
      </div>
      <div className="main">
        <nav className="navbar navbar-expand navbar-light navbar-bg">
          <a className="sidebar-toggle" onClick={() => setNav(true)} href="#!">
            <i className="hamburger align-self-center"></i>
          </a>

          <div className="navbar-collapse">
            <ul className="navbar-nav navbar-align">
              <li className="nav-item dropdown">
                <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#!"
                  data-bs-toggle="dropdown">
                  <i className="align-middle" data-feather="settings"></i>
                </a>
                <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#!"
                  data-bs-toggle="dropdown">
                  <i className="fas fa-user me-1"></i>
                  <span className="text-dark mx-1">{Auth().get().name}</span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#!">
                    <i className="align-middle me-1" data-feather="user"></i> Profil</a>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" href="#!" onClick={Logout}>Keluar</button>
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