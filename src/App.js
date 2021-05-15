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
  const [favoritesTabComics, setFavoritesTabComics] = useState([]);
  const [favoritesTabPerso, setFavoritesTabPerso] = useState([]);
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
    // setFavoris(!favoris);

    // On fait une copie de la requête
    const newFavoritesPerso = [...favoritesTabPerso];
    const existID = newFavoritesPerso.find((elem) => elem._id === result._id);
    // Si ça existe dans le localStorage

    // Est ce que result n'existe pas déjà dans les favoris ?
    console.log("exist ", existID);
    if (existID) {
      const index = newFavoritesPerso.indexOf(existID);
      newFavoritesPerso.splice(index, 1);
      setFavoritesTabPerso(newFavoritesPerso);
      localStorage.setItem("favoris", JSON.stringify(newFavoritesPerso));
      console.log(newFavoritesPerso);
    } else {
      newFavoritesPerso.push(result);
      setFavoritesTabPerso(newFavoritesPerso);
      localStorage.setItem("favoris", JSON.stringify(newFavoritesPerso));
      console.log(newFavoritesPerso);
    }
  };

  // useEffect(() => {
  //   if (localStorage.getItem("favoris").length === 0) {
  //     localStorage.removeItem("favoris");
  //   }
  // });

  const addToFavoritesComics = (result) => {
    // On fait une copie de la requête
    const newFavoritesComics = [...favoritesTabComics];
    const exist = newFavoritesComics.find((elem) => elem._id === result._id);
    // Est ce que result n'existe pas déjà dans les favoris ?
    console.log("exist ", exist);
    if (exist) {
      const index = newFavoritesComics.indexOf(exist);
      newFavoritesComics.splice(index, 1);
      setFavoritesTabComics(newFavoritesComics);
      localStorage.setItem("favorisComics", JSON.stringify(newFavoritesComics));
      if (localStorage.getItem("favoris").length < 1) {
        localStorage.removeItem("favoris");
      }
      console.log(newFavoritesComics);
    } else {
      newFavoritesComics.push(result);
      setFavoritesTabComics(newFavoritesComics);
      localStorage.setItem("favorisComics", JSON.stringify(newFavoritesComics));

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
