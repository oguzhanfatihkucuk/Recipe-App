import API_URL, { API_URL_USR } from "../../assets/js/api";
import { post } from "axios";
//import axios from 'axios'; //this is optional to use axios

export const fetchMockBackendData = async () => {
  try {
    //const response = await axios.get(API_URL);
    const response = await fetch(API_URL);
    if (!response.ok) {
       new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching mock backend data:", error);
    return null;
  }
};


export const fetchMockBackendUserData = async () => {
  try {
    //const response = await axios.get(API_URL);
    const response = await fetch(API_URL_USR);
    if (!response.ok) {
      new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching mock backend data:", error);
    return null;
  }
};



