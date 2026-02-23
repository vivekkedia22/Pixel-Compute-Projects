const fromCurrencyList = document.getElementById("from-currency");
const toCurrencyList = document.getElementById("to-currency");
const apiKey = "1b0d08fa009a5c80b15d5f74";
const input = document.getElementById("input");
const submitBtn = document.getElementById("submit-btn");
const conversionMsg = document.getElementById("conversion-msg");
const errorMsg = document.getElementById("error-msg");

let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;
let countryList;

const fetchCountryList = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,currencies,flag",
  );
  const data = await response.json();
  countryList = data.map((country) => {
    const name = country.name.common;
    let currency = Object.keys(country.currencies)[0];
    currency = `${currency}-${country.currencies[currency]?.name}`;
    const flag = country.flag;
    return {
      name,
      currency,
      flag,
    };
  });
  addCountriesToOptions();
};
const addCountriesToOptions = () => {
  countryList.forEach((country) => {
    const option1 = document.createElement("option");
    option1.innerText = `${country.flag} ${country.currency}`;
    option1.setAttribute("value", country.currency.split("-")[0]);
    const option2 = document.createElement("option");
    option2.innerText = `${country.flag} ${country.currency}`;
    option2.setAttribute("value", country.currency.split("-")[0]);
    fromCurrencyList.appendChild(option1);
    toCurrencyList.appendChild(option2);
  });
};
fetchCountryList();

submitBtn.onclick = (event) => {
  conversionMsg.innerText = "";
  errorMsg.innerText = "";
  event.preventDefault();
  const fromCurrency = fromCurrencyList.value;
  const toCurrency = toCurrencyList.value;
  let inputValue = input.value;
  let conversionRate;
  getExchangeRate(fromCurrency, toCurrency).then(({ success, data }) => {
    if (success) {
      conversionRate = data.conversion_rates[toCurrency];
      conversionMsg.innerText = `${inputValue} ${fromCurrency} = ${(conversionRate * inputValue).toFixed(2)} ${toCurrency}`;
    } else {
      errorMsg.innerText = data;
    }
  });
};

const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await fetch(`${url}${fromCurrency}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch the exchange rates");
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, data: error.message };
  }
};
