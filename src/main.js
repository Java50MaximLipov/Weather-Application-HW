import { weatherConfig } from "./config/weather-config.js";
import { DataProcessor } from "./service/DataProcessor.js";
import { DataForm } from "./ui/data-form.js";
import { Table } from "./ui/table.js";
const dataProcessor = new DataProcessor(weatherConfig.url, weatherConfig.cities);

const schema = [
    { columnName: 'Date', fieldName: 'Date' },
    { columnName: 'Hour', fieldName: 'Hour' },
    { columnName: "Temperature", fieldName: 'Temperature' }
]
const dataForm = new DataForm("form-section", weatherConfig.maxDays);
const temperatureTable = new Table("table-section", "Temperature", schema);
async function handlerFun(data) {
    const temperatureData = await dataProcessor.getTemperatureData(data.city, data.dateFrom, data.dateTo, data.hourFrom, data.hourTo);
    const temperatureTableData = temperatureData.map(({ date, hour, temperature }) => ({ Date: date, Hour: hour, Temperature: temperature }));
    temperatureTable.update(temperatureTableData);
  }

dataForm.addHandler(handlerFun);