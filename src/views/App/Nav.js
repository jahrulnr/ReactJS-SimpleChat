import { Outlet, Link, useNavigate } from "react-router-dom";
import { RoutePath } from "../../route/route";
import { PanelMenu } from "primereact/panelmenu";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <>
      <PanelMenu
        model={[
          {
            label: "Home",
            icon: "fa-solid fa-home",
            command: () => navigate(RoutePath.HOME),
          },
        ]}
      />

      <Outlet />
    </>
  );
};

export default Nav;
