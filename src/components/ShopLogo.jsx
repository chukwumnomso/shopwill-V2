import shoplogo from "../assets/images/shoplogo.png";

export default function ShopLogo() {
  return (
    <div className="overflow-hidden h-15 w-30  flex justify-center items-center ">
      <img
        src={shoplogo}
        alt="shop logo"
        className="  flex item-center justify-center "
      />
    </div>
  );
}
