import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { ProductProvider } from "./context/ProductCardContext";
import { WishListProvider } from "./context/WishedListContext";
import { AuthProvider } from "./context/AuthContex";
import { PopUpProvider } from "./context/PopUpContext";
import AppLayout from "./components/AppLayout";
import MobileNav from "./components/MobileNav";
import { NavBarProvider } from "./context/NavBarContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/signin", element: <SignInPage /> },
    ],
  },
]);

function App() {
  return (
    <PopUpProvider>
      <AuthProvider>
        <NavBarProvider>
          <ProductProvider>
            <WishListProvider>
              <RouterProvider router={router} />
            </WishListProvider>
          </ProductProvider>
        </NavBarProvider>
      </AuthProvider>
    </PopUpProvider>
  );
}

export default App;
