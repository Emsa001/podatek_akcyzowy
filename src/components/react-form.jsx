import { useEffect, useState } from "preact/hooks";
import { vehicleOptions, currencies, optionalOptions } from "@utils/settings";
import { getCurrenciesRates } from "@utils/api";
import EmailForm from "./emailForm";

const defaultCurrency = optionalOptions.defaultCurrency;

function createNewJson(key) {
  const newJson = {};
  newJson[key] = optionalOptions[key];
  return newJson;
}

function Form() {
  const [carPrice, setCarPrice] = useState(0);
  const [currencyValue, setCurrencyValue] = useState({ code: "PLN", mid: 1 });
  const [currenciesRates, setCurrenciesRates] = useState([]);

  const [totalCost, setTotalCost] = useState(0);
  const [optionalTax, setOptionalTax] = useState({});
  const [totalTax, setTotalTax] = useState(0);
  const [excise, setExcise] = useState(0);
  const [excisePercentage, setExcisePercentage] = useState(vehicleOptions[0].value / 100);

  const [filteredVehicleOptions, setFilteredVehicleOptions] = useState(vehicleOptions);

  const getValueOnCurrency = (value) => {
    return parseFloat(value * currencyValue.mid).toFixed(2);
  };

  const handleEngineChange = (selectedEngineType) => {
    const filteredOptions = vehicleOptions.filter((option) => {
      return option.fuelType.includes(selectedEngineType);
    });

    setFilteredVehicleOptions(filteredOptions);
    setExcisePercentage(filteredOptions[0].value / 100);
  };

  const handleCheckboxChange = (tax) => {
    if (optionalTax[tax]) {
      const { [tax]: removedKey, ...rest } = optionalTax;
      setOptionalTax(rest);
    } else {
      const updatedJson = { ...optionalTax, ...createNewJson(tax) };
      setOptionalTax(updatedJson);
    }
  };

  const handleTaxUpdate = () => {
    let excise_temp = parseFloat(excisePercentage * carPrice);
    const sum = Object.values(optionalTax).reduce((accumulator, value) => accumulator + value.value, 0);

    let totalTax_temp = excise_temp + sum;
    let totalCost_temp = totalTax_temp + parseFloat(carPrice);

    setExcise(excise_temp.toFixed(2));
    setTotalCost(parseFloat(totalCost_temp).toFixed(2));
    setTotalTax(parseFloat(totalTax_temp).toFixed(2));
  };

  const handlePriceChange = (event) => {
    const { value } = event.target;
    if (!isNaN(value)) {
      setCarPrice(value);
    }
  };

  const handleCurrencyChange = (event) => {
    const currency = event.target.value;
    let selectedCurrency;

    if (currency === "PLN") {
      selectedCurrency = { code: "PLN", mid: 1 };
    } else {
      selectedCurrency = currenciesRates.find((item) => item.code === currency);
    }

    setCurrencyValue(selectedCurrency);

    handleTaxUpdate();
  };

  useEffect(() => {
    async function fetchCurrenciesRates() {
      const data = await getCurrenciesRates("A");
      setCurrenciesRates(data);
    }
    fetchCurrenciesRates();
    handleEngineChange("benzyna");
  }, []);

  useEffect(() => {
    handleTaxUpdate();
  }, [carPrice, excisePercentage, optionalTax]);

  return (
    <div className="container mx-auto py-8 w-9/12">
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceInput">
              Wartość Pojazdu:
            </label>
            <div className="relative flex items-center">
              <input className="appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="priceInput" type="text" value={carPrice} onChange={handlePriceChange} required />
              <select className="absolute inset-y-0 right-0 border border-l-0 rounded-r bg-white text-gray-700 font-bold py-2 px-3 focus:outline-none cursor-pointer" id="currencyInput" name="currencyInput" value={currencyValue.code} onChange={handleCurrencyChange}>
                {currencies.map((item, index) => (
                  <option key={index} value={item} selected={index === 0}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="engineInput">
              Rodzaj Napędu:
            </label>
            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="engineInput" name="engineInput" onChange={(event) => handleEngineChange(event.target.value)}>
              <option value="benzyna">Benzyna</option>
              <option value="diesel">Diesel</option>
              <option value="hybryda">Hybryda</option>
              <option value="elektryczny">Elektryczny</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="typeInput">
              Rodzaj Pojazdu:
            </label>
            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="typeInput" onChange={(event) => setExcisePercentage(event.target.value / 100)}>
              {filteredVehicleOptions.map((item, index) => (
                <option key={index} value={item.value} data-description={item.description}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Dodatkowe Parametry:</label>
            <div className="flex items-center mb-2">
              <input className="mr-2 leading-tight" type="checkbox" id="lpgCheckbox" name="lpgCheckbox" onChange={() => handleCheckboxChange("badaniaTechniczne")} autoComplete="off" />
              <label className="text-gray-700 text-sm" htmlFor="lpgCheckbox">
                Instalacja LPG/CNG
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input className="mr-2 leading-tight" type="checkbox" id="platesCheckbox" name="platesCheckbox" onChange={() => handleCheckboxChange("tabliceRejestracyjne")} autoComplete="off" />
              <label className="text-gray-700 text-sm" htmlFor="platesCheckbox">
                Indywidualne Tablice Rejestracyjne
              </label>
            </div>
            <div className="flex items-center">
              <input className="mr-2 leading-tight" type="checkbox" id="accidentCheckbox" name="accidentCheckbox" onChange={() => handleCheckboxChange("badaniaTechniczneKolizja")} autoComplete="off" />
              <label className="text-gray-700 text-sm" htmlFor="accidentCheckbox">
                Pojazd Powypadkowy/Kolizyjny
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-8 mx-auto">
          <div className="relative w-full">
            <div className="my-5 rounded-lg overflow-hidden">
              <div className="flex flex-col w-full bg-blue-200 p-4 text-center text-lg text-primary">
                <h4 className="mb-2">Całkowity koszt</h4>
                <span id="totalCost" className="font-semibold text-2xl">
                  {getValueOnCurrency(totalCost)}
                  {` ${defaultCurrency}`}
                </span>
              </div>
              <div className="text-center bg-gray-100 w-full grid grid-cols-2 text-lg">
                <div className="p-4">
                  <h4 className="mb-2">Pojazd</h4>
                  <span id="carCost" className="font-semibold">
                    {getValueOnCurrency(carPrice) || 0}
                    {` ${defaultCurrency}`}
                  </span>
                </div>
                <div className="p-4 bg-gray-200">
                  <h4 className="mb-2">Opłaty</h4>
                  <span id="taxes" className="font-semibold">
                    {getValueOnCurrency(totalTax)}
                    {` ${defaultCurrency}`}
                  </span>
                </div>
              </div>
            </div>
            <table className="w-full mb-0">
              <thead>
                <tr>
                  <th className="bg-white py-2 px-4">Usługa</th>
                  <th className="text-right bg-white py-2 px-4">Cena</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-blue-50">
                  <td className="py-2 px-4">Cena auta</td>
                  <td id="carPrice" className="text-right py-2 px-4">
                    {getValueOnCurrency(carPrice) || 0}
                    {` ${defaultCurrency}`}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Akcyza</td>
                  <td className="text-right py-2 px-4">{excise}</td>
                </tr>
                {Object.entries(optionalTax).map(([key, value]) => {
                  return (
                    <tr>
                      <td className="py-2 px-4">{value.label}</td>
                      <td className="text-right py-2 px-4">
                        {getValueOnCurrency(value.value) || 0}
                        {` ${defaultCurrency}`}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-blue-50">
                  <td className="py-2 px-4">
                    <strong>Suma</strong>
                  </td>
                  <td className="text-right py-2 px-4">
                    <strong>
                      {getValueOnCurrency(totalCost)}
                      {` ${defaultCurrency}`}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
      <EmailForm />
    </div>
  );
}

export default Form;
