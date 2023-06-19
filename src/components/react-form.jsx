import React, { useState } from "react";
import { options, currencies } from "@utils/tax_data";

function Form() {
  const [driveType, setDriveType] = useState("");
  const [lpg, setLpg] = useState(false);
  const [individualRegister, setIndividualRegister] = useState(false);
  const [collision, setCollision] = useState(false);

  const [carPrice, setCarPrice] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  return (
    <div className="container mx-auto py-8">
      <form>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceInput">
              Wartość Pojazdu:
            </label>
            <div className="relative">
              <input className="appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="priceInput" type="number" onChange={(value) => console.log(value)} required />
              <select className="absolute inset-y-0 right-0 border border-l-0 rounded-r bg-white text-gray-700 font-bold py-2 px-3 focus:outline-none cursor-pointer" id="currencyInput" name="currencyInput">
                {currencies.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="engineInput">
              Rodzaj Napędu:
            </label>
            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="engineInput" name="engineInput">
              <option value="benzyna">Benzyna</option>
              <option value="diesel">Diesel</option>
              <option value="hybryda">Hybryda</option>
              <option value="elektryczny">Elektryczny</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="typeInput">
              Rodzaj Pojazdu:
            </label>
            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="typeInput" name="typeInput">
              {options.map((item) => (
                <option key={item.value} value={item.value} data-description={item.description}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Dodatkowe Parametry:</label>
            <div className="flex items-center mb-2">
              <input className="mr-2 leading-tight" type="checkbox" id="lpgCheckbox" name="lpgCheckbox" />
              <label className="text-gray-700 text-sm" htmlFor="lpgCheckbox">
                Instalacja LPG/CNG
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input className="mr-2 leading-tight" type="checkbox" id="platesCheckbox" name="platesCheckbox" />
              <label className="text-gray-700 text-sm" htmlFor="platesCheckbox">
                Indywidualne Tablice Rejestracyjne
              </label>
            </div>
            <div className="flex items-center">
              <input className="mr-2 leading-tight" type="checkbox" id="accidentCheckbox" name="accidentCheckbox" />
              <label className="text-gray-700 text-sm" htmlFor="accidentCheckbox">
                Pojazd Powypadkowy/Kolizyjny
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="my-5 rounded-lg overflow-hidden">
              <div className="flex flex-col w-full bg-secondary p-4 text-center text-lg text-primary" style={{ backgroundColor: "#d3eaf2" }}>
                <h4>Całkowity koszt</h4>
                <span id="totalCost" className="font-semibold text-xl">
                  {totalCost}
                </span>
              </div>
              <div className="text-center bg-gray-100 w-full grid grid-cols-2 text-lg">
                <div className="p-4">
                  <h4>Pojazd</h4>
                  <span id="carCost" className="font-semibold">
                    {carPrice}
                  </span>
                </div>
                <div className="p-4 bg-gray-200">
                  <h4>Opłaty</h4>
                  <span id="taxes" className="font-semibold">
                    {totalTax}
                  </span>
                </div>
              </div>
            </div>
            <table className="mb-0">
              <thead>
                <tr>
                  <th className="bg-white">Usługa</th>
                  <th className="text-right bg-white">Cena</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-blue-50" style={{ backgroundColor: "#e9f5f9" }}>
                  <td>Cena auta</td>
                  <td id="carPrice" className="text-right">
                    0
                  </td>
                </tr>
                <tr>
                  <td>Akcyza</td>
                  <td className="text-right">0</td>
                </tr>
                <tr className="bg-blue-50" style={{ backgroundColor: "#e9f5f9" }}>
                  <td>Badanie techniczne</td>
                  <td className="text-right">0</td>
                </tr>
                <tr>
                  <td>Tłumaczenia dokumentów</td>
                  <td className="text-right">0</td>
                </tr>
                <tr className="bg-blue-50" style={{ backgroundColor: "#e9f5f9" }}>
                  <td>Rejestracja pojazdu</td>
                  <td className="text-right">0</td>
                </tr>
                <tr>
                  <td colSpan="2" className="p-0 bg-blue-50 text-sm">
                    <table className="border-none m-0">
                      <tbody className="bg-gray-50-">
                        <tr className="border-none">
                          <td> - Tablice rejestracyjne</td>
                          <td className="text-right"> 0</td>
                        </tr>
                        <tr className="border-none">
                          <td> - Dowód rejestracyjny</td>
                          <td className="text-right">0</td>
                        </tr>
                        <tr className="border-none">
                          <td> - Pozwolenie czasowe</td>
                          <td className="text-right">0</td>
                        </tr>
                        <tr className="border-none">
                          <td> - Opłata ewidencyjna</td>
                          <td className="text-right">0</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#e9f5f9" }}>
                  <td>
                    <strong>Suma</strong>
                  </td>
                  <td className="text-right">
                    <strong>0</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
