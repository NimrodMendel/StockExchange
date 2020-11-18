class Marquee {
    
    /**
     * Constructor for Marquee class
     * @param {*} element 
     */
    constructor(element) {
        this.element = element;
        this.url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq';
    }

    /**
     * Async function that sends a request from the server. 
     * Upon receivint all the data for the Marquee object, it calls the buildMarquee() function with the data it received as parameter
     */
    async createMarquee(){
        try {
            let response = await fetch(this.url);
            if (response.ok) {
                let data = await response.json();
                this.buildMarquee(data);
            }
        } catch(error) {
            console.error(error);
        }
    }
    
    /**
     * The function builds the Marquee object from the data it receives in createMarquee method
     * @param {*} stockPrices 
     */
    buildMarquee(stockPrices) {
        let priceList = document.createElement('ul');
        
        priceList.classList.add('prices-list');

        for (let item of stockPrices) {
            let priceListItem = this.createStockPrice(item);
            priceList.appendChild(priceListItem);
        }
        marquee.appendChild(priceList);
        marquee.classList.add('marquee');
    }

    
    /**
     * This method creates a single data segment inside the marquee. 
     * @param {} stockPrice 
     */
    createStockPrice(stockPrice) {
        let priceListItem = document.createElement('li');
        let companySymbol = document.createElement('span');
        let companyPrice = document.createElement('span');

        if (stockPrice.change < 0) {
            companyPrice.classList.add('negative');
        } else {
            companyPrice.classList.add('positive');
        }

        companySymbol.innerText = stockPrice.symbol + ' : ';
        companyPrice.innerText = '$'+stockPrice.price;

        priceListItem.appendChild(companySymbol);
        priceListItem.appendChild(companyPrice);
        priceListItem.classList.add('prices-list-tem');

        return priceListItem;
    }
}

//export default Marquee;