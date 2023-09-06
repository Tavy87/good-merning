import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

import "materialize-css/dist/css/materialize.min.css";

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <form className='col s10' onSubmit={onSubmit}>
      <div className='container'>
        <h1 style={{ fontSize: "35px", textAlign: "center" }}>Register</h1>
        {/* name */}
        <div className='input-field col s6'>
          <input
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
          />
          <label htmlFor='name'>Name</label>
        </div>
        {/* email */}
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='email'
              type='email'
              value={email}
              name='email'
              onChange={onChange}
            />
            <label htmlFor='email'>Email</label>
          </div>
        </div>
        {/* password */}
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='password'
              type='password'
              value={password}
              name='password'
              minLength='8'
              onChange={onChange}
            />
            <label htmlFor='password'>Password</label>
          </div>
        </div>
        {/* password2 */}
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='password2'
              type='password'
              name='password2'
              value={password2}
              minLength='8'
              onChange={onChange}
            />
            <label htmlFor='password2'>Password</label>
          </div>
        </div>
        <input
          type='submit'
          value='register'
          className='btn waves-effect waves-light red lighten-2'
        />
      </div>
    </form>
  );
};

export default Register;
