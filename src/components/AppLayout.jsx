import { Outlet } from "react-router-dom";

import Header from "./Header";
import PopUp from "./PopUp";
import { usePopUp } from "../context/PopUpContext";
import SideCart from "./SideCart";
import MobileNav from "./MobileNav";

const AppLayout = () => {
  const { carted, notUser } = usePopUp();

  return (
    <div>
      <PopUp>
        {carted && <p>Item added to cart</p>}
        {notUser && (
          <p>
            You must login or create an account to save product to your wish
            list!
          </p>
        )}
      </PopUp>
      <Header />
      <SideCart />
      <MobileNav />
      <Outlet />
    </div>
  );
};

export default AppLayout;
