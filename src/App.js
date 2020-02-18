/*  
  Made by-
  name = Mohit Kumar Lodha
  phone = 8770158963
  email = mohitjain2302@gmail.com
*/

import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Try1, Home, Try2, Try3 } from "./comp";

function App() {
  useEffect(() => {
    if (window.innerWidth < 1000) {
      alert("this site is not responsive kindly view it in desktop");
    }
    return () => {};
  }, []);

  /*
    Try3 component is my final solution
  */
  return (
    <div className="App-header">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Try3} />
          <Route path="/try1" component={Try1} />
          <Route path="/try2" component={Try2} />
          <Route path="/try3" component={Try3} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
