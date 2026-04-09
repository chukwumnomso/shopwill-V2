import Header from "../components/Header";
// import Category from "../components/Category";
import Hero from "../components/Hero";
// import ProductCard from "../components/ProductCard";
import ProdGrid from "../components/ProdGrid";
import PopUp from "../components/PopUp";
import { usePopUp } from "../context/PopUpContext";
import { useAuth } from "../context/AuthContex";
const HomePage = () => {
  const { carted, notUser } = usePopUp();

  return (
    <div className="relative h-screen w-full">
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
      <ProdGrid />
    </div>
  );
};

export default HomePage;
