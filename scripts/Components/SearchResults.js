class SearchResult {

    constructor(element) {
        this.element = element;
        this.element.classList.add('results', 'd-flex', 'justify-content-center', 'mt-4');
        this.resultList = document.createElement('ul');
        this.resultList.classList.add('search-results', 'mt-5', 'w-75');

        // Spinner
        this.spinnerWrap = document.createElement('div');
        this.spinnerWrap.classList.add('mt-2', 'text-center');
        this.spinnerDiv = document.createElement('div');
        this.spinnerDiv.classList.add('spinner-border', 'invisible');
        this.spinnerWrap.appendChild(this.spinnerDiv);

        document.getElementById('page-wrapper').appendChild(this.spinnerWrap);

        this.element.appendChild(this.resultList);
    }

    showSpinner() {
        this.spinnerDiv.classList.remove('invisible');
    }

    hideSpinner() {
        this.spinnerDiv.classList.add('invisible');
    }

    async renderResults(searchInput) {
        
        let symbolSearchURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`;

        try {
            let response = await fetch(symbolSearchURL);
            this.resultList.innerHTML = null;   //  Clear list before any search;
            this.showSpinner();

            if (response.ok) {
                let data = await response.json();

                // iterate over the data
                for (let item of data) {
                    let symbol = item.symbol;
                    this.getCompanyProfile(symbol, searchInput);
                }
            }
        } catch(error) {
            console.error(error);
        }
    }

    async getCompanyProfile(symbol, searchInput) {
        let companyProfileURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;

        try {  
            let response = await fetch(companyProfileURL);
            if (response.ok) {
                let company = await response.json();
                this.createListItem(company, searchInput);
            }

        } catch(error) {
            console.error(error);
        }
    }

    createListItem(company, searchInput) {
        let listItem = document.createElement('li');
        let companyLink = document.createElement('a');
        let change = document.createElement('span');
        let symbol = document.createElement('span');
        let companyLogo = document.createElement('img');

        /* Logo */
        if (company.profile.image !== null) {   // only zppend the logo if there is any
            companyLogo.src = company.profile.image;
            companyLogo.classList.add('mr-2', 'align-middle');
            companyLogo.style.width = '45px';
            companyLogo.style.height = '45px';
            listItem.appendChild(companyLogo);
        }

        /* Link */
        companyLink.href = `https://nimrodmendel.github.io/StockExchange/company.html?symbol=${company.symbol}`;
        // Highlight text using regex
        let highlightedName = company.profile.companyName.replace(new RegExp(searchInput, 'gi'), (match) => `<span class="highlight">${match}</span>`);
        companyLink.innerHTML = `${highlightedName}.`;
        listItem.appendChild(companyLink);
        
        /* Symbol */
        // highlight symbol using regex
        let highlightedSymbol = company.symbol.replace(new RegExp(searchInput, 'gi'), (match) => `<span class="highlight">${match}</span>`);
        symbol.innerHTML = `(${highlightedSymbol})`;
        symbol.classList.add('symbol', 'ml-2');
        listItem.appendChild(symbol);
        
        /* Stock Change */
        if (company.profile.changesPercentage.includes('-')) {
            change.classList.add('negative');
        } else {
            change.classList.add('positive'); 
        }
        change.classList.add('ml-2');
        change.innerText = company.profile.changesPercentage;
        listItem.appendChild(change);

        listItem.classList.add('result');
        this.hideSpinner()
        this.resultList.appendChild(listItem);

    }
}
