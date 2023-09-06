import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import "materialize-css/dist/css/materialize.min.css";

const Login = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <form className='col s10' onSubmit={onSubmit}>
      <div className='container'>
        <h1 style={{ fontSize: "35px", textAlign: "center" }}>Login</h1>

        {/* email */}
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='input-field'
              type='email'
              value={email}
              name='email'
              onChange={onChange}
              style={{
                borderBottom: "1px solid #e57373",
                boxShadow: "0 1px 0 0 #e57373"
              }}
            />
            <label htmlFor='email'>Email</label>
          </div>
        </div>
        {/* password */}
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='input-field'
              type='password'
              value={password}
              name='password'
              onChange={onChange}
              style={{
                borderBottom: "1px solid #e57373",
                boxShadow: "0 1px 0 0 #e57373"
              }}
            />
            <label htmlFor='password'>Password</label>
          </div>
        </div>

        <input
          type='submit'
          value='login'
          className='btn waves-effect waves-light red lighten-2'
        />
      </div>
    </form>
  );
};

export default Login;
