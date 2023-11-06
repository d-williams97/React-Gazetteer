import React from "react";
import { useState, useEffect } from "react";

import ModalPreloader from "../../modal preloader/ModalPreloader";

import styles from "./Button.module.css";
import modalStyles from "./Modal.module.css";

import wikipng from "../../../assets/imageNotFound.png";

import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faW } from "@fortawesome/free-solid-svg-icons";

const API_BASE = "http://localhost:3001";

const WikiBtn = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [wikiData, setWikiData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [wikiData]);

  const wikiBtnHandler = async () => {
    setModalShow(true);
    const data = await fetch(
      `${API_BASE}/wiki-data/${props.geoJsonData.properties.name}`
    )
      .then((res) => res.json())
      .catch((e) => console.error("Error", e));
    setWikiData(data);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setWikiData(false);
  };

  let wikiUrl;
  let wikiSummary;
  let wikiImg;

  if (wikiData) {
    wikiUrl = wikiData.wikipediaUrl;
    wikiSummary = wikiData.summary.slice(0, -5);
    !wikiData.thumbnailImg ? wikiImg = wikipng : wikiImg = wikiData.thumbnailImg;
  }

  return (
    <>
      <button className={styles.wikiBtn} onClick={wikiBtnHandler}>
        <FontAwesomeIcon icon={faW} />
      </button>

      {wikiData && (
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
            >{`Wiki Summary - ${props.geoJsonData.properties.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <img className="w-50 img-fluid" src={wikiImg} />
            </div>
            <div>
              <p className="mt-3 text-wrap text-black">{ `${wikiSummary} ...`}</p>
              <a
                href={`https://${wikiUrl}`}
                target="_blank"
                className="link-opacity-50"
              >
                Find out more
              </a>
            </div>
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

export default WikiBtn;
