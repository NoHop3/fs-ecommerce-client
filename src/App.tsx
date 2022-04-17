import { useSelector } from "react-redux";

import { RootState } from "./typescript/redux/store/";
import importTemplate from "./hooks/useImports";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Authentication } from "./pages/Authentication";
import { Profile } from "./pages/Profile";
import { Products } from "./pages/Products";
import { Orders } from "./pages/Orders";
import { Cart } from "./pages/Cart";
import {
  IsUserAuthenticated,
  IsUserUnAuthenticated,
  IsUserAdmin,
  UserHasWriteAccess,
} from "./auth/userAuth";
import { ProductDetails } from "./pages/ProductDetails";
import { ModifyProduct } from "./pages/ModifyProduct";
import { AddProduct } from "./pages/AddProduct";

function App() {
  const { BrowserRouter, Routes, Route } = importTemplate();
  const { navClass } = useSelector((state: RootState) => state.navState);
  const { lamp } = useSelector((state: RootState) => state.themeState);
  const pageBody = navClass + " " + lamp;
  return (
    <div className={pageBody}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home theme={pageBody} />} />
          <Route path='/contact' element={<Contact />} />
          <Route
            path='/products/details/:productId'
            element={<ProductDetails />}
          />

          <Route element={<IsUserUnAuthenticated />}>
            <Route path='/authentication' element={<Authentication />} />
          </Route>

          <Route element={<IsUserAuthenticated />}>
            <Route path='/products' element={<Products />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route element={<UserHasWriteAccess />}>
            <Route path='/products/add' element={<AddProduct />} />
          </Route>

          <Route element={<IsUserAdmin />}>
            <Route
              path='/products/edit/:productId'
              element={<ModifyProduct />}
            />
            {/* <Route path='/products/add' element={<AddProduct />} /> */}
          </Route>
          {/* Error page */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
