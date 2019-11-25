import axios from "axios";
import { APIURL } from "../secret";

export const sendMail = (data) => {
  axios
    .post(`${APIURL}/mail`, data)
    .then(res => {
      if (res.data) {
        return res.data
      }
    })
    .catch(error => {
      console.log(error);
    });
};