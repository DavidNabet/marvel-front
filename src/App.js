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
  const [favoritesTabPerso, setFavoritesTabPerso] = useState([]);
  const [favoritesTabComics, setFavoritesTabComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        // "https://marvel-back-project.herokuapp.com/characters",
        "https://marvel-back.vercel.app/characters",
        {
          params: {
            name: searchName,
            limit: limit,
            skip: skip,
          },
        }
      );
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
  const addToFavorite = (e, from, result) => {
    e.preventDefault();
    if (from === "character") {
      // Si la page charge les données des personnages
      const newFavoritesPerso = [...favoritesTabPerso];
      const exist = newFavoritesPerso.find((elem) => elem._id === result._id);
      // Est ce que result n'existe pas déjà dans les favoris ?
      if (exist) {
        const index = newFavoritesPerso.indexOf(exist);
        newFavoritesPerso.splice(index, 1);
        // S'il existe, on peut retirer le favori de la mémoire du navigateur
        setFavoritesTabPerso(newFavoritesPerso);
        localStorage.setItem("favoris", JSON.stringify(newFavoritesPerso));
        console.log(newFavoritesPerso);
      } else {
        // envoie le résultat dans un tableau qui à son tour sera envoyé dans la mémoire du navigateur
        newFavoritesPerso.push(result);
        setFavoritesTabPerso(newFavoritesPerso);
        localStorage.setItem("favoris", JSON.stringify(newFavoritesPerso));
        console.log(newFavoritesPerso);
      }
    } else {
      const newFavoritesComics = [...favoritesTabComics];
      const existComics = newFavoritesComics.find(
        (elem) => elem._id === result._id
      );
      console.log("existComics ", existComics);
      if (existComics) {
        const indexComic = newFavoritesComics.indexOf(existComics);
        newFavoritesComics.splice(indexComic, 1);
        setFavoritesTabComics(newFavoritesComics);
        localStorage.setItem(
          "favorisComics",
          JSON.stringify(newFavoritesComics)
        );
        console.log(newFavoritesComics);
      } else {
        newFavoritesComics.push(result);
        setFavoritesTabComics(newFavoritesComics);
        localStorage.setItem(
          "favorisComics",
          JSON.stringify(newFavoritesComics)
        );

        console.log(newFavoritesComics);
      }
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
            {tokenUser ? (
              <Comics title={searchTitle} addToFavorite={addToFavorite} />
            ) : (
              <Redirect to="/login" />
            )}
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
                addToFavorite={addToFavorite}
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
