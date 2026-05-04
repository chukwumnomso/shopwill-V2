import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import supabase from "./supabaseClient";

const ContactForm = () => {
  const { user } = useAuth();
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [emailCheckBox, setEmailCheckBox] = useState(false);
  const [contactCheckBox, setContactCheckBox] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [apartment, setApartment] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const { shoppingCart, ClearCart, cartTotal } = useCart();

  const navigate = useNavigate();

  const localCartTotal = shoppingCart
    .map((T) => {
      return Number(T.quantity) * Number(T.product_price);
    })
    .reduce((a, b) => a + b, 0);
  const tax = shoppingCart
    .map((T) => {
      return Number(T.quantity) * 100;
    })
    .reduce((a, b) => a + b, 0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const validateForm = () => {
    if (!email) {
      alert("Enter email");
      return false;
    }
    if (!firstName) {
      alert("Enter first name");
      return false;
    }
    if (!lastName) {
      alert("Enter last name");
      return false;
    }
    if (!country) {
      alert("Select country");
      return false;
    }
    if (!region) {
      alert("Select region");
      return false;
    }

    return true;
  };

  const saveInformation = async () => {
    if (contactCheckBox && user) {
      const { error } = await supabase
        .from("contact_info")
        .upsert(
          {
            user_id: user?.id,
            email: email,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            country: country,
            region: region,
            apartment: apartment,
            postal_code: postalCode,
            updated_at: new Date(),
          },
          { onConflict: "user_id" },
        )
        .select();
      if (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchShippingInfo = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("contact_info")
          .select("*")
          .eq("user_id", user?.id)
          .single();
        if (!error) {
          setEmail(data.email);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setCountry(data.country);
          setRegion(data.region);
          setApartment(data.apartment);
          setPostalCode(data.postal_code);
          setPhoneNumber(data.phone_number);
        }
      }
    };
    fetchShippingInfo();
  }, [user]);

  const handlePayment = () => {
    if (!validateForm()) return;

    const savedInfo = { first_name: firstName, email: email };
    localStorage.setItem("info", JSON.stringify(savedInfo));

    setIsProcessing(true);

    const reference = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: `${user ? (cartTotal + tax) * 100 : (localCartTotal + tax) * 100}`,
      ref: reference,

      metadata: {
        user_id: user?.id,
        customer_name: `${firstName} ${lastName}`,
        phone: phoneNumber,
        country: country,
        region: region,
        apartment: apartment,
        postal_code: postalCode,
        cart_items: JSON.stringify(shoppingCart),
      },
      callback: (response) => {
        ClearCart();

        setEmail("");
        setFirstName("");
        setLastName("");
        setCountry("");
        setRegion("");
        setApartment("");
        setPostalCode("");
        setPhoneNumber("");
        setEmailCheckBox(false);
        setContactCheckBox(false);

        saveInformation();
        setOrderComplete(true);
        setIsProcessing(false);
      },
      onClose: () => {
        setIsProcessing(false);
      },
    });

    handler.openIframe();
  };

  if (orderComplete) {
    const getInfo = JSON.parse(localStorage.getItem("info"));
    console.log;
    return (
      <div className="border px-4 py-8 text-center font-[jost] justify-self-center">
        <div className="text-green-600 text-2xl mb-4">✓</div>
        <h2 className="text-xl uppercase mb-2">Payment Successful!</h2>
        <p className="text-sm text-gray-600">
          Thank you {getInfo.first_name}. Confirmation sent to {getInfo.email}
        </p>
        <button
          onClick={() => {
            setOrderComplete(false);
            navigate("/");
          }}
          className="mt-4 bg-black text-white px-6 py-2 cursor-pointer"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="px-4">
      <form className="  py-4 font-[jost] uppercase text-sm">
        <p className="font-bold mb-2">contact</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          className="border h-10 w-full px-2 text-xs uppercase"
          required
        />

        <div className="flex items-center gap-2 my-2">
          <input
            checked={emailCheckBox}
            onChange={(e) => setEmailCheckBox(e.target.checked)}
            type="checkbox"
            className="cursor-pointer"
          />
          <label className="text-xs">Subscribe to newsletter</label>
        </div>

        <p className="font-bold mt-4 mb-2">delivery</p>

        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          className="border w-full mb-2 h-10 uppercase px-2 text-xs"
          placeholder="first name"
          required
        />

        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          className="border w-full mb-2 h-10 uppercase px-2 text-xs"
          placeholder="last name"
        />

        <CountryDropdown
          value={country}
          onChange={setCountry}
          className="border w-full mb-2 h-10 uppercase px-2 text-xs"
        />

        <RegionDropdown
          country={country}
          value={region}
          onChange={setRegion}
          className="border w-full mb-2 h-10 uppercase px-2 text-xs"
        />

        <div className="flex gap-2 mb-2">
          <input
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            type="text"
            className="border w-full mb-2 h-10 uppercase px-2 text-xs"
            placeholder="apartment, suite etc. (optional)"
          />
          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            type="text"
            className="border w-full h-10 uppercase px-2 text-xs"
            placeholder="postal code"
          />
        </div>

        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="tel"
          className="border h-10 uppercase text-xs px-2 w-full mb-2"
          placeholder="phone number (optional)"
        />

        <div className="flex items-center gap-2 my-2">
          <input
            checked={contactCheckBox}
            onChange={(e) => setContactCheckBox(e.target.checked)}
            type="checkbox"
            disabled={!user}
          />
          <label className="text-xs">
            save my information (logged in users)
          </label>
        </div>
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePayment();
        }}
        disabled={isProcessing}
        className="w-full font-[jost] text-sm bg-green-700 text-white py-3 mt-4 uppercase  disabled:bg-gray-400 cursor-pointer"
      >
        {isProcessing
          ? "Processing..."
          : `Pay with paystack NGN  ${
              user
                ? (cartTotal + tax).toLocaleString()
                : (localCartTotal + tax).toLocaleString()
            }`}
      </button>
    </div>
  );
};

export default ContactForm;
