import { Outlet, useNavigate } from "react-router-dom";
import { RoutePath } from "../../route/route";
import { TieredMenu } from "primereact/tieredmenu";
import { Sidebar } from 'primereact/sidebar';

const Nav = ({ show = false, callback }) => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      icon: "fa-solid fa-home",
      command: () => {
        navigate(RoutePath.HOME)
        callback(false)
      },
    },
  ]

  return (
    <Sidebar visible={show} onHide={() => callback(false)}>
      <TieredMenu
        className="w-100"
        model={items}
      />

      <Outlet />
    </Sidebar>
  )
};

export default Nav;
