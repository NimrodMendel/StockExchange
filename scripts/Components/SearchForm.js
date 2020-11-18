class SearchForm {
    
    constructor(element) {
        this.element = element;
        this.element.classList.add('d-flex', 'mt-5', 'justify-content-center');
        this.buildForm();
        
    }

    buildForm() {

        // input-group div
        let inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group', 'mb-3', 'w-75');
        
        // search box
        let userInput = document.createElement('input');
        userInput.type = 'text';
        userInput.placeholder = 'Search';
        userInput.classList.add('form-control');
        this.searchInput = userInput;

        let inputGroupAppend = document.createElement('div');
        inputGroupAppend.classList.add('input-group-append');

        // search button
        let searchButton = document.createElement('button');
        searchButton.classList.add('btn', 'btn-primary');
        searchButton.type = 'button';
        searchButton.innerHTML = '<i class="fas fa-search mr-2"></i>Search';
        searchButton.id = 'search-button';
        this.searchButton = searchButton;
        
        // Appen all elenments togther
        inputGroupAppend.appendChild(searchButton);
        inputGroup.appendChild(userInput);
        inputGroup.appendChild(inputGroupAppend);

        this.element.appendChild(inputGroup);   
    }

    onSearch(callback) {
        this.searchButton.addEventListener('click', callback);
    }

}
