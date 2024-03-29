import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Signup = ({ setUserToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  let obj = {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //On reset setErrorMessage pour annuler l'erreur
      setErrorMessage("");
      const response = await axios.post(
        "https://marvel-back.vercel.app/user/signup",
        // "http://localhost:3200/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      if (response.data) {
        obj["token"] = response.data.token;
        obj["username"] = response.data.username;
        setUserToken(obj);

        history.push("/");
      }
    } catch (error) {
      // On affiche tous les messages d'erreurs présents côté serveur
      if (error.response.status === 409) {
        setErrorMessage("Cet email possède déjà un compte");
      } else if (
        error.response.data.message === "This username is already used"
      ) {
        setErrorMessage("Ce Pseudo existe déjà");
      } else {
        setErrorMessage("Une erreur est survenue");
      }
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form form_signup">
      <h2>Inscrivez-vous !</h2>
      <input
        type="text"
        value={username}
        placeholder="Pseudo"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p className="invalid-feedback">{errorMessage}</p>}
      <input type="submit" value="Envoyer" />
      <Link to="/login">
        <p>Déjà un compte ? Connectez-vous !</p>
      </Link>
    </form>
  );
};

export default Signup;
