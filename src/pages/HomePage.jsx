import Header from "../components/Header";
import Hero from "../components/Hero";

import ProdGrid from "../components/ProductGrid";
import PopUp from "../components/PopUp";
import { usePopUp } from "../context/PopUpContext";
// import { useAuth } from "../context/AuthContex";
import Heading from "../components/Heading";

const HomePage = () => {
  const { carted, notUser } = usePopUp();

  return (
    <div className="relative w-full">
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
      <Hero />
      <Heading className="text-2xl flex items-center justify-center font-[jost] uppercase my-10">
        men new arrival
      </Heading>
      <ProdGrid tableName="men_new_arrivals" />
      <Heading className="text-2xl flex items-center justify-center font-[jost] uppercase my-10">
        women new arrival
      </Heading>
      <ProdGrid tableName="women_new_arrivals" />
    </div>
  );
};

export default HomePage;
