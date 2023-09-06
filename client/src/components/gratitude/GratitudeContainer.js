import React, { useContext, useEffect } from "react";
// import Moment from 'react-moment';
import GratitudeContext from "../../context/gratitude/gratitudeContext";

import GratitudeItem from "./GratitudeItem";

const GratitudeContainer = () => {
  const gratitudeContext = useContext(GratitudeContext);

  const { gratitudes, getGratitude } = gratitudeContext;

  useEffect(() => {
    getGratitude();

    // eslint-disable-next-line
  }, []);

  return (
    <div className='container' style={{ overflow: "visible" }}>
      {/* This is the list of gratitude items that will cycle through with maps in gratitude form */}
      <ul className='collection'>
        {gratitudes.map(gratitude => (
          <GratitudeItem key={gratitude._id} gratitude={gratitude} />
        ))}
      </ul>
    </div>
  );
};

export default GratitudeContainer;
