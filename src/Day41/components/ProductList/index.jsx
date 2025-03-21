import PropTypes from "prop-types";
import "./ProductList.css";

function ProductList({
  page,
  products,
  totalPages,
  limit,
  handleSelect,
  handlePageChange,
}) {
  let startPage = Math.max(page - 3, 0);
  const endPage = Math.min(startPage + 5, totalPages);
  startPage = Math.max(endPage - 5, 0);

  return (
    <div className="product-list-container">
      <ul className="product-list">
        {products.map(({ id, title, price, stock, thumbnail }) => (
          <li key={id} className="product-item">
            <img src={thumbnail} alt={title} className="product-image" />
            <div className="product-info">
              <h3 className="product-title">{title}</h3>
              <p className="product-price">${price}</p>
              <p className="product-stock">{stock}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination-container">
        <div className="items-per-page">
          <label htmlFor="itemsPerPage">Hiển thị:</label>
          <select
            id="itemsPerPage"
            className="items-select"
            value={limit}
            onChange={handleSelect}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="pagination">
          <button
            className="page-button"
            disabled={page == 1}
            onClick={() => handlePageChange(page - 1)}
          >
            ⬅ Trước
          </button>

          <div className="page-numbers">
            {[...Array(totalPages).keys()]
              .slice(startPage, endPage)
              .map((index) => (
                <button
                  key={index}
                  className={`page-number ${
                    page === index + 1 ? "active" : ""
                  }`}
                  onClick={() =>
                    page !== index + 1 && handlePageChange(index + 1)
                  }
                >
                  {index + 1}
                </button>
              ))}
          </div>

          <button
            className="page-button"
            disabled={page == totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Tiếp ➡
          </button>
        </div>
      </div>
    </div>
  );
}

ProductList.propTypes = {
  page: PropTypes.number.isRequired,
  products: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default ProductList;
