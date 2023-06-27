import axios from "axios";

const apiLocation = "https://opendata.resas-portal.go.jp/api/v1/";
const apiKey = process.env.REACT_APP_API_KEY;

if (!apiKey) {
  throw new Error(
    "REACT_APP_API_KEY is not found, please check .env file for api key"
  );
}

const initAxiosGlobalConfigs = () => {
  axios.defaults.baseURL = apiLocation;
  axios.defaults.headers.common["X-API-KEY"] = apiKey;
  axios.defaults.headers.post["Content-Type"] = "application/json";
};

export default initAxiosGlobalConfigs;
