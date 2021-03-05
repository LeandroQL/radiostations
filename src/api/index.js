const API_URL = process.env.REACT_APP_API_URL;
const STATIONS_URI = `${API_URL}/station`;

const conect = (uri, options = {}) => {
  return fetch(uri, options).then(async (answer) => {
    if (answer.ok) {
      const data = await answer.json();
      return data;
    }
    throw new Error(answer);
  })
}

const stationList = () => conect(STATIONS_URI);

export default {
  stationList
}