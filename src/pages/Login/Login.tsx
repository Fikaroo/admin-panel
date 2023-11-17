import "./Login.scss";

const Login = () => {
  return (
    <div className="login-container">
      <form action="" className="login-form">

        <label htmlFor="">
          <input type="text" placeholder="Username"/>
        </label>

        <label htmlFor="">
          <input type="password"  placeholder="Password"/>
        </label>
        <button>Вход</button>
      </form>
    </div>
  );
};
export default Login;
