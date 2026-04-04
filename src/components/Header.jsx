import Icon from "./Icon";
import ShopLogo from "./ShopLogo";
import CartIcon from "./CartIcon";
import Button from "./Button";

export default function Header() {
  return (
    <>
      <div className="bg-black h-6  text-white text-[0.6rem] flex items-center justify-center font-[montserrat] uppercase font-semibold sticky -top-7 left-0 z-50 w-full">
        <p> make purchase@shopwill</p>
      </div>
      <div className="flex justify-between px-4 h-20 items-center sticky top-0 left-0 z-50 w-full bg-white">
        <div className="flex gap-6 justify-between items-center">
          <Button>
            <Icon name="menu" />
          </Button>
          <ShopLogo />
        </div>
        <div className="flex gap-6 items-center ">
          <Button>
            <Icon name="user" />
          </Button>
          <Button>
            <CartIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
