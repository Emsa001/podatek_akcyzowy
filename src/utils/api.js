/** */
export const getCurrenciesRates = async (table) => {
  const response = await fetch(`http://api.nbp.pl/api/exchangerates/tables/${table}/`);
  const data = await response?.json();
  return data[0].rates;
};
