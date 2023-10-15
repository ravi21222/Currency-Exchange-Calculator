const currencyElementOne = document.getElementById('currency-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// fetch exchange rates and update the DOM
function calculate() {
    const currency_one = currencyElementOne.value;
    const currency_two = currencyElementTwo.value;

    fetch('https://open.exchangerate-api.com/v6/latest')
        .then( res => res.json() )
        .then( data => {
            const rate = data.rates[currency_two] / data.rates[currency_one];
            rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
            amountTwo.value = (amountOne.value * rate).toFixed(2);
            console.log('ok', amountTwo.value);
        });

}

// Event Listeners
currencyElementOne.addEventListener('change', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculate();
})

calculate();

