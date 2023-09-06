import React, { Fragment, useContext } from "react";
import GratitudeContext from "../../context/gratitude/gratitudeContext";
import "materialize-css/dist/css/materialize.min.css";
// import Moment from 'react-moment';
import PropTypes from "prop-types";

const GratitudeItem = ({ gratitude }) => {
  const gratitudeContext = useContext(GratitudeContext);
  const { deleteGratitude, setCurrent, clearCurrent } = gratitudeContext;

  const { _id, item, category } = gratitude;

  const onDelete = () => {
    deleteGratitude(_id);
    clearCurrent();
  };

  return (
    <Fragment>
      {/* This is the list of gratitude items that will cycle through with maps in gratitude form */}

      <li className='collection-item'>
        <div className='row'>
          <p style={{ fontSize: "24px" }}>{item}</p>
        </div>
        <span style={{ float: "left" }} className='chip show-on-small'>
          {category}{" "}
        </span>

        <span>
          <a
            className='waves-effect waves-yellow lighten-3 btn-flat'
            onClick={() => setCurrent(gratitude)}
            href='/#'
          >
            <i className='material-icons'>create</i>
          </a>
        </span>
        <span>
          <a
            className='waves-effect waves-red btn-flat'
            onClick={onDelete}
            href='/#'
          >
            <i className='material-icons'>delete_outline</i>
          </a>
        </span>

        {/* <Moment format='MMMM Do YYYY, h:mm:ss a'>{grat.date}</Moment> */}
      </li>
    </Fragment>
  );
};

GratitudeItem.propTypes = {
  gratitude: PropTypes.object.isRequired
};

export default GratitudeItem;
