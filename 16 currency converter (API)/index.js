const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');

//Array to populate the select tags with these countries
const countries = [
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "KRW", name: "South Korean Won" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "ZAR", name: "South African Rand" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "INR", name: "Indian Rupee" },
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "DKK", name: "Danish Krone" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "THB", name: "Thai Baht" },
    { code: "TWD", name: "New Taiwan Dollar" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "QAR", name: "Qatari Riyal" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "UAH", name: "Ukrainian Hryvnia" },
    { code: "IRR", name: "Iranian Rial" },
    { code: "COP", name: "Colombian Peso" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "RON", name: "Romanian Leu" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "DZD", name: "Algerian Dinar" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "COP", name: "Colombian Peso" },
    { code: "PEN", name: "Peruvian Sol" },
    { code: "UYU", name: "Uruguayan Peso" },
    { code: "MAD", name: "Moroccan Dirham" },
    { code: "CRC", name: "Costa Rican Colon" },
    { code: "TND", name: "Tunisian Dinar" },
    { code: "LKR", name: "Sri Lankan Rupee" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "UGX", name: "Ugandan Shilling" },
    { code: "BYN", name: "Belarusian Ruble" },
    { code: "UZS", name: "Uzbekistani Som" },
    { code: "AZN", name: "Azerbaijani Manat" },
    { code: "DOP", name: "Dominican Peso" },
    { code: "MOP", name: "Macanese Pataca" },
    { code: "RSD", name: "Serbian Dinar" },
    { code: "GTQ", name: "Guatemalan Quetzal" },
    { code: "AFN", name: "Afghan Afghani" },
    { code: "BYR", name: "Belarusian Ruble" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "KZT", name: "Kazakhstani Tenge" },
    { code: "LBP", name: "Lebanese Pound" },
    { code: "NPR", name: "Nepalese rupee" }
    // Add more countries as needed
];

//showing countries from array to select tag
countries.forEach(country => {
    // const option1 = document.createElement('option');
    // option1.value = country.code;
    // option1.textContent = `${country.code} ${country.name}`;
    // fromCurrencyElement.appendChild(option1);

    // const option2 = document.createElement('option');
    // option2.value = country.code;
    // option2.textContent = `${country.code} ${country.name}`;
    // toCurrencyElement.appendChild(option2);

    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} ${country.name}`;
    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    //setting default values of select tag
    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "NPR";

});

//Function to get exchange rate using API
const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;

    resultElement.textContent = "Fetching exchange rates";

    const apiKey = "84fa5fc8780a7252fd9874c6";


    try {


        //fetch API
        const response = await fetch(`https://v6.exchangerate-api.com/v6/84fa5fc8780a7252fd9874c6/latest/${fromCurrency}`);
        const data = await response.json();

        //console.log(data);

        const conversionRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);

        if (typeof conversionRate === 'undefined') {
            resultElement.textContent = "Exchange rate data not available for selected countries";
            convertedAmountElement = "";
        } else {

            convertedAmountElement.value = convertedAmount;

            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        }
    } catch (error) {
        converterContainer.innerHTML = `<h1>Error while fetching exchange rates</h1>`;
    }
}
// fetching exchange rate when user inputs the amount
fromAmountElement.addEventListener('input', getExchangeRate);
// fetching exchange rate when user changes the currency
fromCurrencyElement.addEventListener('change', getExchangeRate);
// fetching exchange rate when user changes the currency
toCurrencyElement.addEventListener('change', getExchangeRate);
// fetching exchange rate when widow loads
window.addEventListener('load', getExchangeRate);

