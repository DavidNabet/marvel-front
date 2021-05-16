import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = ({ setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  let obj = {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://marvel-back-project.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data) {
        //On met dans un objet le token et le username qu'on pourra réutiliser par la suite dans le header
        obj.token = response.data.token;
        obj.username = response.data.username;
        setUserToken(obj);
        history.push("/");
      }
    } catch (error) {
      // On cherche si l'erreur existe côté serveur
      if (error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      } else {
        setErrorMessage("Une erreur est survenue");
      }
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form form_login">
      <h2>Se connecter</h2>
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
      <Link to="/signup">
        <p>Pas de compte ? Inscrivez-vous !</p>
      </Link>
    </form>
  );
};

export default Login;
