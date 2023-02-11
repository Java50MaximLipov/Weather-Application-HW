import { weatherConfig } from "../config/weather-config.js";
export class DataProcessor {
    #url
    #city
    constructor(url, city) {
        this.#url = weatherConfig.url;
        this.#city = weatherConfig.cities;
    }
    // async getData(latitude, longitude) {
    //     const responseFromServer =
    //         await fetch(`${this.#url}&latitude=${latitude}&longitude=${longitude}`);
    //     return responseFromServer.json();
    // }
    async getTemperatureData(city, startDate, endDate, hourFrom, hourTo) {
        //TODO
        const responseFromServer =
            await fetch(`${this.#url}&latitude=${getCityCoordinates(city).latitude}&longitude=${getCityCoordinates(city).longitude}
            &start_date=${startDate}&end_date=${endDate}`).join('');
        return getDateHourTemperatureObjectArray(await responseFromServer.join(''));
    }
}
function getCityCoordinates(city, weatherConfig) {
    const cityCoordinates = weatherConfig.cities[cityName];
    return cityCoordinates ? { latitude: city.latitude, longitude: city.longitude } : {};
}
function getDateHourTemperatureObjectArray(dataResponseFromServer) {
    const time = dataResponseFromServer.hourly.time;
    const temperature = dataResponseFromServer.hourly.temperature_2m;
    let result = [];
    time.forEach((time, index) => {
        let dateObject = time.split("T")[0];
        let hourObject = parseInt(time.split("T")[1].split(":")[0]);
        let tempObject = temperature[index];
        result.push({ date: dateObject, hour: hourObject, temperature: tempObject });
    });
    return result;
}
