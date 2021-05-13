import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Characters from "./containers/Characters";
import Character from "./containers/Character";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Comics from "./containers/Comics";
import Bookmark from "./containers/Bookmark";
import "./App.css";

function App() {
  const [searchName, setSearchName] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(20);
  // const limit = 100;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3200/characters", {
        params: {
          limit: limit,
          skip: skip,
        },
      });
      console.log(response.data);
      setData(response.data.results);
      setLimit(response.data.limit);
      setCount(response.data.count);
      setIsLoading(false);
    };
    fetchData();
  }, [skip, limit]);

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
  };

  // const handleLimit = () => {
  //   setCount(Math.ceil(data.count / data.limit))
  // }

  return (
    <>
      <Router>
        <Header setSearchName={handleSearchName} />
        <Switch>
          <Route exact path="/">
            <Characters
              data={data}
              isLoading={isLoading}
              skip={skip}
              setSkip={setSkip}
              limit={limit}
              count={count}
            />
          </Route>
          <Route path="/character/:id">
            <Character />
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
