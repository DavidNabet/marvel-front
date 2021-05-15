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
  // Favoris
  const [favoritesTabPerso, setFavoritesTabPerso] = useState([]);
  const [favoritesTabComics, setFavoritesTabComics] = useState([]);

  //
  // la data des personnages
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://marvel-back-project.herokuapp.com/characters",
        {
          params: {
            name: searchName,
            limit: limit,
            skip: skip,
          },
        }
      );
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

  //
  const addToFavoritesPerso = (result) => {
    // On fait une copie de la requête
    const newFavoritesPerso = [...favoritesTabPerso];
    const exist = newFavoritesPerso.find((elem) => elem._id === result._id);
    // Est ce que result n'existe pas déjà dans les favoris ?
    console.log("exist ", exist);
    if (exist) {
      newFavoritesPerso.splice(result, 1);
      setFavoritesTabPerso(newFavoritesPerso);

      console.log(newFavoritesPerso);
    } else {
      newFavoritesPerso.push({ ...result, status: "character" });
      setFavoritesTabPerso(newFavoritesPerso);
      console.log(newFavoritesPerso);
    }

    if (Cookies.getJSON("fav") === undefined) {
      Cookies.set("fav", JSON.stringify([1, 2, 3]), {
        expires: 7,
      });
    }
    console.log(Cookies.getJSON("fav").character);
  };

  const addToFavoritesComics = (result) => {
    // On fait une copie de la requête
    const newFavoritesComics = [...favoritesTabComics];
    const exist = newFavoritesComics.find((elem) => elem._id === result._id);
    // Est ce que result n'existe pas déjà dans les favoris ?
    console.log("exist ", exist);
    if (exist) {
      newFavoritesComics.splice(result, 1);
      setFavoritesTabComics(newFavoritesComics);

      console.log(newFavoritesComics);
    } else {
      newFavoritesComics.push({ ...result, status: "comics" });
      setFavoritesTabComics(newFavoritesComics);
      console.log(newFavoritesComics);
    }
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
            <Comics title={searchTitle} addToFavorite={addToFavoritesComics} />
          </Route>
          <Route path="/bookmark">
            {tokenUser ? <Bookmark /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            {tokenUser ? (
              <Characters
                data={data}
                isLoading={isLoading}
                skip={skip}
                addToFavorite={addToFavoritesPerso}
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
