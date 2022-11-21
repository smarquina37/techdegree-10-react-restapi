import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = () => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {data.map((data) => (
        <li>{data.title}</li>
      ))}
    </div>
  );
};

export default App;
