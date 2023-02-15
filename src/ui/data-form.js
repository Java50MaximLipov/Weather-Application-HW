import { weatherConfig } from "../config/weather-config.js";

const FORM_ID = "data-form-id";
const DATE_FROM_ID = "date-from-id";
const DATE_TO_ID = "date-to-id"
const HOUR_FROM_ID = "hour-from-id";
const HOUR_TO_ID = "hour-to-id";
export class DataForm {
    #formElement;
    #dateFromElement;
    #dateToElement;
    constructor(parentId, maxDays) {
        const parentElement = document.getElementById(parentId);
        this.#fillForm(parentElement);
        this.#formElement = document.getElementById(FORM_ID);
        this.#dateToElement = document.getElementById(DATE_TO_ID);
        this.#dateFromElement = document.getElementById(DATE_FROM_ID);
        this.#setMinMaxDates(maxDays);
    }
    #fillForm(parentElement) {
        parentElement.innerHTML = `
        <form id="${FORM_ID}">
            <select id="city-selector" required>
                <option value="" disabled selected>Select a city</option>
            </select>
            <input type="date" id="${DATE_FROM_ID} required">
            <input type="date" id="${DATE_TO_ID}" required>
            <input type="number" id="${HOUR_FROM_ID}" min="1" max="24" required>
            <input type="number" id="${HOUR_TO_ID}" min="1" max="24" required>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
        </form>`
        
        this.#citySelector();
    }
    #setMinMaxDates(maxDays) {
        const current = new Date();
        const maxDayOfMonth = current.getDate() + maxDays;
        const maxDate = new Date();
        maxDate.setDate(maxDayOfMonth);
        const minDateStr = current.toISOString().split("T")[0];
        const maxDateStr = maxDate.toISOString().split("T")[0];
        this.#dateFromElement.min = minDateStr;
        this.#dateToElement.min = minDateStr;
        this.#dateFromElement.max = maxDateStr;
        this.#dateToElement.max = maxDateStr;
    }
    #citySelector() {
        const cities = document.getElementById("city-selector");
        const citiesList = Object.keys(weatherConfig.cities);
        cities.innerHTML += citiesList.map(city =>
            `
            <option value="${city}">${city}</option>
            `)
    }
}