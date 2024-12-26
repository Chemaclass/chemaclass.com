const MAX_ITEMS = 4;
const UP_ARROW = "ArrowUp";
const DOWN_ARROW = "ArrowDown";
const ENTER_KEY = "Enter";
const WAIT_TIME_MS = 200;

const resultCount = document.getElementsByClassName('result-count')[0];
const searchInput = document.getElementById("search");
const searchResults = document.querySelector(".search-results");
const searchResultsItems = document.querySelector(".search-results__items");

let searchItemSelected = null;
let resultsItemsIndex = -1;

const icons = {
    blog: `<svg width="25px" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10.0002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2839 19.7822 18.9076C20 18.4802 20 17.921 20 16.8031V14M16 5L10 11V14H13L19 8M16 5L19 2L22 5L19 8M16 5L19 8"/>
    </svg>`,
    readings: `<svg width="25px" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21"/>
    </svg>`,
    others: `<svg width="25px" viewBox="0 0 32 32" xml:space="preserve">
    <style type="text/css">
        .st0{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
        .st1{fill:none;stroke:currentColor;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;}
    </style>
        <path class="st0" d="M14.7,16c-1.6-1.1-2.7-2.9-2.7-5c0-3.5,3.1-6.4,6.7-6c2.6,0.3,4.8,2.4,5.2,5.1c0.4,2.7-1,5-3.1,6.2c2.6,0.8,4.5,3.4,4.1,6.4c-0.3,3.1-3.1,5.3-6.2,5.3L12,28c-3.3,0-6-2-7-6v-8l0.8,0.6C7.9,16.2,10.4,17,13,17h0"/>
        <line class="st0" x1="20" y1="9" x2="20" y2="12"/>
        <path class="st0" d="M23.2,14c1.8-0.1,3.5-0.9,4.6-2.4L29,10h-5"/>
        <path class="st0" d="M19,22c0,1.7-1.3,3-3,3c-4,0-5-3-5-3s3.3-3,5-3S19,20.3,19,22z"/>
    </svg>`,
    bitcoin: `<svg width="25px" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 6H15C16.6569 6 18 7.34315 18 9C18 10.6569 16.6569 12 15 12M10 6V12M10 6H7M10 6V3M15 12H10M15 12C16.6569 12 18 13.3431 18 15C18 16.6569 16.6569 18 15 18H10M10 12V18M10 18H7M10 18V21M13 6V3M13 21V18"/>
    </svg>`
};

////////////////////////////////////
// Interaction with the search input
////////////////////////////////////
document.addEventListener("keyup", function (keyboardEvent) {
    if (["s", "S", "/"].includes(keyboardEvent.key)) {
        searchInput.focus();
    }
});

document.addEventListener("keydown", function (keyboardEvent) {
    const len = searchResultsItems.getElementsByTagName("li").length - 1;

    if (keyboardEvent.key === DOWN_ARROW) {
        downArrow(len);
    } else if (keyboardEvent.key === UP_ARROW) {
        upArrow(len);
    } else if (keyboardEvent.key === ENTER_KEY) {
        if (!searchItemSelected || searchItemSelected.querySelector("div.empty")) {
            searchItemSelected = searchResultsItems.getElementsByTagName("li")[1]
                || searchResultsItems.getElementsByTagName("li")[0];
        }
        const link = searchItemSelected.getElementsByTagName("a")[0];
        if (link) {
            link.click();
        } else {
            console.log("nothing to click...");
        }
    }
});

function downArrow(len) {
    resultsItemsIndex++;

    if (!searchItemSelected) {
        resultsItemsIndex = 0;

        let firstItem = searchResultsItems.getElementsByTagName("li")[0];
        while (firstItem && shouldSkipItem(firstItem) && resultsItemsIndex <= len) {
            resultsItemsIndex++;
            firstItem = searchResultsItems.getElementsByTagName("li")[resultsItemsIndex];
        }

        searchItemSelected = firstItem || searchResultsItems.getElementsByTagName("li")[0];
    } else {
        removeClass(searchItemSelected, "selected");

        let next;
        while (resultsItemsIndex <= len) {
            next = searchResultsItems.getElementsByTagName("li")[resultsItemsIndex];
            if (!shouldSkipItem(next)) {
                searchItemSelected = next;
                break;
            }
            resultsItemsIndex++;
        }

        // Reset to the first item if no suitable item is found
        if (!next || resultsItemsIndex > len) {
            resultsItemsIndex = 1;
            searchItemSelected = searchResultsItems.getElementsByTagName("li")[1];
        }
    }

    searchItemSelected.focus();
    searchItemSelected.scrollIntoView({ behavior: "smooth", block: "center" });
    addClass(searchItemSelected, "selected");
}

function upArrow(len) {
    if (!searchItemSelected) {
        resultsItemsIndex = len;

        let lastItem = searchResultsItems.getElementsByTagName("li")[len];
        while (lastItem && shouldSkipItem(lastItem) && resultsItemsIndex >= 0) {
            resultsItemsIndex--;
            lastItem = searchResultsItems.getElementsByTagName("li")[resultsItemsIndex];
        }

        searchItemSelected = lastItem || searchResultsItems.getElementsByTagName("li")[len];
    } else {
        removeClass(searchItemSelected, "selected");

        let next;
        while (resultsItemsIndex >= 0) {
            resultsItemsIndex--;
            next = searchResultsItems.getElementsByTagName("li")[resultsItemsIndex];
            if (!shouldSkipItem(next)) {
                searchItemSelected = next;
                break;
            }
        }

        // Reset to the last item if no suitable item is found
        if (!next || resultsItemsIndex < 0) {
            resultsItemsIndex = len;
            searchItemSelected = searchResultsItems.getElementsByTagName("li")[len];
        }
    }

    searchItemSelected.focus();
    searchItemSelected.scrollIntoView({ behavior: "smooth", block: "center" });
    addClass(searchItemSelected, "selected");
}

function shouldSkipItem(item) {
    return item && item.querySelector("div.category");
}

function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
}

function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += " " + className;
    }
}

///////////////////////////////
// Autoload of the search input
///////////////////////////////
if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    initSearch();
} else {
    document.addEventListener("DOMContentLoaded", initSearch);
}

function initSearch() {
    const options = {
        bool: "AND",
        fields: {
            title: {boost: 3},
            description: {boost: 2},
            body: {boost: 1},
        }
    };
    let currentTerm = "";
    let index;

    const initIndex = async function () {
        if (index === undefined) {
            index = fetch("/search_index.en.json")
                .then(
                    async function (response) {
                        return await elasticlunr.Index.load(await response.json());
                    }
                );
        }
        return await index;
    }

    searchInput.addEventListener("keyup", debounce(async function (keyboardEvent) {
        let term = searchInput.value.trim();
        if (currentTerm === term
            && (keyboardEvent.key === DOWN_ARROW || keyboardEvent.key === UP_ARROW || keyboardEvent.key === ENTER_KEY)
        ) {
            return;
        }
        searchResults.style.display = term === "" ? "none" : "block";
        searchResultsItems.innerHTML = "";
        currentTerm = term;
        if (term === "") {
            resultCount.textContent = "";
            return;
        }
        const specialMap = {
            "home": "/",
            "blog": "/blog",
            "readings": "/readings",
            "talks": "/talks",
            "music": "/music",
            "books": "/books"
        };
        if (Object.keys(specialMap).includes(term)) {
            const item = document.createElement("li");
            item.innerHTML = formatSearchResultItem({
                ref: specialMap[term],
                doc: {
                    id: "#",
                    title: term.charAt(0).toUpperCase() + term.slice(1),
                    body: "",
                }
            }, []);
            searchResultsItems.appendChild(item);
            return;
        }

        let indexResults = (await initIndex()).search(
            term.startsWith('*') ? term.slice(1) : term,
            options
        );
        const items = filterResultItems(indexResults, term);
        resultCount.textContent = `${items.length} results`;

        if (items.length === 0) {
            const item = document.createElement("li");
            item.innerHTML = formatSearchResultItem({
                class: "empty",
                doc: {
                    title: "Nothing found",
                    body: "Try something else",
                }
            }, "");
            searchResultsItems.appendChild(item);
            return;
        }

        appendSearchResults((res) => res.ref.includes("/blog"), icons.blog + " Blog", items, term);
        appendSearchResults((res) => res.ref.includes("/readings"), icons.readings + " Readings", items, term);
        appendSearchResults((res) => !res.ref.includes("/blog") && !res.ref.includes("/readings"), icons.others + " Others", items, term);
    }, WAIT_TIME_MS));

    window.addEventListener('click', function (e) {
        if (searchResults.style.display === "block" && !searchResults.contains(e.target)) {
            searchResults.style.display = "none";
        }
    });

    searchInput.addEventListener("focusin", function () {
        if (searchInput.value !== "") {
            searchInput.dispatchEvent(new KeyboardEvent("keyup"));
        }
    });

    searchInput.addEventListener("focusout", function () {
        resultsItemsIndex = -1;
    });

    window.addEventListener("click", function (mouseEvent) {
        if (searchResults.style.display === "block") {
            if (!searchResults.contains(mouseEvent.target)) {
                searchResults.style.display = "";
            }
        }
    });
}

function appendSearchResults(filterFn, placeholder, items, term) {
    let totalItems = 0;
    // Add category header item if such items exist
    if (items.some(filterFn)) {
        const placeholderItem = document.createElement("li");
        placeholderItem.innerHTML = formatSearchResultItem({
            class: "category empty",
            doc: {title: placeholder},
        }, "");
        searchResultsItems.appendChild(placeholderItem);
    }
    // Add category items
    for (let i = 0; i < items.length; i++) {
        if (filterFn(items[i])) {
            const item = document.createElement("li");
            item.innerHTML = formatSearchResultItem(items[i], term.split(" "));
            searchResultsItems.appendChild(item);
            if (!term.startsWith("*") && ++totalItems >= MAX_ITEMS) {
                break;
            }
        }
    }
}

function filterResultItems(results, term){
    const items = [];
    for (let i = 0; i < results.length; i++) {
        const ref = results[i].ref;
        const hasTitle = results[i].doc.title !== "";
        const categories = ["/blog", "/readings", "/talks"];
        const isEmptyRef = ref === "";
        const isCategoryCheckRequired = !term.startsWith("*");
        const isCategoryMissing = !categories.some(c => ref.includes(c));

        if (!hasTitle || !isEmptyRef && isCategoryCheckRequired && isCategoryMissing) {
            continue;
        }

        items.push(results[i]);
    }
    return items;
}

function debounce(func, wait) {
    let timeout;

    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);

        timeout = setTimeout(function () {
            timeout = null;
            func && func.apply(context, args);
        }, wait);
    };
}

function formatSearchResultItem(item, terms) {
    if (item.ref === undefined || item.ref === "") {
        return `<div class="search-results__item ${item.class}">`
            + `<span class="search-results__item-title ${item.class}">${item.doc.title}</span>`
            + (item.doc.body ? `<div class="search-results__item-body ${item.class}">${item.doc.body}</div>` : "")
            + '</div>';
    }
    if (terms.length > 0 && terms[0].startsWith('*')) {
        // Remove '*' from the first element
        terms = [terms[0].slice(1), ...terms.slice(1)]
            .filter(term => term.trim() !== "");
    }

    const term = terms.join("").trim().toLowerCase();
    const icon = (icons[term] !== undefined) ? icons[term] : "";

    return '<div class="search-results__item">'
        + `<a href="${item.ref}">`
        + `<span class="search-results__item-title">${icon} ${item.doc.title}</span>`
        + `<div class="search-results__item-body">${makeTeaser(item.doc.body, terms)}</div>`
        + `</a>`
        + '</div>';
}

// Taken from mdbook
// The strategy is as follows:
// First, assign a value to each word in the document:
//  Words that correspond to search terms (stemmer aware): 40
//  Normal words: 2
//  First word in a sentence: 8
// Then use a sliding window with a constant number of words and count the
// sum of the values of the words within the window. Then use the window that got the
// maximum sum. If there are multiple maximas, then get the last one.
// Enclose the terms in <b>.
function makeTeaser(body, terms) {
    let TERM_WEIGHT = 40;
    let NORMAL_WORD_WEIGHT = 2;
    let FIRST_WORD_WEIGHT = 8;
    let TEASER_MAX_WORDS = 18;

    let stemmedTerms = terms.map(function (w) {
        return elasticlunr.stemmer(w.toLowerCase());
    });
    let termFound = false;
    let index = 0;
    let weighted = []; // contains elements of ["word", weight, index_in_document]

    // split in sentences, then words
    let sentences = body.toLowerCase().split(". ");

    for (let i in sentences) {
        let words = sentences[i].split(" ");
        let value = FIRST_WORD_WEIGHT;

        for (let j in words) {
            let word = words[j];

            if (word.length > 0) {
                for (let k in stemmedTerms) {
                    if (elasticlunr.stemmer(word).startsWith(stemmedTerms[k])) {
                        value = TERM_WEIGHT;
                        termFound = true;
                    }
                }
                weighted.push([word, value, index]);
                value = NORMAL_WORD_WEIGHT;
            }

            index += word.length;
            index += 1;  // ' ' or '.' if last word in sentence
        }

        index += 1;  // because we split at a two-char boundary '. '
    }

    if (weighted.length === 0) {
        return body;
    }

    let windowWeights = [];
    let windowSize = Math.min(weighted.length, TEASER_MAX_WORDS);
    // We add a window with all the weights first
    let curSum = 0;
    for (let i = 0; i < windowSize; i++) {
        curSum += weighted[i][1];
    }
    windowWeights.push(curSum);

    for (let i = 0; i < weighted.length - windowSize; i++) {
        curSum -= weighted[i][1];
        curSum += weighted[i + windowSize][1];
        windowWeights.push(curSum);
    }

    // If we didn't find the term, just pick the first window
    let maxSumIndex = 0;
    if (termFound) {
        let maxFound = 0;
        // backwards
        for (let i = windowWeights.length - 1; i >= 0; i--) {
            if (windowWeights[i] > maxFound) {
                maxFound = windowWeights[i];
                maxSumIndex = i;
            }
        }
    }

    let teaser = [];
    let startIndex = weighted[maxSumIndex][2];
    for (let i = maxSumIndex; i < maxSumIndex + windowSize; i++) {
        let word = weighted[i];
        if (startIndex < word[2]) {
            // missing text from index to start of `word`
            teaser.push(body.substring(startIndex, word[2]));
            startIndex = word[2];
        }

        // add <em/> around search terms
        if (word[1] === TERM_WEIGHT) {
            teaser.push("<b>");
        }
        startIndex = word[2] + word[0].length;
        teaser.push(body.substring(word[2], startIndex));

        if (word[1] === TERM_WEIGHT) {
            teaser.push("</b>");
        }
    }
    teaser.push("…");
    return teaser.join("");
}

//// todo: refactor move to header.js or similar
let lastScrollY = window.scrollY;
const navbar = document.querySelector('header');
const scrollUpThreshold = 10;
const topMargin = 80; // Always show the navbar within px of the top

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= topMargin) {
        // Always show the navbar when near the top of the page
        navbar.classList.remove('hidden');
        navbar.classList.add('show');
    } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        navbar.classList.add('hidden');
        navbar.classList.remove('show');
    } else if (lastScrollY - currentScrollY > scrollUpThreshold) {
        // Scrolling up past the threshold
        navbar.classList.remove('hidden');
        navbar.classList.add('show');
    }

    lastScrollY = currentScrollY;
});