import React, { useState, useEffect } from "react";
import axios from "axios";
import { getGeoLocationData } from "../Features/UserSlice";



const Location = () =>{
  const [ip , setIp] = useState(null); //State to hold the IP address
  const [country , setCountry] = useState(null); //State to hold geolocation
  const [region , setRegion] = useState(null); // State to hold geolocation
  useEffect(() => {
    getGeoLocationData();
}, []);
const getGeoLocationData = async () => {
  try { 
    const response = await axios.get("https://geo.ipify.org/api/v2/country?apiKey=at_10tfuYpbJdQW3liL6iF95tTik8Gtv");
    setIp(response.data.ip);
    setCountry(response.data.location.country); // Set country
    setRegion(response.data.location.region); // Set region
   
  } catch (error) {
    console.error("Error fetching geolocation data:", error.message);
  }
};
return (
  <div>
    <h6>{ip}</h6>
    <h6>{country}</h6>
    <h6>{region}</h6>
  </div>
);
}
export default Location;