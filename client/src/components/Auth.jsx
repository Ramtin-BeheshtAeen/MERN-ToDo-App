import { React, useState } from "react";
import {useCookies} from 'react-cookie'

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)


  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);

  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Make Sure That Passwords Match!");
      return;
    }
    console.log(`${import.meta.env.VITE_APP_BACKEND_SERVER_URL}/${endpoint}`)
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: isLogIn
        ? JSON.stringify({ email, password })
        : JSON.stringify({ name, lastName, email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (endpoint === 'signup') {
      if (data.code === 11000) {
        setError("Email already exists: " + data.keyValue.email);
      } else if (data.email) {
        setCookie('Email', data.email)
        setCookie('AuthToken', data.token)
        setCookie('UserId', data._id)
        setCookie('Name', data.name)
        setCookie('LastName', data.lastName)
        window.location.reload()
      }
       else {
        console.log("An error occurred: ", error);
      }

    } else {
      if (data.message) {
        setError(data.message);
      } else if (data.email) {
        setCookie('Email', data.email)
        setCookie('AuthToken', data.token)
        setCookie('UserId', data._id)
        setCookie('Name', data.name)
        setCookie('LastName', data.lastName)
        window.location.reload()
      }
       else {
        console.log("An error occurred: ", error);
      }
    }

  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form style={{ height: !isLogIn ? "500px" : "300px" }}>
          <h2>{isLogIn ? "Please Login" : "Please Sign up"}</h2>
          {!isLogIn && (
            <>
              <input
                type="name"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="name"
                placeholder="last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}

          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogIn && (
            <input
              type="password"
              placeholder="confirm password"
              autocomplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <input
            type="submit"
            className="create"
            onClick={ (e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>

        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogIn
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}>
            Sign Up
          </button>

          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: !isLogIn
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
