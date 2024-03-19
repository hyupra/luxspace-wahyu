import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";
import DetailPage from "./pages/Details";
import Cart from "./pages/Cart";
import Congrats from "./pages/Congrats";
import PageNotfound from "./pages/PageNotfound";

import Provider from "./helpers/hooks/useGlobalContext";
function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/categories/:idc" element={<DetailPage />} />
          <Route
            path="/categories/:idc/products/:idp"
            element={<DetailPage />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/congratulation" element={<Congrats />} />
          <Route path="*" element={<PageNotfound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
