export class Spinner {
    constructor(element) {
        this.spinner = document.createElement(element);
        this.spinner.classList.add('text-center', 'spinner-border', 'mt-4', 'invisible');
        this.spinner.role = 'status';
        document.getElementById('page-wrapper').appendChild(this.spinner);
    }

    showSpinner() {
        this.spinner.classList.remove('invisible');
    }

    hideSpinner() {
        this.spinner.classList.add('invisible');
    }

}