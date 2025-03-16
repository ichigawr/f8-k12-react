import { useEffect, useState } from "react";

const getProducts = async (page, perPage) => {
  try {
    const res = await fetch(`https://api01.f8team.dev/api/products?page=${page}&per_page=${perPage}`, {
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

const useProduct = ({ page, perPage }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const productData = await getProducts(page, perPage);
      setProducts(productData.data);

      setIsLoading(false);
    })();
  }, [page, perPage, setIsLoading]);

  return [products, isLoading];
};

export default useProduct;
