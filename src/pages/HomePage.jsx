import Header from "../components/Header";
// import Category from "../components/Category";
import Hero from "../components/Hero";
// import ProductCard from "../components/ProductCard";
import ProdGrid from "../components/ProdGrid";
import Modal from "../components/Modal";
import { useModal } from "../context/ModalContext";
const HomePage = () => {
  const { carted, notUser } = useModal();
  return (
    <div className="relative h-screen w-full">
      <Modal>
        {carted && <p>Item added to cart</p>}
        {notUser && (
          <p>
            You must login or create an account to save product to your wish
            list!
          </p>
        )}
      </Modal>
      <Header />
      <Hero />
      <ProdGrid />
    </div>
  );
};

export default HomePage;
