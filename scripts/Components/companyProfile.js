const urlParams = new URLSearchParams(window.location.search);
const BASE_URL = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/'
let symbol = urlParams.get('symbol');

window.onload = function () {
    getCompanyProfile(symbol);
}



async function getCompanyProfile(companySymbol) {
    let url = BASE_URL + symbol.toString();

    try {
        let response = await fetch(url);

        if (response.ok) {
            let data = await response.json();
            presentData(data);
        }
    } catch(error) {
        console.error(error);
    }
}


function presentData(companyData) {
    createLogo(companyData);    //  Create logo, company name, and sector
    getStockInfo(companyData);  // get stock information
    getCompanyDescription(companyData); //  get company description
    getStockHistory();
}


function createLogo(companyData) {
    /* Create company logo */
    let logo = document.createElement('img');
    logo.src = companyData.profile.image;
    logo.style.width = '45px';
    logo.style.height = '45px';
    logo.alt = `${companyData.profile.companyName} logo`;
    logo.classList.add('align-middle');   
    document.getElementById('company-logo').appendChild(logo);

    /* Company data */
    let companyName = document.createElement('h4');
    companyName.textContent = `${companyData.profile.companyName}.`;
    companyName.classList.add('align-middle');
    document.getElementById('company-name').appendChild(companyName);

    let sector = document.createElement('h4');
    sector.classList.add('align-middle');
    sector.textContent = `(${companyData.profile.sector})`;

    document.getElementById('sector').appendChild(sector);
}


function getStockInfo(companyData) {
  let stockPrice = document.createElement('p');
  //let stockChange = companyData.profile.changesPercentage;
  let change = document.createElement('span');

  if (companyData.profile.changesPercentage.includes('+')) {
      change.classList.add('positive');
  } else {
    change.classList.add('negative');
  }
  change.innerText = companyData.profile.changesPercentage;

  stockPrice.innerText = `Stock price: ${companyData.profile.currency} ${companyData.profile.price} `;
  stockPrice.appendChild(change);
  document.getElementById('stock').appendChild(stockPrice);
}


function getCompanyDescription(companyData) {
    let description = document.createElement('p');
    description.textContent = companyData.profile.description;
    document.getElementById('description').appendChild(description);
}

async function getStockHistory (){

    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;

    document.querySelector('.spinner-grow').classList.remove('invisible');

    try {
        let response = await fetch(url);

        if (response.ok) {
            let data = await response.json();

            /* Construct data chart */
            let labels = data.historical.map(function(e) {  //  get chart labels
                return e.date;
            });

            let dataset = data.historical.map(function(e) { //  get chart data
                return e.close;
            });


            document.querySelector('.spinner-grow').classList.add('invisible');
            /* Build chart */
            let history = document.getElementById('history').getContext('2d');
            let chart = new Chart(history, {
                type: 'line',
                data: {
                    labels: labels.reverse(),
                    datasets: [{
                        label: 'Stock Price History',
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        borderColor: 'rgb(191, 71, 44)',
                        data: dataset.reverse()
                    }]
                },
                options: {}
            });
        }


    } catch(error) {
        console.error(error);
    }



}
