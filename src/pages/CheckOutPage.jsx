import { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Icon from "../components/Icon";

const CheckOutPage = () => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState(false);
  const [emailCheckbox, setEmailCheckBox] = useState(false);
  const [contactCheckbox, setContactCheckbox] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [apartment, setApartment] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderOpen, setOrderOpen] = useState(false);
  const { shoppingCart, cartTotal } = useCart();
  const { user } = useAuth();

  const localCartTotal = shoppingCart
    .map((T) => {
      return T.quantity * T.product_price;
    })
    .reduce((a, b) => a + b, 0);
  const tax = shoppingCart
    .map((T) => {
      return T.quantity * 100;
    })
    .reduce((a, b) => a + b, 0);
  return (
    <div>
      <div className="flex justify-between items-center px-4 tracking-widest uppercase text-xs h-15 border border-gray-500 bg-gray-200  md:hidden">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            setOrderOpen((prev) => !prev);
          }}
        >
          order summary <Icon name="arrowUp" className="size-4" />
        </div>
        <span className="text-sm">
          ₦
          {user
            ? (cartTotal + tax).toLocaleString()
            : (localCartTotal + tax).toLocaleString()}
        </span>
      </div>
      <div
        className={`${orderOpen ? "max-h-500" : "max-h-0"} overflow-hidden transition-height duration-300 bg-gray-200 md:h-auto md:max-h-none `}
      >
        <OrderSummary />
      </div>
      <form action="" className="border px-4 py-4 font-[jost] uppercase">
        <p>contact</p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="border h-10 w-full px-2 text-xs uppercase "
        />
        <br />
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          className="cursor-pointer"
        />
        <p>delivery</p>
        <input
          type="text"
          className="border w-full mb-2  h-10 uppercase px-2 text-xs"
          placeholder="first name"
        />
        <br />
        <input
          type="text"
          className="border w-full mb-2  h-10 uppercase px-2 text-xs"
          placeholder="last name"
        />
        <CountryDropdown
          value={country}
          onChange={(val) => {
            setCountry(val);
          }}
          className="border w-full mb-2 h-10 uppercase px-2 text-xs"
        />
        <RegionDropdown
          country={country}
          value={region}
          onChange={(val) => {
            setRegion(val);
          }}
          className="border w-full mb-2 h-10 uppercase px-2 text-xs"
        />
        <br />
        <div className="flex gap-2 mb-2 ">
          <input
            type="text"
            className="border w-full mb-2 h-10 uppercase px-2 text-xs"
            placeholder="apartment,suit etc optional"
          />
          <input
            type="text"
            className="border w-full h-10 uppercase px-2 text-xs"
            placeholder="postal code"
          />
        </div>
        <input
          type="text"
          className="border h-10 uppercase text-xs px-2 w-full"
          placeholder="phone number optional"
        />
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          className="cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CheckOutPage;
