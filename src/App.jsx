import "./style.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { ProductProvider } from "./context/ProductCardContext";
import { WishListProvider } from "./context/WishedListContext";
import { AuthProvider } from "./context/AuthContext";
import { PopUpProvider } from "./context/PopUpContext";
import AppLayout from "./components/AppLayout";
import MobileNav from "./components/MobileNav";
import { NavBarProvider } from "./context/NavBarContext";
import MenProductPage from "./pages/MenProductPage";
import WomenProductPage from "./pages/womenProductPage";
import { ModalProvider } from "./context/ModalContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/menproducts", element: <MenProductPage /> },
      { path: "/womenproducts", element: <WomenProductPage /> },
    ],
  },
]);

function App() {
  return (
    <PopUpProvider>
      <AuthProvider>
        <ModalProvider>
          <NavBarProvider>
            <ProductProvider>
              <WishListProvider>
                <RouterProvider router={router} />
              </WishListProvider>
            </ProductProvider>
          </NavBarProvider>
        </ModalProvider>
      </AuthProvider>
    </PopUpProvider>
  );
}

export default App;

// // In your App.jsx
// function App() {
//   return (
//     <>

//       {/* rest of your app */}
//     </>
//   );
// }
