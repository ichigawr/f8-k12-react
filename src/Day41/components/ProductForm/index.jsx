import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import "./ProductForm.css";

const ProductForm = ({ submitTitle = "", isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    tags: "",
    brand: "",
    sku: "",
    weight: "",
    minimumOrderQuantity: "",
    thumbnail: "",
  });
  const [errors, setErrors] = useState({});

  const postProduct = async (productData) => {
    try {
      const res = await fetch("https://api01.f8team.dev/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const resText = JSON.parse(await res.text());
        return resText.errors;
      }

      return null;
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const err = await postProduct(productData);

    if (!err) {
      setErrors({});
      navigate("/products");
    } else {
      setErrors(err);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}

      <div className="product-form-container">
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={productData.title}
              className="form-input"
              placeholder="Tên sản phẩm"
              onChange={handleChange}
              required
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          <div className="form-group">
            <textarea
              name="description"
              value={productData.description}
              className="form-textarea"
              placeholder="Mô tả sản phẩm"
              onChange={handleChange}
              required
            />
            {errors.description && (
              <p className="error-message">{errors.description}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="category"
              value={productData.category}
              className="form-input"
              placeholder="Danh mục"
              onChange={handleChange}
              required
            />
            {errors.category && (
              <p className="error-message">{errors.category}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="price"
              value={productData.price}
              className="form-input"
              placeholder="Giá ($)"
              onChange={handleChange}
              required
            />
            {errors.price && <p className="error-message">{errors.price}</p>}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="discountPercentage"
              value={productData.discountPercentage}
              className="form-input"
              placeholder="Giảm giá (%)"
              onChange={handleChange}
              required
            />
            {errors.discountPercentage && (
              <p className="error-message">{errors.discountPercentage}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="rating"
              value={productData.rating}
              className="form-input"
              placeholder="Đánh giá (0-5)"
              onChange={handleChange}
              required
            />
            {errors.rating && <p className="error-message">{errors.rating}</p>}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="stock"
              value={productData.stock}
              className="form-input"
              placeholder="Tồn kho"
              onChange={handleChange}
              required
            />
            {errors.stock && <p className="error-message">{errors.stock}</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="tags"
              value={productData.tags}
              className="form-input"
              placeholder="Tags (cách nhau bằng dấu phẩy)"
              onChange={(e) => {
                setProductData({
                  ...productData,
                  tags: e.target.value.split(","),
                });
              }}
              required
            />
            {errors.tags && <p className="error-message">{errors.tags}</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="brand"
              value={productData.brand}
              className="form-input"
              placeholder="Thương hiệu"
              onChange={handleChange}
              required
            />
            {errors.brand && <p className="error-message">{errors.brand}</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="sku"
              value={productData.sku}
              className="form-input"
              placeholder="Mã SKU"
              onChange={handleChange}
              required
            />
            {errors.sku && <p className="error-message">{errors.sku}</p>}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="weight"
              value={productData.weight}
              className="form-input"
              placeholder="Trọng lượng (kg)"
              onChange={handleChange}
              required
            />
            {errors.weight && <p className="error-message">{errors.weight}</p>}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="minimumOrderQuantity"
              value={productData.minimumOrderQuantity}
              className="form-input"
              placeholder="Số lượng tối thiểu"
              onChange={handleChange}
              required
            />
            {errors.minimumOrderQuantity && (
              <p className="error-message">{errors.minimumOrderQuantity}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="thumbnail"
              value={productData.thumbnail}
              className="form-input"
              placeholder="URL hình ảnh"
              onChange={handleChange}
              required
            />
            {errors.thumbnail && (
              <p className="error-message">{errors.thumbnail}</p>
            )}
          </div>

          <button type="submit" className="submit-button">
            {submitTitle}
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
