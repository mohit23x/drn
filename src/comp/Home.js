import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>
        <Link to="/try1">Try 1</Link>
        <Link to="/try2">Try 2</Link>
      </h1>
    </div>
  );
};

export default Home;
