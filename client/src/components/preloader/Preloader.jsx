import React from "react";
import "./Preloader.css";
import ClipLoader from "react-spinners/ClipLoader";

const Preloader = (props) => {
  return (
    props.loading &&
    <div className="preloader">
        <ClipLoader
            loading={props.loading}
            size={150}
            color={'#4db5ff'}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> 
    </div>
  )
}

export default Preloader