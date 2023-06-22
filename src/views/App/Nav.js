import { Outlet, useNavigate } from "react-router-dom";
import { RoutePath } from "../../route/route";
import { TieredMenu } from "primereact/tieredmenu";
import { isMobile } from "react-device-detect";
import { Sidebar } from 'primereact/sidebar';
import { TabMenu } from 'primereact/tabmenu';
import { useState } from "react";

const Nav = ({ show = false, callback }) => {
  console.log(show)
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0)

  const items = [
    {
      label: "Home",
      icon: "fa-solid fa-home",
      command: () => navigate(RoutePath.HOME),
    },
  ]

  return !isMobile
    ? (
      <Sidebar visible={show} onHide={() => callback(false)}>
        <TieredMenu
          className="w-100"
          model={items}
        />

        <Outlet />
      </Sidebar>
    )
    : (
      <>
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
      </>
    )
};

export default Nav;
