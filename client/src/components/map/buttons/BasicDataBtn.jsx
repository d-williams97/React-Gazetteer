import React from "react";
import { useState, useEffect } from "react";

import ModalPreloader from "../../modal preloader/ModalPreloader";

import styles from "./Button.module.css";
import modalStyles from './Modal.module.css'


import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from 'react-bootstrap/Table';
import numeral from "numeral";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCity, faEarthAmericas, faPerson, faMountain, faFlag} from '@fortawesome/free-solid-svg-icons'
import infoIcon from "../../../assets/info.png";


const API_BASE = 'http://localhost:3001'

const BasicDataBtn = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [basicData, setBasicData ] = useState(false);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { // For loading the preloader
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  },[basicData])



  const basicDataBtnHandler = async () => {
    setModalShow(true);

    const data  = await fetch(`${API_BASE}/basic-data/${props.geoJsonData.properties.iso_a2}`)
    .then(res => res.json())
    .catch(e => console.error('Error: ', e));

    setBasicData(data.geonames[0]);
    
    const flag = await fetch(`${API_BASE}/flag-data/${props.geoJsonData.properties.name}`)
    .then(res => res.json())
    .catch(e => console.error('Error', e))
    
    setFlag(flag);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setBasicData(false);
    setFlag(false);
  }

  return (
    <>
      <button className={styles.button} onClick={basicDataBtnHandler} >
        <img
          src={infoIcon}
          className={styles.icon}
        />
      </button>

      {basicData && <Modal 
      show={modalShow} 
      onHide={handleModalClose} 
      animation={true} 
      centered
      > <ModalPreloader loading={loading} />
        <Modal.Header className={modalStyles.basicDataModal}>
          <Modal.Title className={modalStyles.basicDataTitle}>{`Overview - ${props.geoJsonData.properties.name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped hover responsive className={modalStyles.table}>
      <tbody>
        <tr>
          <td><FontAwesomeIcon icon={faCity} className={modalStyles.basicIcon}/></td>
          <td>Capital City</td>
          <td className={modalStyles.td}> {basicData.capital} </td>
        </tr>

        <tr>
          <td><FontAwesomeIcon icon={faEarthAmericas} className={modalStyles.basicIcon}/> </td>
          <td>Continent</td>
          <td className={modalStyles.td}>{basicData.continentName}</td>
        </tr>

        <tr>
          <td><FontAwesomeIcon icon={faPerson} className={modalStyles.basicIcon}/></td>
          <td>Population</td>
          <td className={modalStyles.td}>{numeral(basicData.population).format('0,0')}</td>
        </tr>

        <tr>
          <td><FontAwesomeIcon icon={faMountain} className={modalStyles.basicIcon}/></td>
          <td>Area</td>
          <td className={modalStyles.td}> <p>{`${numeral(basicData.areaInSqKm).format('0,0')} km`}</p></td>
        </tr>

        <tr>
          <td><FontAwesomeIcon icon={faFlag} className={modalStyles.basicIcon}/></td>
          <td>Flag</td>
          <td className={modalStyles.td}> { flag && flag ? 
            <img src={ flag.flags.png} className={modalStyles.flag} /> :
            <div className={modalStyles.flag2}>{flag.flag}</div>
          }
          </td>
        </tr>
      </tbody>
    </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> }
    </>
  );
};

export default BasicDataBtn;
