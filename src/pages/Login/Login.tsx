import React, { useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthProvider";
import Loading from "@/components/Loading";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
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
    if (userName === "1" && password === "1") {
      login();
      navigate("/");
    } else {
      setErrorUserName("Неверное имя");
      setErrorPassword("Неверный пароль");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);

      isAuthenticated && navigate("/");
    }, 1000);
  }, [isAuthenticated, navigate]);

  if (isLoading) return <Loading isCenter={true} />;

  return (
    <div className="login-container">
      <form action="" className="login-form" onSubmit={(e) => handleClick(e)}>
        <label htmlFor="">
          <input
            className="loginUsername"
            type="text"
            onChange={(e) => changeUserName(e)}
            placeholder="Имя пользователя"
          />
          <p className="errorInvalid">{errorUserName}</p>
        </label>

        <label htmlFor="">
          <input
            className="loginPassword"
            type="password"
            onChange={(e) => changePassword(e)}
            placeholder="Пароль"
          />
          <p className="errorInvalid">{errorPassword}</p>
        </label>
        <button type="submit" className="loginButton">
          Вход
        </button>
      </form>
    </div>
  );
};
export default Login;
