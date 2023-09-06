import React, { Fragment } from "react";
import GratitudeContainer from "../gratitude/GratitudeContainer";
import GratitudeForm from "../gratitude/GratitudeForm";

const Gratitude = () => {
  return (
    <Fragment>
      <GratitudeForm />
      <GratitudeContainer />
    </Fragment>
  );
};
export default Gratitude;
