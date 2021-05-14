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
      const response = await axios.post("http://localhost:3200/user/signup", {
        username: username,
        email: email,
        password: password,
      });
      if (response.data) {
        obj.token = response.data.token;
        obj.username = response.data.username;
        setUserToken(obj);

        history.push("/");
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 409) {
        setErrorMessage("Cet email possède déjà un compte");
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
        placeholder="Prénom"
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
