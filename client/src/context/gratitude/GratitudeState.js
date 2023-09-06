import React, { useReducer } from "react";
import axios from "axios";
import GratitudeContext from "./gratitudeContext";
import gratitudeReducer from "./gratitudeReducer";
import {
  ADD_GRAT,
  DELETE_GRAT,
  GET_GRATTITUDE,
  CLEAR_GRATTITUDE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_GRATTITUDE,
  GRAT_ERROR
} from "../types";

const GratitudeState = props => { 
  const initialState = {
    gratitudes: [],
    current: null,
    error: null
  };
  const [state, dispatch] = useReducer(gratitudeReducer, initialState);

  // Get Gratitude

  const getGratitude = async () => {
    const res = await axios.get("/api/gratitude");
    try {
      dispatch({
        type: GET_GRATTITUDE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GRAT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Gratitude

  const addGratitude = async gratitude => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/gratitude", gratitude, config);
      dispatch({
        type: ADD_GRAT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GRAT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Gratitude
  const deleteGratitude = async id => {
    try {
      await axios.delete(`/api/gratitude/${id}`);
      dispatch({
        type: DELETE_GRAT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: GRAT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current
  const setCurrent = gratitude => {
    dispatch({
      type: SET_CURRENT,
      payload: gratitude
    });
  };

  // Clear Current
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  // Update Gratitude
  const updateGratitude = async gratitude => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(
        `/api/gratitude/${gratitude._id}`,
        gratitude,
        config
      );
      dispatch({
        type: UPDATE_GRATTITUDE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GRAT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Gratitude

  const clearGratitude = () => {
    dispatch({
      type: CLEAR_GRATTITUDE
    });
  };

  return (
    <GratitudeContext.Provider
      value={{
        gratitudes: state.gratitudes,
        current: state.current,
        error: state.error,
        setCurrent,
        clearCurrent,
        addGratitude,
        deleteGratitude,
        updateGratitude,
        getGratitude,
        clearGratitude
      }}
    >
      {props.children}
    </GratitudeContext.Provider>
  );
};

export default GratitudeState;
