import ProductForm from "../../components/ProductForm";
import Loading from "../../components/Loading";
import { useState } from "react";

const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="page-container">
      <h1 className="page-title">Tạo Sản Phẩm Mới</h1>
=
      {isLoading && <Loading />}

      <ProductForm
        submitTitle="Tạo sản phẩm"
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default NewProduct;
