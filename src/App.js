import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import First from "./pages/First";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={First} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
