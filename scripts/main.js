(async function () {
    const marquee = new Marquee(document.getElementById('marquee'));
    marquee.createMarquee();

    const form = new SearchForm(document.getElementById('form'));
    const results = new SearchResult(document.getElementById('search-results'));
    
    form.onSearch((companies) => {
        results.renderResults(form.searchInput.value);
    });
})();
