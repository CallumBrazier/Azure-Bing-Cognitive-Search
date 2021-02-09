import React, { useState } from "react";
import Axios from "axios";

export default function App() {
  const [searchBar, setSearchBar] = useState("");

  const handleSetSearch = (e) => {
    const newSearch = e.target.value;
    setSearchBar(newSearch);
  };

  const handleSubmit = async () => {
    await Axios.get("https://mission2luis.cognitiveservices.azure.com/").then(
      (response) => {
        console.log(response);
      }
    );
  };

  const hiddenStyles = {
    display: "none",
  };

  return (
    <div>
      <div className="searchBar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleSetSearch}
            placeholder="What can I help you with? "
          />
          <button style={hiddenStyles} type="submit" />
        </form>
      </div>
    </div>
  );
}
