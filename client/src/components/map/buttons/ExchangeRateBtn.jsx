import React from "react";
import { useState, useEffect, useReducer } from "react";

import ModalPreloader from "../../modal preloader/ModalPreloader";

import styles from "./Button.module.css";
import modalStyles from "./Modal.module.css";

import { Button, Modal } from "react-bootstrap";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const API_BASE = "http://localhost:3001";

const ExchangeRateBtn = (props) => {

  let countryCode;

  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialState = {
    value: 1,
    erValue: 0,
    totalConverted: 0,
    currencyData: false
  }

  const convertedReducer = (state, action) => {
    switch(action.type) {
      case 'SET_VALUE' :
        return{...state, value: action.payload, totalConverted: numeral(action.payload * state.erValue).format('0.0')};
      case 'SET_ER_VALUE' : 
        return{...state, erValue: action.payload, totalConverted: numeral(state.value * action.payload).format('0.0')};
      case 'SET_CURRENCY_DATA': {
        return {...state, currencyData: action.payload}
      }
    }
  }

  const [state, dispatch] = useReducer(convertedReducer,initialState)


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  },[modalShow]);

  const erBtnHandler = async () => {
    setModalShow(true);
    
    await fetch(
      `${API_BASE}/currency/${props.geoJsonData.properties.iso_a2}`
    )
      .then((res) => res.json())
      .then((data) => {
        countryCode = Object.keys(data)[0];
        dispatch({type: 'SET_CURRENCY_DATA', payload: data[countryCode]})
      })
      .catch((e) => console.error("Error", e));
     
    await fetch(
        `${API_BASE}/er/`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({type:'SET_ER_VALUE', payload: numeral(data.rates[countryCode]).format('0.0')})
        })
        .catch((e) => console.error("Error", e));   
  };

  const handleModalClose = () => {
    setModalShow(false);
    dispatch({type:'SET_CURRENCY_DATA', payload: false})

  };

  const changeCurrencyHandler = (value) => {
    dispatch({type: 'SET_VALUE', payload: value})
  }


  return (
    <>
      <button className={styles.erBtn} onClick={erBtnHandler}>
        <FontAwesomeIcon icon={faDollarSign} style={{fontSize: '1.5rem'}} />
      </button>

       (
        <Modal
          show={modalShow}
          onHide={handleModalClose}
          animation={true}
          centered
        >
          <ModalPreloader loading={loading} />
          <Modal.Header className={modalStyles.basicDataModal}>
            <Modal.Title
              className={modalStyles.basicDataTitle}
            >{state.currencyData && `Exchange Rate - ${props.geoJsonData.properties.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <form>
                <div className="form-floating mb-3">
                  <input
                    id="formValue"
                    type="number"
                    className="form-control"
                    value={state.value}
                    min="1"
                    step="1"
                    onChange={(e) => {
                      changeCurrencyHandler(e.target.value)
                    }}
                  />
                  <label htmlFor="fromValue">From USD</label>
                </div>

                <div className="form-floating mb-3">
                  <input id="exchangeRate" className="form-control" disabled value={ state.currencyData && state.currencyData.name} />
                  <label htmlFor="exchangeRate">Convert to</label>
                </div>

                <div className="form-floating">
                  <input
                    id="erResult"
                    type="text"
                    className="form-control"
                    disabled
                    value={ state.currencyData &&`${state.currencyData.symbol} ${state.totalConverted}`}
                  />
                  <label htmlFor="erResult">Result</label>
                </div>
              </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )
    </>
  );
};

export default ExchangeRateBtn;
