let userinput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createSearchResultItem(search) {
    let {
        title,
        link,
        description
    } = search;

    let container = document.createElement("div");
    container.classList.add("result-item");
    searchResults.appendChild(container);

    let head = document.createElement("a");
    head.classList.add("result-title");
    head.textContent = title;
    head.href = link;
    head.target = "_blank";
    container.appendChild(head);

    let br = document.createElement("br");
    container.appendChild(br);

    let url = document.createElement("a");
    url.textContent = link;
    url.classList.add("result-url");
    url.href = link;
    url.target = "_blank";
    container.appendChild(url);

    let br1 = document.createElement("br");
    container.appendChild(br1);

    let para = document.createElement("p");
    para.textContent = description;
    para.classList.add("link-description");
    container.appendChild(para);
}

function displaySearchResults(search_results) {
    spinnerEl.classList.add("d-none");

    for (let search of search_results) {
        createSearchResultItem(search);
    }

}

function searchwikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResults.textContent = "";
        let text = userinput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + text;
        let options = {
            method: "Get"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displaySearchResults(search_results);
            });


    }
}

userinput.addEventListener("keydown", searchwikipedia);