import axios from "axios";

const authingClient = axios.create({
  baseURL: `${process.env.AUTHING_ISSUER}`,
  headers: {
    // Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
    "Content-Type": "application/json",
    "Accept-Encoding": "*",
    "x-authing-userpool-id":`${process.env.AUTHING_ACCESSKETID}`,
    // Authorization:"640a8f9d1741a26fbac64507",
  },
});


export default authingClient;
