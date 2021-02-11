import React, { useState } from "react";
import Axios from "axios";

import Search from "./Search";

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
      <Search />
    </div>
  );
}
