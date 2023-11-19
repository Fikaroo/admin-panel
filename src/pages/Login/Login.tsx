import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorUserName, setErrorUserName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");


  const changeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorUserName("");
    setUserName(event.target.value);
  };
  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorPassword("");
    setPassword(event.target.value);
  };

  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(userName === "1" && password === "1"){
      navigate("/");
    } else {
      setErrorUserName("Неверное имя");
      setErrorPassword("Неверный пароль");
    }
    
  };
  return (
    <div className="login-container">
      <form action="" className="login-form" onSubmit={(e)=>handleClick(e)}>

        <label htmlFor="">
          <input className="loginUsername" type="text" onChange={(e)=>changeUserName(e)} placeholder="Имя пользователя"/>
          <p className="errorInvalid">{errorUserName}</p>
        </label>

        <label htmlFor="">
          <input  className="loginPassword" type="password" onChange={(e)=>changePassword(e)} placeholder="Пароль"/>
          <p className="errorInvalid">{errorPassword}</p>
        </label>
        <button type="submit" className="loginButton" >Вход</button>
      </form>
    </div>
  );
};
export default Login;
