import { useEffect, useState } from "react";
import "./Day40.css";

let isSearching = false;
let timeId;

const getPosts = async (limit = 25, page = 1) => {
  try {
    const skip = (page - 1) * limit;
    const res = await fetch(
      `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
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

function Day40() {
  const params = new URLSearchParams(location.search);

  const [page, setPage] = useState(Number(params.get("page")) || 1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(25);
  const [searchInput, setSearchInput] = useState(params.get("q") || "");

  let startPage = Math.max(page - 3, 0);
  const endPage = Math.min(startPage + 5, totalPages);
  startPage = Math.max(endPage - 5, 0);

  const updateURL = () => {
    history.replaceState(null, null, `?${params}`);
  };

  useEffect(() => {
    if (searchInput.trim()) {
      isSearching = true;
      (async () => {
        setIsLoading(true);
        params.set("q", searchInput);
        updateURL();
        const data = await searchPost(searchInput.trim());
        setPosts(data.posts);
        setIsLoading(false);
      })();
    }
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      params.set("page", page);
      updateURL();
      const data = await getPosts(limit, page);
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.total / limit));
      setIsLoading(false);
    })();
  }, [limit, page]);

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  const handlePageInputChange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    if (Number(e.target.value) > totalPages) e.target.value = totalPages;
    else if (e.target.value !== "" && Number(e.target.value) < 1)
      e.target.value = 1;
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      e.target.value !== "" &&
      Number(e.target.value) !== page
    ) {
      const newPage = Number(e.target.value) || 1;
      setPage(newPage);
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);

    clearTimeout(timeId);
    timeId = setTimeout(async () => {
      const query = e.target.value.trim();

      if (query !== "" && query.length < 3) return;

      if (query === "") isSearching = false;
      else isSearching = true;

      setIsLoading(true);

      const data =
        query !== "" ? await searchPost(query) : await getPosts(limit, page);
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.total / limit));

      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="app">
      <h1>Danh sách bài viết</h1>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          value={searchInput}
          className="search-input"
          placeholder="Tìm kiếm bài viết..."
          onInput={handleSearch}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
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
              <span className="views">
                👀 {views.toLocaleString()} lượt xem
              </span>
              <span className="likes">
                👍 {reactions.likes.toLocaleString()}
              </span>
              <span className="dislikes">
                👎 {reactions.dislikes.toLocaleString()}
              </span>
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
              onChange={handleLimitChange}
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>

          <div className="pagination">
            <label id="page-input">
              <input
                type="text"
                onChange={handlePageInputChange}
                onKeyDown={handleKeyDown}
                style={{ "--charWidth": String(totalPages).length + "ch" }}
              />
              <span> / {totalPages}</span>
            </label>

            <button
              className="page-btn prev"
              disabled={page == 1}
              onClick={() => setPage(1)}
            >
              ««
            </button>

            <button
              className="page-btn prev"
              disabled={page == 1}
              onClick={() => setPage(page - 1)}
            >
              «
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
              »
            </button>

            <button
              className="page-btn next"
              disabled={page == totalPages}
              onClick={() => setPage(totalPages)}
            >
              »»
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Day40;
