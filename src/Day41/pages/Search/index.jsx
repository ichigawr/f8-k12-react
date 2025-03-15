import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import { useState, useEffect } from "react";
import "./Search.css";

let timeId;

const searchProducts = async (params) => {
  if (params.get("q") === "") return [];

  try {
    const res = await fetch(`https://api01.f8team.dev/api/products?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const Search = () => {
  const [params, _] = useState(new URLSearchParams(location.search));
  const [page, setPage] = useState(Number(params.get("page")) || 1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(Number(params.get("per_page")) || 10);
  const [searchInput, setSearchInput] = useState(params.get("q") || "");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (params.get("q") !== searchInput) {
        params.set("q", searchInput);
      }

      if (Number(params.get("page")) !== page) {
        params.set("page", page);
      }

      if (Number(params.get("per_page")) !== limit) {
        params.set("per_page", limit);
      }

      history.replaceState(null, null, `?${params}`);
    })();
  }, [searchInput, page, limit, params, setIsLoading]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (params.get("q") !== "") {
        const productData = await searchProducts(params);
        setProducts(productData.data);
        setTotalPages(productData.last_page);
      }

      setIsLoading(false);
    })();
  }, [page, limit, params]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);

    clearTimeout(timeId);
    timeId = setTimeout(async () => {
      const query = e.target.value.trim();
      if (query === "") return;

      setIsLoading(true);

      const productData = await searchProducts(params);
      setProducts(productData.data);
      setTotalPages(Math.ceil(productData.total / limit));

      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="page-container">
      <h1 className="search-title">Tìm kiếm sản phẩm</h1>

      <div className="search-bar">
        <input
          type="text"
          value={searchInput}
          className="search-input"
          placeholder="Nhập tên sản phẩm..."
          onChange={handleSearch}
        />
        <button className="search-button">Tìm kiếm</button>
      </div>

      {products.length > 0 && (
        <ProductList
          page={page}
          setPage={setPage}
          products={products}
          totalPages={totalPages}
          setLimit={setLimit}
        />
      )}

      {isLoading && <Loading />}

      {!isLoading && !products.length && (
        <p className="empty-message">Không có sản phẩm nào.</p>
      )}
    </div>
  );
};

export default Search;
