import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NewProduct from "./pages/NewProduct";
import Products from "./pages/Products";
import Search from "./pages/Search";
import "./Day41hw.css";

export default function Day41hw() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="new-product" replace />} />
      <Route path="new-product" element={<NewProduct />} />
      <Route path="products" element={<Products />} />
      <Route path="search" element={<Search />} />
    </Routes>
  );
}
