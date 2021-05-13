import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Characters from "./containers/Characters";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Comics from "./containers/Comics";
import Bookmark from "./containers/Bookmark";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  // const [limit, setLimit] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3200/characters", {
        params: {
          limit: 12,
          skip: 25,
        },
      });
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [searchName]);

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <>
      <Router>
        <Header setSearchName={handleSearchName} />
        <Switch>
          <Route exact path="/">
            <Characters data={data} isLoading={isLoading} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/comics">
            <Comics />
          </Route>
          <Route path="/bookmark">
            <Bookmark />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
