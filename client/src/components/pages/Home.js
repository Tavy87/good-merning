import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className='container'
      style={{ textAlign: "center", paddingLeft: "25%" }}
    >
      <div style={{ display: "inline-block" }}>
        <h1>Hello {user && user.name}!</h1>
        <h2>How do you feel right now?</h2>
        <div className='row'>
          {/* <a className='btn-floating btn-large waves-effect waves-light red moodButton'>
            <i
              className='material-icons moodIcons'
              style={{ fontSize: "48px" }}
            >
              sentiment_very_satisfied
            </i>
          </a>
          <a className='btn-floating btn-large waves-effect waves-light red moodButton'>
            <i className=' moodIcons material-icons'>sentiment_satisfied_alt</i>
          </a>

          <a className='btn-floating btn-large waves-effect waves-light red moodButton'>
            <i className='material-icons moodIcons'>sentiment_satisfied</i>
          </a>
          <a className='btn-floating btn-large waves-effect waves-light red moodButton'>
            <i className='material-icons moodIcons'>sentiment_dissatisfied</i>
          </a>
          <a className='btn-floating btn-large waves-effect waves-light red moodButton'>
            <i className='material-icons moodIcons'>
              sentiment_very_dissatisfied
            </i>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
