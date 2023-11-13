import React from "react";
import { useState, useEffect } from "react";

import ModalPreloader from "../../modal preloader/ModalPreloader";

import styles from "./Button.module.css";
import modalStyles from "./Modal.module.css";

import { Modal, Button, Row, Col, Container } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

// const API_BASE = "http://localhost:3001";
const API_BASE = "https://react-gazetteer-server.vercel.app"
let localTime;
let sunrise;
let sunset;
let gmtOffset;
let city;

const TimeZoneBtn = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [tzData, setTzData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // For loading the preloader
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [modalShow]);

  const tzBtnHandler = async () => {
    setModalShow(true);

    await fetch(`${API_BASE}/timezone/${props.geoJsonData.properties.iso_a2}`)
      .then((res) => res.json())
      .then((data) => {
        setTzData(data);
      })
      .catch((e) => console.error("Error: ", e));
  };

  const handleModalClose = () => {
    setModalShow(false);
    setTzData(false);
  };

  if (tzData) {
     localTime = tzData.time.split(" ")[1];
     sunrise = tzData.sunrise.split(" ")[1];
     sunset = tzData.sunset.split(" ")[1];
     gmtOffset = tzData.gmtOffset;
     city = tzData.city;
  }

  return (
    <>
      <button className={styles.tzBtn} onClick={tzBtnHandler}>
        <FontAwesomeIcon icon={faClock} style={{fontSize: '1.5rem'}} />
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
            >{`World Clock - ${city}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="row justify-content-between">
                <Col className="col-5 text-start">
                <p className="fs-6 text-secondary mb-0">{`Today, ${gmtOffset}HRS (GMT)`}</p>
                <p className="fs-3 mb-1">{city}</p>
                <div className="row text-secondary fs-6">
                  <div className="col-6">
                    <p className="p-0">{`Sunrise: ${sunrise}`}</p>
                  </div>
                  <div className="col-6">
                    <p className="p-0">{`Sunset: ${sunset}`}</p>
                  </div>
                </div>
              </Col>

              <Col className="col-7 pt-4">
                <p className="fs-1 fw-light">{localTime}</p>
              </Col>
            </Row>
            </Container>
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

export default TimeZoneBtn;
