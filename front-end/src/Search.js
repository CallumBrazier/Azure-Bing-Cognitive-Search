import React, { useState, useEffect } from "react";
import Axios from "axios";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import "./App.css";

export default function Search() {
  const [query, setQuery] = useState("Turners Cars");
  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const [shake, setShake] = useState(false);

  let loadQuery = () => {
    let input = document.getElementById("input").value;
    setQuery(input);
  };

  const submitQuery = async (e) => {
    setShake(true);
    e.preventDefault();
    let data = { query };
    console.log("sent query:", query);

    await Axios.post("http://localhost:3001/search", data)
      .then((res) => {
        if (res.data.length > 0) {
          setShake(false);
          console.log(res);
          setResults(res);
          return res;
        } else {
          setShake(false);
          console.log(res);
          setResults(res);
          setError("No results found");
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
        setResults(err);
      });
  };

  return (
    <div className="App">
      <h1 className="main-title">Turners Search</h1>
      <div className="inner-container">
        <form action="#" autocomplete="off">
          <input
            type="search"
            id="input"
            name="url"
            placeholder="What can I help you with?"
            onChange={loadQuery}
          />
          <button onClick={submitQuery} className={shake ? `shake` : null}>
            <SearchOutlinedIcon />
          </button>
        </form>
      </div>
      <div className="content-div">
        {results.data && results.data.webPages ? (
          results.data.webPages.value.map((data, index) => {
            return (
              <div key={index} className="webpage-div">
                <h2 className="result-title">
                  <a href={data.url}>{data.name}</a>
                </h2>
                <h6 className="result-info">{data.snippet}</h6>
              </div>
            );
          })
        ) : (
          <h2 className="error-message">{error}</h2>
        )}
      </div>
    </div>
  );
}
