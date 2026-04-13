import { useState } from "react";
import Icon from "./Icon";

const ServicesSlider = () => {
  const [isClicked, setIsClicked] = useState(1);

  return (
    <>
      <div className=" gap-10 mt-15 hidden md:grid grid-cols-3 md:gap-20 lg:grid-cols-4 place-items-center text-center">
        <ServiceComponents
          icon="ship"
          heading="delivery worldwide"
          service="Enjoy fast, reliable shipping on all orders - no matter where you are"
        />
        <ServiceComponents
          icon="chat"
          heading="Top-notch support"
          service="Our team is here to help you with any questions or concerns"
        />
        <ServiceComponents
          icon="refund"
          heading="Satisfied or refunded"
          service="Not in love? Return your item hassle-free within 14 days"
        />
        <ServiceComponents
          icon="card"
          heading="Secure payments"
          service="Shop with confidence. All transactions are encrypted and protected"
        />
      </div>

      <div className="flex flex-col items-center justify-center text-sm font-light relative h-30 overflow-hidden mt-15 md:hidden">
        <ServiceComponent
          icon="ship"
          heading="delivery worldwide"
          service="Enjoy fast, reliable shipping on all orders - no matter where you are"
          style={{
            transform: isClicked === 1 ? "translateY(0)" : "translateY(200%)",
            opacity: isClicked === 1 ? 1 : 0,
            transition: "transform 0.8s ease-in, opacity 0.5s ease-in",
          }}
        />
        <ServiceComponent
          icon="chat"
          heading="Top-notch support"
          service="Our team is here to help you with any questions or concerns"
          style={{
            transform: isClicked === 2 ? "translateY(0)" : "translateY(200%)",
            opacity: isClicked === 2 ? 1 : 0,
            transition: "transform 0.8s ease-in, opacity 0.5s ease-in",
          }}
        />
        <ServiceComponent
          icon="refund"
          heading="Satisfied or refunded"
          service="Not in love? Return your item hassle-free within 14 days"
          style={{
            transform: isClicked === 3 ? "translateY(0)" : "translateY(200%)",
            opacity: isClicked === 3 ? 1 : 0,
            transition: "transform 0.8s ease-in, opacity 0.5s ease-in",
          }}
        />
        <ServiceComponent
          icon="card"
          heading="Secure payments"
          service="Shop with confidence. All transactions are encrypted and protected"
          style={{
            transform: isClicked === 4 ? "translateY(0)" : "translateY(200%)",
            opacity: isClicked === 4 ? 1 : 0,
            transition: "transform 0.8s ease-in, opacity 0.5s ease-in",
          }}
        />
      </div>
      <div className="flex mt-2 justify-center bottom-0 gap-4 md:hidden">
        <button
          className=" rounded-full bg-gray-500 size-2 cursor-pointer"
          onClick={() => setIsClicked(1)}
          style={{ backgroundColor: isClicked === 1 ? "black" : "gray" }}
        ></button>
        <button
          className="rounded-full bg-gray-500 size-2 cursor-pointer"
          onClick={() => setIsClicked(2)}
          style={{ backgroundColor: isClicked === 2 ? "black" : "gray" }}
        ></button>
        <button
          className=" rounded-full bg-gray-500  size-2 cursor-pointer"
          onClick={() => setIsClicked(3)}
          style={{ backgroundColor: isClicked === 3 ? "black" : "gray" }}
        ></button>
        <button
          className=" rounded-full bg-gray-500 size-2 cursor-pointer"
          onClick={() => setIsClicked(4)}
          style={{ backgroundColor: isClicked === 4 ? "black" : "gray" }}
        ></button>
      </div>
    </>
  );
};

export default ServicesSlider;

const ServiceComponent = ({ icon, heading, service, style }) => {
  return (
    <div
      className="w-[80%] flex flex-col items-center justify-center font-[jost] absolute"
      style={style}
    >
      <Icon name={icon} className="size-7" />
      <p className="uppercase mb-4 sm:text-lg">{heading}</p>
      <p className="text-center font-normal sm:text-lg">{service}</p>
    </div>
  );
};

const ServiceComponents = ({ icon, heading, service, style }) => {
  return (
    <div
      className="w-[80%] flex flex-col items-center justify-center font-[jost]"
      style={style}
    >
      <Icon name={icon} className="size-7" />
      <p className="uppercase mb-4 md:font-bold">{heading}</p>
      <p className="text-center font-normal">{service}</p>
    </div>
  );
};
