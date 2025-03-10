import { useEffect, useState } from "react";
import "./App.css";

const getPosts = async (limit = 25, page = 1) => {
  try {
    const res = await fetch(
      `https://dummyjson.com/posts?limit=${limit}&skip=${(page - 1) * limit}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const searchPost = async (query) => {
  try {
    const res = await fetch(`https://dummyjson.com/posts/search?q=${query}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

let isSearching = false;

function App() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(25);
  let startPage = Math.max(page - 3, 0);
  const endPage = Math.min(startPage + 5, totalPages);
  startPage = Math.max(endPage - 5, 0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getPosts(limit, page);
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.total / limit));
      setIsLoading(false);
    })();
  }, [limit, page]);

  const handleChange = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  const handleSearch = async (e) => {
    const query = e.target.value.trim();

    if (query !== "" && query.length < 3) return;

    if (query === "") isSearching = false;
    else isSearching = true;

    const data =
      query !== "" ? await searchPost(query) : await getPosts(limit, page);
    setPosts(data.posts);
    setTotalPages(Math.ceil(data.total / limit));
  };

  return (
    <div className="app">
      <h1>Danh sách bài viết</h1>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm bài viết..."
          onInput={handleSearch}
        />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      )}

      {/* No Results Message */}
      {isSearching && !posts.length && (
        <p className="no-results">Không tìm thấy bài viết nào.</p>
      )}

      <ul className="post-list">
        {posts.map(({ id, title, body, views, reactions, tags }) => (
          <li className="post-item" key={id}>
            <h2>{title}</h2>
            <p>{body}</p>

            <div className="post-meta">
              <span className="views">👀 {views} lượt xem</span>
              <span className="likes">👍 {reactions.likes}</span>
              <span className="dislikes">👎 {reactions.dislikes}</span>
            </div>

            <div className="tags">
              {tags.map((tag, index) => (
                <span className="tag" key={index}>
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {!isSearching && (
        <div className="pagination-container">
          <div className="records-per-page">
            <label htmlFor="records">Hiển thị:</label>
            <select
              id="records"
              className="records-select"
              onChange={handleChange}
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>

          <div className="pagination">
            <button
              className="page-btn prev"
              disabled={page == 1}
              onClick={() => setPage(page - 1)}
            >
              « Trước
            </button>

            {[...Array(totalPages).keys()]
              .slice(startPage, endPage)
              .map((index) => (
                <button
                  className={`page-btn ${page === index + 1 ? "active" : ""}`}
                  key={index}
                  onClick={() => page !== index + 1 && setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

            <button
              className="page-btn next"
              disabled={page == totalPages}
              onClick={() => setPage(page + 1)}
            >
              Sau »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
