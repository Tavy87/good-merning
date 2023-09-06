import React, { useContext, useState, Fragment } from "react";
import AffirmationContext from "../../context/affirmations/affirmationsContext";
import M from "materialize-css/dist/js/materialize.min.js";

import "materialize-css/dist/css/materialize.min.css";

const AffirmationForm = () => {
  const affirmationContext = useContext(AffirmationContext);

  const { addAffirmation, current } = affirmationContext;

  document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(
      "input#input_text, textarea#icon_prefix2"
    );
    M.CharacterCounter.init(elems);
  });

  const onChange = e =>
    setAffirmation({ ...affirmation, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addAffirmation(affirmation);
    }
  };

  const [affirmation, setAffirmation] = useState({
    affirm: ""
  });

  const { affirm } = affirmation;

  return (
    <Fragment>
      {/* break point between inputs */}
      <div className='container' style={{ paddingTop: "3%" }}>
        <div className='row'>
          <form className='col s12' onSubmit={onSubmit}>
            <div className='row'>
              <div className='input-field col s11'>
                <i className='material-icons prefix '>favorite_border</i>
                <input
                  type='text'
                  name='affirm'
                  value={affirm}
                  onChange={onChange}
                  id='input_text'
                  className='materialize-textarea '
                  data-length='100'
                  style={{
                    borderBottom: "1px solid #e57373",
                    boxShadow: "0 1px 0 0 #e57373"
                  }}
                ></input>
                <label htmlfor='affirm' style={{ color: "#e57373" }}>
                  affirm
                </label>
              </div>

              <div className='input-field col s1'>
                <button
                  className='btn waves-effect waves-light red lighten-2'
                  type='submit'
                  affirm='action'
                >
                  Go!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AffirmationForm;
