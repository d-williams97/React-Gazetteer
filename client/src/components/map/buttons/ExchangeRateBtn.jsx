import React from "react";
import { useState, useEffect } from "react";

import ModalPreloader from "../../modal preloader/ModalPreloader";

import styles from "./Button.module.css";
import modalStyles from "./Modal.module.css";

import { Button, Modal } from "react-bootstrap";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const API_BASE = "http://localhost:3001";

const ExchangeRateBtn = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currencyData, setCurrencyData] = useState(false);
  const [er, setEr] = useState(false);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  },[er]);

  const erBtnHandler = async () => {
    setModalShow(true);
    const currency = await fetch(
      `${API_BASE}/currency/${props.geoJsonData.properties.iso_a2}`
    )
      .then((res) => res.json())
      .catch((e) => console.error("Error", e));
      setCurrencyData(currency);
     
      const exchangeRate = await fetch(
        `${API_BASE}/er/`
      )
        .then((res) => res.json())
        .catch((e) => console.error("Error", e));

        setEr(exchangeRate);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setEr(false);
  };


  let code;
  let rate;
  if (er) {
    code = Object.keys(currencyData)[0];
    rate = er.rates[code];
    console.log(rate)


  }

  return (
    <>
      <button className={styles.erBtn} onClick={erBtnHandler}>
        <FontAwesomeIcon icon={faDollarSign} />
      </button>

      {er && (
        <Modal
          show={modalShow}
          onHide={handleModalClose}
          animation={true}
          centered
        >
          {/* <ModalPreloader loading={loading} /> */}
          <Modal.Header className={modalStyles.basicDataModal}>
            <Modal.Title
              className={modalStyles.basicDataTitle}
            >{`Exchange Rate - ${props.geoJsonData.properties.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {/* <form>
                    <div class="form-floating mb-3">
                      <input
                        id="fromValue"
                        type="number"
                        class="form-control"
                        value="1"
                        min="1"
                        step="1"
                      />
                      <label for="fromValue">From USD</label>
                    </div>

                    <div class="form-floating mb-3">
                      <input id="exchangeRate" class="form-control" disabled />
                      <label for="exchangeRate">Convert to</label>
                    </div>

                    <div class="form-floating">
                      <input
                        id="erResult"
                        type="text"
                        class="form-control"
                        disabled
                      />
                      <label for="erResult">Result</label>
                    </div>
                  </form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ExchangeRateBtn;
