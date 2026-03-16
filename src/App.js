import React, { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "920aeb213cc94890a4223f755366b344";

function App() {

  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  const getNews = (category = "") => {

    let url = "";

    if (category === "") {
      url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => setNews(data.articles));
  };

  useEffect(() => {
    getNews();
  }, []);

  const searchNews = () => {

    fetch(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => setNews(data.articles));

  };

  return (
    <div className={dark ? "dark" : "light"}>

      {/* NAVBAR */}

      <div className="navbar">

        <div className="nav-title">
          Live News Portal
        </div>

        <button onClick={() => setDark(!dark)}>
          Dark Mode
        </button>

      </div>

      <div className="container">

        {/* SEARCH */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={searchNews}>
            Search
          </button>

        </div>

        {/* CATEGORIES */}

        <div className="categories">

          <button onClick={() => getNews("")}>All</button>
          <button onClick={() => getNews("technology")}>Tech</button>
          <button onClick={() => getNews("sports")}>Sports</button>
          <button onClick={() => getNews("business")}>Business</button>
          <button onClick={() => getNews("health")}>Health</button>

        </div>

        {/* NEWS */}

        <div className="news-grid">

          {news.map((n, i) => (
            <div key={i} className="news-card">

              {n.urlToImage && (
                <img src={n.urlToImage} alt="" />
              )}

              <h3>{n.title}</h3>

              <p>{n.description}</p>

              <a href={n.url} target="_blank">
                Read more
              </a>

            </div>
          ))}

        </div>

      </div>

      {/* FOOTER */}

      <div className="footer">
        REST API News Portal | React + Node Case Study
      </div>

    </div>
  );
}

export default App;