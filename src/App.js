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
  // Le token du user sauvegardé dans un cookie
  const [tokenUser, setTokenUser] = useState(
    Cookies.getJSON("userToken") || null
  );
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // Recherche sur la searchBar
  const [searchName, setSearchName] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  // Pagination
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(20);
  // Favoris
  let cookie = Cookies.get("fav");
  const [fav, setFav] = useState((cookie && JSON.parse(cookie)) || [[], []]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      const response = await axios.get(
        "https://marvel-back.vercel.app/characters",
        // "http://localhost:3200/characters",
        {
          params: {
            name: searchName,
            limit: limit,
            skip: skip,
          },
          signal,
        }
      );
      setData(response.data.results);
      setLimit(response.data.limit);
      setCount(response.data.count);
      setIsLoading(false);
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [searchName, skip, limit]);

  //le tokenUser
  const setUserToken = (object) => {
    if (object) {
      Cookies.set("userToken", object, { expires: 7, secure: true });
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

  // Ajouter/ Supprimer un favoris
  const addFav = (id, from) => {
    let favCopy = [...fav];
    if (from === "char") {
      if (favCopy[0].indexOf(id) === -1) {
        favCopy[0].push(id);
        alert("Favoris ajouté !");
      } else {
        alert("Déjà en favoris !");
      }
    } else if (favCopy[1].indexOf(id) === -1) {
      favCopy[1].push(id);
      alert("Favoris ajouté !");
    } else {
      alert("Déjà en favoris !");
    }

    setFav(favCopy);
    Cookies.set("fav", JSON.stringify(favCopy));
  };

  const handleRemoveFav = (id) => {
    const fav = Cookies.get("fav");
    const tabFav = fav && JSON.parse(fav);

    let newFav = [[], []];
    for (let i = 0; i < tabFav.length; i++) {
      for (let j = 0; j < tabFav[i].length; j++) {
        if (i === 0) {
          if (tabFav[i][j] !== id) {
            newFav[0].push(tabFav[i][j]);
          }
        } else {
          if (tabFav[i][j] !== id) {
            newFav[1].push(tabFav[i][j]);
          }
        }
      }
    }
    setFav(newFav);
    Cookies.set("fav", JSON.stringify(newFav));
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
            {tokenUser ? (
              <Comics
                title={searchTitle}
                addFav={addFav}
                removeFav={handleRemoveFav}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/bookmark">
            {tokenUser ? (
              <Bookmark removeFav={handleRemoveFav} fav={fav} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/">
            {tokenUser ? (
              <Characters
                data={data}
                isLoading={isLoading}
                skip={skip}
                addFav={addFav}
                removeFav={handleRemoveFav}
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
