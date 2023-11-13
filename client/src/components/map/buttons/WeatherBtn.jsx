import React from "react";
import { useState, useEffect } from "react";

import ModalPreloader from "../../modal preloader/ModalPreloader";

import styles from "./Button.module.css";
import modalStyles from "./Modal.module.css";

import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";

// const API_BASE = "http://localhost:3001";
const API_BASE = "https://react-gazetteer-server.vercel.app";

const WeatherBtn = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [weatherData, setWeatherData] = useState(false);
  const [capitalData, setCapitalData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // For loading the preloader
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [modalShow]);

  const weatherBtnHandler = async () => {
    setModalShow(true);
    // Get capital City
    const capitalCity = await fetch(
      `${API_BASE}/capital-city/${props.geoJsonData.properties.iso_a2}`
    )
      .then((res) => res.json())
      .catch((e) => console.error("Error", e));

    setCapitalData(capitalCity);

    // Get Weather data
    const weather = await fetch(`${API_BASE}/weather/${capitalCity}`)
      .then((res) => res.json())
      .catch((e) => console.error("Error", e));

    setWeatherData(weather);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setWeatherData(false);
  };

  // Modal Variables //
  let icon;
  let icon1;
  let icon2;

  let day1Data;
  let day1Date;
  let dayOfWeek1;
  let dayOfMonth1;

  let day2Data;
  let day2Date;
  let dayOfWeek2;
  let dayOfMonth2;

  let lastUpdated;
  let dateTime;
  let hours;
  let minutes;
  let todayDateData;
  let todayDate;
  let todayDayOfMonth;

  if (weatherData) {
    icon = weatherData.forecast.forecastday[0].day.condition.icon;
    icon1 = weatherData.forecast.forecastday[1].day.condition.icon;
    icon2 = weatherData.forecast.forecastday[2].day.condition.icon;

    day1Data = weatherData.forecast.forecastday[1].date.toString();
    day1Date = new Date(day1Data);
    dayOfWeek1 = day1Date.toLocaleString("en-GB", {
      weekday: "short",
    });
    dayOfMonth1 = day1Date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
    });

    day2Data = weatherData.forecast.forecastday[2].date.toString();
    day2Date = new Date(day2Data);
    dayOfWeek2 = day2Date.toLocaleString("en-US", {
      weekday: "short",
    });
    dayOfMonth2 = day2Date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
    });

    lastUpdated = weatherData.current.last_updated;
    dateTime = new Date(lastUpdated);
    hours = dateTime.getHours().toString().padStart(2, "0");
    minutes = dateTime.getMinutes().toString().padStart(2, "0");
    todayDateData = weatherData.forecast.forecastday[0].date.toString();
    todayDate = new Date(todayDateData);
    todayDayOfMonth = todayDate.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
    });
  }

  return (
    <>
      <button className={styles.weatherBtn} onClick={weatherBtnHandler}>
        <FontAwesomeIcon icon={faCloud } style={{fontSize: '1.3rem'}} />
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
            >{ weatherData && `Weather - ${capitalData}, ${props.geoJsonData.properties.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pe-4">
            <Container className="m-2">
              <Row>
                <Col className="border m-2">
                  <p className="fw-bold fs-5 mt-1">TODAY</p>
                  <Row>
                    <Col className="text-center m-3">
                      <p className="fw-bold fs-6">
                        { weatherData && weatherData.forecast.forecastday[0].day.condition.text}
                      </p>
                    </Col>
                    <Col className="text-center">
                      <Image
                        fluid
                        src={icon}
                        alt="Today Weather icon"
                        title="Today Weather icon"
                      />
                    </Col>
                    <Col className="text-center">
                      <p className="fw-bold fs-4 mb-0">
                        <span>
                          { weatherData && weatherData.forecast.forecastday[0].day.maxtemp_c}
                        </span>
                        <sup>o</sup>
                        <span>c</span>
                      </p>
                      <p className="fs-5 mt-0 text-secondary">
                        <span>
                          {weatherData && weatherData.forecast.forecastday[0].day.mintemp_c}
                        </span>
                        <sup>o</sup>
                        <span>c</span>
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col className="border m-2">
                  <Row>
                    <Col className="text-center">
                      <p className="fw-bold fs-6 mt-3">{`${dayOfWeek1} ${dayOfMonth1}`}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <p className="fw-bold fs-4 mb-0">
                        <span>
                          {weatherData && weatherData.forecast.forecastday[1].day.maxtemp_c}
                        </span>
                        <sup>o</sup>c
                      </p>
                      <p className="fs-5 mt-0 text-secondary">
                        <span>
                          {weatherData && weatherData.forecast.forecastday[0].day.mintemp_c}
                        </span>
                        <sup>o</sup>c
                      </p>
                    </Col>
                    <Col className="text-center">
                      <Image
                        src={icon1}
                        alt="Day 2 weather icon"
                        title="Day 2 weather icon "
                      />
                    </Col>
                  </Row>
                </Col>

                <Col className="border m-2">
                  <Row>
                    <Col className="text-center">
                      <p
                        className="fw-bold fs-6 mt-3"
                        id="day2Date"
                      >{`${dayOfWeek2} ${dayOfMonth2}`}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <p className="fw-bold fs-4 mb-0">
                        <span>
                          {weatherData && weatherData.forecast.forecastday[2].day.maxtemp_c}
                        </span>
                        <sup>o</sup>c
                      </p>
                      <p className="fs-5 mt-0 text-secondary">
                        <span>
                          {weatherData && weatherData.forecast.forecastday[2].day.mintemp_c}
                        </span>
                        <sup>o</sup>c
                      </p>
                    </Col>
                    <Col className="text-center">
                      <Image
                        src={icon2}
                        alt="Day 3 weather icon "
                        title="Day 3 weather icon "
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <p className="fs-6 fw-light">
              Last updated <span>{lastUpdated}</span>. Powered by
              <a href="https://www.weatherapi.com/" target="_blank">
                WeatherAPI.com
              </a>
            </p>

            <Button variant="outline-primary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )
    </>
  );
};

export default WeatherBtn;
