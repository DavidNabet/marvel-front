import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import {
  Bookmark,
  Character,
  Characters,
  Comics,
  Login,
  Signup,
} from "./containers";

import Cookies from "js-cookie";
import "./App.css";

function App() {
  const [tokenUser, setTokenUser] = useState(
    Cookies.getJSON("userToken") || null
  );
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(20);

  // la data des personnages
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3200/characters", {
        params: {
          name: searchName,
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
  }, [searchName, skip, limit]);

  //le tokenUser
  const setUserToken = (object) => {
    if (object) {
      Cookies.set("userToken", object, { expires: 7 });
      setTokenUser(object);
    } else {
      Cookies.remove("userToken");
      setTokenUser(null);
    }
  };

  // les filtres de la searchbar
  const handleSearchName = (e) => {
    e.preventDefault();
    setSearchName(e.target.value);
  };

  const handleSearchTitle = (e) => {
    e.preventDefault();
    setSearchTitle(e.target.value);
  };

  const addToFavorites = (result) => {
    // On fait une copie de la requête
    const newData = [...data];
    // console.log(newData);
    // Est ce que result n'existe pas déjà dans les favoris ?
    const exist = newData.find((elem) => elem._id === result._id);
    console.log(exist);
    console.log("result ", result);
    // if(exist){

    // }
  };

  return (
    <>
      <Router>
        <Header
          handleSearchPerso={handleSearchName}
          handleSearchComic={handleSearchTitle}
          tokenUser={tokenUser}
          setUserToken={setUserToken}
        />
        <Switch>
          <Route path="/character/:id">
            <Character />
          </Route>
          <Route path="/signup">
            <Signup setUserToken={setUserToken} />
          </Route>
          <Route path="/login">
            <Login setUserToken={setUserToken} />
          </Route>
          <Route path="/comics">
            <Comics title={searchTitle} />
          </Route>
          <Route path="/bookmark">
            {tokenUser ? <Bookmark /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            {tokenUser ? (
              <Characters
                data={data}
                isLoading={isLoading}
                addToFavorites={addToFavorites}
                skip={skip}
                setSkip={setSkip}
                limit={limit}
                count={count}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
