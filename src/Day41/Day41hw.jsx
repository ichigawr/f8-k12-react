import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewProduct from "./pages/NewProduct";
import Products from "./pages/Products";
import Search from "./pages/Search";
import "./Day41hw.css";

export default function Day41hw() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
