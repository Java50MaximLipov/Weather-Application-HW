import { weatherConfig } from "./config/weather-config.js";
import { DataProcessor } from "./service/DataProcessor.js";

const url = weatherConfig.url;
const cities = weatherConfig.cities;
const dataProcessor = new DataProcessor(url, cities);
const city = "Tel_Aviv";
const startDate = "2023-02-11";
const endDate = "2023-02-27";
const hoursFrom = 0;
const hoursTo = 23;
async function displayTemperatures() {
    const data = await dataProcessor.getTemperatureData(city, startDate, endDate, hoursFrom, hoursTo);
    // console.log(data.hourly.temperature_2m)
}
displayTemperatures();