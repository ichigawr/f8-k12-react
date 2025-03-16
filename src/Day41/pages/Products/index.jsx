import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import { useState, useEffect } from "react";

const getProducts = async (params) => {
  try {
    const res = await fetch(`https://api01.f8team.dev/api/products?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const Products = () => {
  const [params, _] = useState(new URLSearchParams(location.search));
  const [page, setPage] = useState(Number(params.get("page")) || 1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(Number(params.get("per_page")) || 10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (Number(params.get("page")) !== page) {
        params.set("page", page);
      }

      if (Number(params.get("per_page")) !== limit) {
        params.set("per_page", limit);
      }

      history.replaceState(null, null, `?${params}`);

      const productData = await getProducts(params);
      setProducts(productData.data);
      setTotalPages(productData.last_page);

      setIsLoading(false);
    })();
  }, [page, limit, setIsLoading, params]);

  const handleSelect = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Danh Sách Sản Phẩm</h1>
      {products.length > 0 && (
        <ProductList
          page={page}
          products={products}
          totalPages={totalPages}
          limit={limit}
          handleSelect={handleSelect}
          handlePageChange={handlePageChange}
        />
      )}

      {isLoading && <Loading />}

      {!isLoading && products.length === 0 && (
        <p className="empty-message">Không có sản phẩm nào.</p>
      )}
    </div>
  );
};

export default Products;
