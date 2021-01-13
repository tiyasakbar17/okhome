import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import First from "./pages/First";
import { Provider } from "react-redux";
import Store from "./redux/store";
import Second from "./pages/Second";
import Header from "./components/Header";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={First} />
          <Route exact path="/2" component={Second} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
