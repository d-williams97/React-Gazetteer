import React from "react";
import styles from "./ModalPreloader.module.css";
import MoonLoader from "react-spinners/MoonLoader";

const ModalPreloader = (props) => {
  return (
    props.loading &&
    <div className={styles.preloader}>
        <MoonLoader
            loading={props.loading}
            size={80}
            color={'#4db5ff'}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> 
    </div>
  )
}

export default ModalPreloader