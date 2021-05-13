import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <form>
      <h2>Inscrivez-vous !</h2>
      <input
        type="text"
        value={username}
        placeholder="Nom"
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
      <input
        type="password"
        value={passwordConfirm}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirmation de mot de passe"
      />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default Signup;
