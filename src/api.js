const BYPASS_CORS = "https://cors-anywhere.herokuapp.com/",
  API_KEY = "at_GAJlnriYc2Ysc10RvWBfBMgTsNpg2",
  TILE_LAYER = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ENDPOINT_IPIFY = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}`;

const mymap = L.map("mapid"),
  icon = L.icon({
    iconUrl: "./public/assets/icon-location.svg",
  });

const sendRequest = async (value = "") => {
  const ipAddress = value ? `&ipAddress=${value}` : "";
  const request = await fetch(`${BYPASS_CORS}${ENDPOINT_IPIFY}${ipAddress}`);
  const {
    ip,
    isp,
    location: { city, region, timezone, postalCode, lat, lng },
  } = await request.json();

  printMap(lat, lng);

  return [
    {
      title: "ip address",
      value: ip,
    },
    {
      title: "location",
      value: `${city}, ${region} ${postalCode}`,
    },
    {
      title: "timezone",
      value: `UTC ${timezone}`,
    },
    {
      title: "isp",
      value: isp,
    },
  ];
};

const printMap = (latitude, longitude) => {
  mymap.setView([latitude, longitude], 17);
  L.tileLayer(TILE_LAYER, {
    attribution: ATTRIBUTION,
    maxZoom: 17,
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(mymap);
  addMarker(latitude, longitude, mymap);
};

const addMarker = (latitude, longitude, mymap) => {
  L.marker([latitude, longitude], { icon }).addTo(mymap);
};

export { sendRequest };
