import React, { useContext, useEffect } from "react";
import AffirmationsContext from "../../context/affirmations/affirmationsContext";

const AffirmationContainer = () => {
  const affirmationsContext = useContext(AffirmationsContext);
  const { affirmations, getAffirmation } = affirmationsContext;

  const output = document.querySelector("#output");
  const display = s => (output.innerText = s);

  useEffect(() => {
    getAffirmation();

    // eslint-disable-next-line
  }, []);

  return (
    <div
      className='container'
      style={{ overflow: "visible", paddingTop: "3%" }}
    >
      <div
        id='output'
        style={{
          width: "auto",
          height: "50vh",
          //background: "#ffcdd2",
          border: "3px solid #494949",
          color: "#494949",
          fontSize: "5em",
          textAlign: "center",
          paddingTop: "5%"
        }}
      >
        {affirmations.forEach((affirmation, i) => {
          setTimeout(() => {
            display(affirmation.affirm);
          }, i * 5000);
        })}
      </div>

      {/*
        Would be nice to add a button that would start the map over again. 
        Might also change background by having a row of background buttons that people can select
       */}
    </div>
  );
};

export default AffirmationContainer;
