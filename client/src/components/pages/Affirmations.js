import React, { Fragment } from "react";
import AffirmationForm from "../affirmations/AffirmationForm";

//import AffirmationCarousel from "../affirmations/AffirmationCarousel";
import AffirmationContainer from "../affirmations/AffirmationContainer";

const Affirmations = () => {
  return (
    <Fragment>
      <AffirmationContainer />
      <AffirmationForm />
    </Fragment>
  );
};

export default Affirmations;
