const UP_ARROW = "ArrowUp";
const DOWN_ARROW = "ArrowDown";
const ENTER_KEY = "Enter";
const WAIT_TIME_MS = 150; // Reduced from 200ms to 150ms for faster response
const DOCUMENT_LANG = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
const IS_SPANISH = DOCUMENT_LANG.startsWith("es");
const LANG_PREFIX = IS_SPANISH ? "/es" : "";
const SEARCH_INDEX_PATH = IS_SPANISH ? "/search_index.es.json" : "/search_index.en.json";
const SERVICE_SEARCH_CONTENT = {
    en: {
        "/services/": "Services overview for Chemaclass: custom web development, fast static websites, static+blog hybrids, WordPress builds, and hands-on team workshops focused on XP, TDD, and refactoring. Hire me to ship reliable websites or train your engineering team.",
        "/services/web-development/": "Web Development service: responsive design, SEO fundamentals, HTTPS, analytics, static websites, static site plus blog using Zola or VitePress, and WordPress builds. Highlights speed, security, low hosting costs, and options for content updates.",
        "/services/team-workshops/": "Team Workshops service: full-day coding sessions covering testing, golden master techniques, test-driven development, refactoring, pair programming, and safe improvements to legacy code. Morning session on tests, afternoon on refactoring, investment €350 per person for 3-8 developers."
    },
    es: {
        "/services/": "Servicios profesionales: desarrollo web a medida, sitios estáticos rápidos, soluciones WordPress, talleres para equipos sobre TDD y refactorización. Contrata a Chemaclass para lanzar tu web o para formar a tu equipo de ingeniería.",
        "/services/web-development/": "Servicio de Desarrollo Web: diseño responsive, SEO básico, HTTPS, analítica, sitios estáticos ultrarrápidos, blogs generados estáticamente y sitios WordPress editables. Explica qué opción conviene según el negocio y los costes de mantenimiento.",
        "/services/team-workshops/": "Servicio de Team Workshops: un día completo de coding katas enfocados en testing, golden master, TDD, refactorización y trabajo en código legado. Incluye sesiones de mañana y tarde, pair programming y precio de 350 € por persona para grupos de 3 a 8."
    }
};
const SEARCH_RESULT_LABELS = {
    en: { singular: "result", plural: "results", separator: ":" },
    es: { singular: "resultado", plural: "resultados", separator: ":" }
};
const SEARCH_SECTION_LABELS = {
    en: {
        blog: "blog",
        readings: "readings",
        talks: "talks",
        services: "services",
        other: "other"
    },
    es: {
        blog: "blog",
        readings: "lecturas",
        talks: "charlas",
        services: "servicios",
        other: "otros"
    }
};
const normalizeForSearch = (str) => (str || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

(function registerSpanishSearchPipeline() {
    if (typeof elasticlunr === "undefined") {
        return;
    }
    const registerIfMissing = (fn, label) => {
        if (!elasticlunr.Pipeline.getRegisteredFunction(label)) {
            fn.label = label;
            elasticlunr.Pipeline.registerFunction(fn, label);
        }
    };

    const spanishTrimmer = function(token) {
        if (!token) return token;
        return token
            .replace(/^[^0-9A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/, "")
            .replace(/[^0-9A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/, "");
    };

    const SPANISH_STOP_WORDS = [
        "a","acá","ahí","al","algo","algunas","algunos","allá","allí","ante","antes","aquel","aquella","aquellas","aquellos","aquí",
        "así","aún","aunque","bajo","bien","cada","casi","como","con","cual","cuando","de","del","desde","donde","dos","el","ella",
        "ellas","ellos","en","entonces","entre","era","eran","es","esa","esas","ese","eso","esos","esta","estaba","estaban","estar",
        "este","esto","estos","etc","fuera","fueron","gran","ha","haber","hace","hacia","han","hasta","hay","la","las","le","les",
        "lo","los","más","me","mi","mis","mucho","muy","nos","nosotros","nuestra","nuestro","o","otra","otras","otro","otros","para",
        "pero","poco","por","porque","que","quien","quién","se","sea","según","ser","si","siempre","siendo","sin","sobre","su","sus",
        "también","tan","tanto","te","tendrá","tener","tiene","tienen","todo","todos","tu","un","una","unas","uno","unos","usted","y","ya"
    ];
    const spanishStopWordsSet = new Set(SPANISH_STOP_WORDS);
    const spanishStopWordFilter = function(token) {
        if (!token) return token;
        return spanishStopWordsSet.has(token.toLowerCase()) ? null : token;
    };

    const spanishStemmer = function(word) {
        if (!word) return word;
        if (typeof elasticlunr.stemmer === "function") {
            return elasticlunr.stemmer(word);
        }
        return word;
    };

    registerIfMissing(spanishTrimmer, "trimmer-es");
    registerIfMissing(spanishStopWordFilter, "stopWordFilter-es");
    registerIfMissing(spanishStemmer, "stemmer-es");
})();

function parseRef(ref) {
    let path = ref || "/";
    let search = "";
    let hash = "";
    try {
        const url = new URL(ref, window.location.origin);
        path = url.pathname || "/";
        search = url.search || "";
        hash = url.hash || "";
    } catch (e) {
        const hashIndex = path.indexOf("#");
        if (hashIndex >= 0) {
            hash = path.slice(hashIndex);
            path = path.slice(0, hashIndex);
        }
        const searchIndex = path.indexOf("?");
        if (searchIndex >= 0) {
            search = path.slice(searchIndex);
            path = path.slice(0, searchIndex);
        }
    }
    return { path: path || "/", search, hash };
}

function matchesCurrentLang(path) {
    const normalized = path.replace(/^\/+/, "");
    if (IS_SPANISH) {
        if (normalized === "") {
            return false;
        }
        return normalized === "es" || normalized.startsWith("es/");
    }
    if (normalized === "") {
        return true;
    }
    if (normalized === "es" || normalized.startsWith("es/")) {
        return false;
    }
    return true;
}

function stripLangFromPath(path) {
    const segments = path.replace(/^\/+/, "").split("/");
    if (segments[0] && segments[0].toLowerCase() === "es") {
        segments.shift();
    }
    return segments;
}

function getSectionFromPath(path) {
    const segments = stripLangFromPath(path);
    return segments[0] || "";
}

function buildLocalizedHref(ref) {
    const { path, search, hash } = parseRef(ref);
    let finalPath = path;
    if (IS_SPANISH) {
        if (!finalPath.startsWith("/es")) {
            finalPath = `${LANG_PREFIX}${finalPath.startsWith("/") ? finalPath : `/${finalPath}`}`;
        }
    } else if (finalPath.startsWith("/es/")) {
        finalPath = finalPath.replace(/^\/es/, "") || "/";
    }
    if (finalPath === "") {
        finalPath = "/";
    }
    return `${finalPath}${search}${hash}`;
}

function getNormalizedServicePath(path) {
    const segments = stripLangFromPath(path);
    if (segments.length === 0) {
        return "/";
    }
    const joined = segments.join("/");
    return `/${joined.replace(/\/+$/, "")}/`;
}

function getServiceSearchText(path) {
    const langKey = IS_SPANISH ? "es" : "en";
    const map = SERVICE_SEARCH_CONTENT[langKey] || {};
    return map[path];
}

// Get all search containers and set up each one
const allSearchContainers = Array.from(document.querySelectorAll(".search-container"));

// Helper to get the currently visible/active search container
function getActiveSearchContainer() {
    return allSearchContainers.find(container => {
        const input = container.querySelector('input[type="search"]');
        return input && input.offsetParent !== null;
    });
}

// Initialize with the first visible container (will be updated dynamically)
let activeContainer = getActiveSearchContainer() || allSearchContainers[0];
let searchInput = activeContainer?.querySelector('input[type="search"]');
let searchResults = activeContainer?.querySelector(".search-results");
let searchResultsItems = activeContainer?.querySelector(".search-results__items");

let searchItemSelected = null;
let resultsItemsIndex = -1;

// Update active container references (called when focusing on a search input)
function updateActiveContainer(container) {
    activeContainer = container;
    searchResults = container.querySelector(".search-results");
    searchResultsItems = container.querySelector(".search-results__items");
}

////////////////////////////////////
// Interaction with the search input
////////////////////////////////////

// Helper to get the currently visible search input
function getVisibleSearchInput() {
    const container = getActiveSearchContainer();
    return container?.querySelector('input[type="search"]');
}

document.addEventListener("keydown", function (keyboardEvent) {
    // Cmd+K (Mac) or Ctrl+K (Windows/Linux) to focus search
    if ((keyboardEvent.metaKey || keyboardEvent.ctrlKey) && keyboardEvent.key === 'k') {
        keyboardEvent.preventDefault(); // Prevent browser default behavior
        const input = getVisibleSearchInput();
        if (input) {
            input.focus();
            input.select(); // Select existing text for easy replacement
        }
        return;
    }
});

document.addEventListener("keyup", function (keyboardEvent) {
    if (["s", "S", "/"].includes(keyboardEvent.key)) {
        const input = getVisibleSearchInput();
        if (input) {
            input.focus();
        }
    }
});

document.addEventListener("keydown", function (keyboardEvent) {
    if (!searchResultsItems) return;
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
        if (searchItemSelected) {
            const link = searchItemSelected.getElementsByTagName("a")[0];
            if (link) {
                link.click();
            }
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
    // Preload search index for faster first search
    preloadSearchIndex();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        initSearch();
        preloadSearchIndex();
    });
}

// Preload the search index after page load for instant search
function preloadSearchIndex() {
    // Use requestIdleCallback to load during idle time, or setTimeout as fallback
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            fetch(SEARCH_INDEX_PATH)
                .then(async (response) => {
                    const data = await response.json();
                    // Store in a global variable for initSearch to use
                    window.__searchIndexData = data;
                })
                .catch(() => {
                    // Silently fail - regular search will still work
                });
        });
    } else {
        setTimeout(() => {
            fetch(SEARCH_INDEX_PATH)
                .then(async (response) => {
                    const data = await response.json();
                    window.__searchIndexData = data;
                })
                .catch(() => {});
        }, 1000);
    }
}

function initSearch() {
    const fieldBoosts = { title: { boost: 5 }, body: { boost: 1 } };
    const options = {
        bool: "OR", // Changed from AND to OR for better recall
        fields: fieldBoosts,
        expand: true // Enable query expansion for better matching
    };
    let currentTerm = "";
    let index;
    let indexCache = null; // Cache the loaded index

    const initIndex = async function () {
        if (indexCache !== null) {
            return indexCache; // Return cached index immediately
        }

        // Use preloaded data if available
        if (window.__searchIndexData) {
            indexCache = elasticlunr.Index.load(window.__searchIndexData);
            return indexCache;
        }

        if (index === undefined) {
            index = fetch(SEARCH_INDEX_PATH)
                .then(
                    async function (response) {
                        const data = await response.json();
                        indexCache = elasticlunr.Index.load(data);
                        return indexCache;
                    }
                );
        }
        return await index;
    }

    // Create search handler function
    const handleSearch = debounce(async function (keyboardEvent, input) {
        // Update active container based on which input triggered the event
        const container = input.closest('.search-container');
        if (container) {
            updateActiveContainer(container);
        }

        let term = input.value.trim();
        if (currentTerm === term
            && (keyboardEvent.key === DOWN_ARROW || keyboardEvent.key === UP_ARROW || keyboardEvent.key === ENTER_KEY)
        ) {
            return;
        }
        searchResults.style.display = term === "" || term.length < 2 ? "none" : "block";
        searchResultsItems.innerHTML = "";
        currentTerm = term;
        if (term === "" || term.length < 2) {
            return;
        }

        const baseCategoryMap = {
            "home": "/",
            "blog": "/blog",
            "readings": "/readings",
            "talks": "/talks",
            "music": "/music",
            "books": "/books"
        };
        const customSearchMapCategories = {};
        Object.entries(baseCategoryMap).forEach(([keyword, targetPath]) => {
            const normalizedTarget = targetPath === "/" ? "/" : `/${targetPath.replace(/^\/+/, "")}`;
            if (IS_SPANISH) {
                customSearchMapCategories[keyword] = `${LANG_PREFIX}${normalizedTarget}`;
            } else {
                customSearchMapCategories[keyword] = normalizedTarget;
            }
        });
        if (Object.keys(customSearchMapCategories).includes(term)) {
            const item = document.createElement("li");
            item.innerHTML = formatSearchResultItem({
                ref: customSearchMapCategories[term],
                doc: {
                    id: "#",
                    title: term.charAt(0).toUpperCase() + term.slice(1),
                    body: "",
                }
            }, []);
            searchResultsItems.appendChild(item);
            return;
        }

        // Prepare search query - filter out single-character terms
        let searchTerm = term.startsWith('*') ? term.slice(1) : term;
        const searchWords = searchTerm.split(/\s+/).filter(word => word.length >= 2 || word.length === currentTerm.length);
        if (searchWords.length === 0) {
            // All terms were too short
            searchResults.style.display = "none";
            return;
        }
        searchTerm = searchWords.join(' ');

        // Try exact match first
        const currentIndex = await initIndex();
        const availableFields = currentIndex._fields || [];
        const filteredFields = {};
        Object.keys(fieldBoosts).forEach((fieldKey) => {
            if (availableFields.includes(fieldKey)) {
                filteredFields[fieldKey] = fieldBoosts[fieldKey];
            }
        });
        const effectiveOptions = { ...options, fields: filteredFields };

        let indexResults = currentIndex.search(searchTerm, effectiveOptions);

        // If no results and term is long enough, try fuzzy search with wildcard
        if (indexResults.length === 0 && searchTerm.length >= 3) {
            const fuzzyOptions = {...effectiveOptions, bool: "OR"};
            indexResults = currentIndex.search(searchTerm + "*", fuzzyOptions);
        }
        if (indexResults.length === 0 && searchTerm.length >= 4) {
            const relaxedOptions = {...effectiveOptions, bool: "OR"};
            let truncated = searchTerm;
            while (indexResults.length === 0 && truncated.length >= 4) {
                truncated = truncated.slice(0, -1);
                indexResults = currentIndex.search(truncated + "*", relaxedOptions);
            }
        }

        // Sort results by score (relevance) in descending order
        indexResults.sort((a, b) => b.score - a.score);

        const items = filterAndRankResults(indexResults, term, searchTerm);
        const resultCount = activeContainer.querySelector('.search-results__count');

        if (items.length === 0) {
            if (term.toLowerCase() === "btc") {
                input.value = "bitcoin";
                input.dispatchEvent(new KeyboardEvent("keyup"));
                return
            }

            if (resultCount) {
                resultCount.textContent = '';
            }

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

        // Count results by section
        const sectionCounts = {};
        const sectionLabels = SEARCH_SECTION_LABELS[IS_SPANISH ? "es" : "en"] || SEARCH_SECTION_LABELS.en;
        for (const item of items) {
            const parsed = item._parsedPath || parseRef(item.ref);
            const rawSection = getSectionFromPath(parsed.path) || 'other';
            const label = sectionLabels[rawSection] || sectionLabels.other || rawSection;
            sectionCounts[label] = (sectionCounts[label] || 0) + 1;
        }

        // Update result count with section breakdown
        if (resultCount) {
            const resultLabelSet = SEARCH_RESULT_LABELS[IS_SPANISH ? "es" : "en"] || SEARCH_RESULT_LABELS.en;
            const resultWord = items.length === 1 ? resultLabelSet.singular : resultLabelSet.plural;
            const separator = resultLabelSet.separator || ":";
            const sectionBreakdown = Object.entries(sectionCounts)
                .map(([section, count]) => `${count} ${section}`)
                .join(', ');
            resultCount.textContent = `${items.length} ${resultWord}${sectionBreakdown ? `${separator} ${sectionBreakdown}` : ""}`;
        }

        // Easter egg: check for bitcoin search
        const isBitcoinSearch = searchTerm.toLowerCase().includes('bitcoin');

        // Display all results sorted by relevance
        for (let i = 0; i < items.length; i++) {
            const li = document.createElement("li");
            try {
                li.innerHTML = formatSearchResultItem(items[i], term.split(" "), isBitcoinSearch);
            } catch (error) {
                console.error("Failed to render search result item", error, items[i]);
                const safeDoc = items[i].doc || {};
                li.innerHTML = `<div class="search-results__item"><a href="${buildLocalizedHref(items[i].ref || '#')}"><span class="search-results__item-title">${safeDoc.title || items[i].ref || 'Result'}</span></a></div>`;
            }
            searchResultsItems.appendChild(li);
        }
    }, WAIT_TIME_MS);

    // Bind events to ALL search inputs
    allSearchContainers.forEach(container => {
        const input = container.querySelector('input[type="search"]');
        if (!input) return;

        input.addEventListener("keyup", function(e) {
            handleSearch(e, input);
        });

        input.addEventListener("focusin", function () {
            updateActiveContainer(container);
            if (input.value !== "") {
                input.dispatchEvent(new KeyboardEvent("keyup"));
            }
        });

        input.addEventListener("focusout", function () {
            resultsItemsIndex = -1;
        });
    });

    window.addEventListener('click', function (e) {
        allSearchContainers.forEach(container => {
            const results = container.querySelector('.search-results');
            if (results && results.style.display === "block" && !results.contains(e.target)) {
                results.style.display = "none";
            }
        });
    });
}

function filterAndRankResults(results, term, searchTerm){
    const items = [];
    const lowerTerm = searchTerm.toLowerCase();
    const normalizedQueryTokens = searchTerm
        .split(/\s+/)
        .filter(Boolean)
        .map(token => normalizeForSearch(token));

    // Section priority weights
    const sectionWeights = {
        'blog': 2.0,
        'readings': 1.5,
        'talks': 1.2,
        'books': 1.0
    };

    for (let i = 0; i < results.length; i++) {
        const result = results[i];

        // Skip results without a title or ref
        if (!result.doc.title || result.ref === "") {
            continue;
        }

        const parsedRef = parseRef(result.ref);
        if (!matchesCurrentLang(parsedRef.path)) {
            continue;
        }
        result._parsedPath = parsedRef;

        const sectionKey = getSectionFromPath(parsedRef.path).toLowerCase();
        if (sectionKey === "books") {
            continue;
        }

        const lookupPath = getNormalizedServicePath(parsedRef.path);
        const serviceText = getServiceSearchText(lookupPath);

        let combinedContent = [result.doc.title, result.doc.body, result.doc.description].join(" ");
        if ((!result.doc.body || result.doc.body.length === 0) && serviceText) {
            result.doc.body = serviceText;
            combinedContent += ` ${serviceText}`;
        } else if (serviceText && combinedContent.indexOf(serviceText) === -1) {
            combinedContent += ` ${serviceText}`;
        }

        const docContentNormalized = normalizeForSearch(combinedContent);
        const matchesAllTokens = normalizedQueryTokens.every(token => token === "" || docContentNormalized.includes(token));
        if (!matchesAllTokens) {
            continue;
        }

        // Apply section weight
        const sectionWeight = sectionWeights[sectionKey] || 1.0;
        result.score *= sectionWeight;

        // Boost score for exact title matches
        const titleLower = result.doc.title.toLowerCase();
        if (titleLower === lowerTerm) {
            result.score *= 3; // Triple score for exact match
        } else if (titleLower.includes(lowerTerm)) {
            result.score *= 2; // Double score for partial match
        } else if (titleLower.startsWith(lowerTerm)) {
            result.score *= 2.5; // 2.5x score for prefix match
        }

        items.push(result);
    }

    // Re-sort after boosting scores
    items.sort((a, b) => b.score - a.score);

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

function formatSearchResultItem(item, terms, isBitcoinSearch = false) {
    const bitcoinIcon = isBitcoinSearch ? '₿ ' : '';

    if (item.ref === undefined || item.ref === "") {
        return `<div class="search-results__item ${item.class}">`
            + `<span class="search-results__item-title ${item.class}">${bitcoinIcon}${item.doc.title}</span>`
            + (item.doc.body ? `<div class="search-results__item-body ${item.class}">${item.doc.body}</div>` : "")
            + '</div>';
    }

    // Remove '*' from the first element
    if (terms.length > 0 && terms[0].startsWith('*')) {
        terms = [terms[0].slice(1), ...terms.slice(1)].filter(term => term.trim() !== "");
    }

    const parsed = item._parsedPath || parseRef(item.ref);
    const sectionBase = getSectionFromPath(parsed.path);
    const section = sectionBase ? sectionBase.charAt(0).toUpperCase() + sectionBase.slice(1) : '';
    const href = buildLocalizedHref(item.ref);

    // Format date if available
    let dateStr = '';
    if (item.doc.date) {
        const [year, month, day] = item.doc.date.split('-');
        const date = new Date(year, month - 1, day);
        dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    const snippetSource = (typeof item.doc.body === "string" && item.doc.body.length > 0)
        ? item.doc.body
        : (typeof item.doc.description === "string" ? item.doc.description : "");
    let teaser = "";
    if (snippetSource) {
        try {
            teaser = makeTeaser(snippetSource, terms);
        } catch (error) {
            console.warn("Teaser generation failed, falling back to raw excerpt:", error);
            teaser = snippetSource.slice(0, 180) + (snippetSource.length > 180 ? "…" : "");
        }
    }

    return '<div class="search-results__item">'
        + `<a href="${href}">`
        + `<div class="search-results__item-meta">`
        + (section ? `<span class="search-results__item-section">${section}</span>` : '')
        + (dateStr ? `<span class="search-results__item-date">${dateStr}</span>` : '')
        + `</div>`
        + `<span class="search-results__item-title">${bitcoinIcon}${item.doc.title}</span>`
        + (teaser ? `<div class="search-results__item-body">${teaser}</div>` : '')
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
