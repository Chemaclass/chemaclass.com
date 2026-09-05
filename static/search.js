const UP_ARROW = "ArrowUp";
const DOWN_ARROW = "ArrowDown";
const ENTER_KEY = "Enter";
const WAIT_TIME_MS = 150; // debounce window before firing a search
const DOCUMENT_LANG = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
const IS_SPANISH = DOCUMENT_LANG.startsWith("es");
const LANG_PREFIX = IS_SPANISH ? "/es" : "";
const SEARCH_INDEX_PATH = IS_SPANISH ? "/search_index.es.json" : "/search_index.en.json";
const HEADING_INDEX_PATH = IS_SPANISH ? "/heading_index.es.json" : "/heading_index.en.json";
// Ten page hits fill the panel. Past that the reader refines the query rather
// than scrolling, and every rendered row costs layout on a phone.
const MAX_PAGE_RESULTS = 10;
const MAX_HEADING_RESULTS = 4;
const RECENT_STORAGE_KEY = "chemaclass:recent-searches";
const MAX_RECENT_SEARCHES = 5;
const SEARCH_DIALOG = document.getElementById("search-dialog");
// The labels live in config.toml and reach the script through the dialog, so
// there is one translation of each string rather than one per language per file.
const SEARCH_TEXT = {
    emptyTitle: SEARCH_DIALOG?.dataset.emptyTitle || "Nothing found",
    emptyBody: SEARCH_DIALOG?.dataset.emptyBody || "Try something else",
    sectionsTitle: SEARCH_DIALOG?.dataset.sectionsTitle || "Sections",
    of: SEARCH_DIALOG?.dataset.resultsOf || "of"
};
const SERVICE_SEARCH_CONTENT = {
    en: {
        "/services/web-development/": "Website design for small businesses and independent professionals, built by one senior developer in Berlin. Fixed price from €1,000, live in under a month. Two tiers: Custom Website and Website + Blog. Responsive design, SEO fundamentals, HTTPS, hosting and domain included for year 1, optional care plan.",
        "/services/team-workshops/": "Team Workshops service: full-day coding sessions covering testing, golden master techniques, test-driven development, refactoring, pair programming, and safe improvements to legacy code. Morning session on tests, afternoon on refactoring, investment €480 per person for 3-8 developers."
    },
    es: {
        "/services/web-development/": "Diseño y desarrollo de páginas web para empresas y autónomos, hecho por un desarrollador senior en Berlín. Precio cerrado desde 1.000 €, online en menos de un mes. Dos opciones: Web a Medida y Web + Blog. Diseño responsive, SEO básico, HTTPS, hosting y dominio incluidos el primer año, plan de mantenimiento opcional.",
        "/services/team-workshops/": "Servicio de Team Workshops: un día completo de coding katas enfocados en testing, golden master, TDD, refactorización y trabajo en código legado. Incluye sesiones de mañana y tarde, pair programming y precio de 480 € por persona para grupos de 3 a 8."
    }
};
const SEARCH_RESULT_LABELS = {
    en: { singular: "result", plural: "results" },
    es: { singular: "resultado", plural: "resultados" }
};
// Every first path segment the index actually carries, so no row falls back to a
// capitalized English slug on /es/
const SECTION_LABELS = {
    en: {
        blog: "Blog", readings: "Readings", talks: "Talks", series: "Series", services: "Services",
        music: "Music", profile: "Profile", topics: "Topics", cv: "CV", now: "Now",
        sponsor: "Sponsor", terminal: "Terminal", legal: "Legal"
    },
    es: {
        blog: "Blog", readings: "Lecturas", talks: "Charlas", series: "Series", services: "Servicios",
        music: "Música", profile: "Perfil", topics: "Temas", cv: "CV", now: "Ahora",
        sponsor: "Colabora", terminal: "Terminal", legal: "Legal"
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

/////////////////////////////////////////////////
// Heading-level hits, recent searches and filters
/////////////////////////////////////////////////

// Page hits answer "which post", heading hits answer "which part of it". The
// heading index is a flat list scored here rather than a second elasticlunr
// index: 900 short records match faster than they load into an inverted index,
// and the anchor is the whole point of the entry.
let headingIndexPromise = null;

function fetchHeadingIndex() {
    if (headingIndexPromise === null) {
        headingIndexPromise = fetch(HEADING_INDEX_PATH)
            .then((response) => (response.ok ? response.json() : []))
            .then((entries) => (Array.isArray(entries) ? entries.map(withHeadingSection) : []))
            .catch((error) => {
                console.warn('[search] heading index unavailable, page results only:', error);
                return [];
            });
    }
    return headingIndexPromise;
}

// Normalized once here, not per keystroke: the same 917 records were being
// lowercased and stripped of accents on every letter typed, which was 40% of the
// scan for text that never changes.
function withHeadingSection(entry) {
    entry.section = getSectionFromPath(parseRef(entry.route).path).toLowerCase();
    entry.searchTitle = normalizeForSearch(entry.title);
    entry.searchBody = `${entry.searchTitle} ${normalizeForSearch(entry.text)}`;
    return entry;
}

// Tiers, not arithmetic: a heading that says what you typed beats a paragraph
// that happens to contain the same words. Mirrors how the page results are
// boosted, so the two lists can sit in the same panel without one drowning the
// other.
function scoreHeading(entry, phrase, words) {
    const title = entry.searchTitle;
    const body = entry.searchBody;

    if (title === phrase) return 120;
    if (title.startsWith(phrase)) return 100;
    if (title.includes(phrase)) return 85;
    if (words.every((word) => title.includes(word))) return 65;
    if (body.includes(phrase)) return 45;
    if (words.every((word) => body.includes(word))) return 30;
    return 0;
}

async function searchHeadings(term) {
    const phrase = normalizeForSearch(term).trim();
    if (phrase.length < 2) return [];

    const words = phrase.split(/\s+/).filter(Boolean);
    const entries = await fetchHeadingIndex();

    return entries
        .map((entry) => ({ entry, score: scoreHeading(entry, phrase, words) }))
        .filter((hit) => hit.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((hit) => {
            hit.entry.score = hit.score;
            return hit.entry;
        });
}

function readRecentSearches() {
    try {
        const stored = JSON.parse(localStorage.getItem(RECENT_STORAGE_KEY));
        return Array.isArray(stored) ? stored.filter((term) => typeof term === "string") : [];
    } catch (error) {
        return [];
    }
}

function rememberSearch(term) {
    const cleaned = (term || "").trim();
    if (cleaned.length < 2) return;
    const kept = [cleaned, ...readRecentSearches().filter((old) => old.toLowerCase() !== cleaned.toLowerCase())]
        .slice(0, MAX_RECENT_SEARCHES);
    try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(kept));
    } catch (error) {
        // Private browsing denies storage; the search itself still works
    }
    renderRecentSearches();
}

function forgetRecentSearches() {
    try {
        localStorage.removeItem(RECENT_STORAGE_KEY);
    } catch (error) {
        // Nothing to clear if storage was never writable
    }
    renderRecentSearches();
}

function renderRecentSearches() {
    const group = SEARCH_DIALOG?.querySelector("[data-search-recent]");
    const chips = SEARCH_DIALOG?.querySelector("[data-search-recent-chips]");
    if (!group || !chips) return;

    const terms = readRecentSearches();
    group.hidden = terms.length === 0;
    chips.innerHTML = "";
    terms.forEach((term) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "search-chip";
        chip.dataset.searchTerm = term;
        chip.textContent = term;
        chips.appendChild(chip);
    });
}

// An empty box says nothing about what the archive holds, so the chips take its
// place until there is a query to answer.
function togglePrompts(hasTerm) {
    const prompts = SEARCH_DIALOG?.querySelector("[data-search-prompts]");
    const filters = SEARCH_DIALOG?.querySelector("[data-search-filters]");
    if (prompts) prompts.hidden = hasTerm;
    if (filters) filters.hidden = !hasTerm;
}

let activeFilter = "all";

function matchesFilter(section) {
    return activeFilter === "all" || section === activeFilter;
}

function pageSection(item) {
    const parsed = item._parsedPath || parseRef(item.ref);
    return getSectionFromPath(parsed.path).toLowerCase();
}

// Counts on the chips, and a chip with nothing behind it says so instead of
// offering a dead end.
function updateFilterCounts(pageHits, headingHits) {
    const chips = SEARCH_DIALOG?.querySelectorAll("[data-search-filters] .search-filter");
    if (!chips) return;

    const counts = {};
    [...pageHits.map(pageSection), ...headingHits.map((entry) => entry.section)].forEach((section) => {
        counts[section] = (counts[section] || 0) + 1;
        counts.all = (counts.all || 0) + 1;
    });

    chips.forEach((chip) => {
        const count = counts[chip.dataset.filter] || 0;
        chip.dataset.count = String(count);
        chip.disabled = count === 0 && chip.dataset.filter !== activeFilter;
        let badge = chip.querySelector(".search-filter__count");
        if (!badge) {
            badge = document.createElement("span");
            badge.className = "search-filter__count";
            chip.appendChild(badge);
        }
        badge.textContent = count > 0 ? ` ${count}` : "";
    });
}

function setActiveFilter(filter) {
    activeFilter = filter;
    SEARCH_DIALOG?.querySelectorAll("[data-search-filters] .search-filter").forEach((chip) => {
        const isActive = chip.dataset.filter === filter;
        chip.classList.toggle("search-filter--active", isActive);
        chip.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
}

// Keyboard selection and the mouse point at the same row, so Enter always opens
// what the reader is looking at.
function appendResultRow(markup, index) {
    const li = document.createElement("li");
    li.innerHTML = markup;
    if (typeof index === "number") {
        li.addEventListener("mouseenter", function () {
            if (searchItemSelected) removeClass(searchItemSelected, "selected");
            searchItemSelected = li;
            resultsItemsIndex = index;
            addClass(li, "selected");
        });
    }
    searchResultsItems.appendChild(li);
    return li;
}

function appendGroupLabel(title) {
    appendResultRow(`<div class="search-results__item category">`
        + `<span class="search-results__item-title">${title}</span>`
        + `</div>`);
}

function sectionLabel(section) {
    if (!section) return '';
    const labels = SECTION_LABELS[IS_SPANISH ? "es" : "en"] || SECTION_LABELS.en;
    return labels[section.toLowerCase()] || section.charAt(0).toUpperCase() + section.slice(1);
}

function formatHeadingResultItem(entry, terms) {
    let teaser = "";
    if (entry.text) {
        try {
            teaser = makeTeaser(entry.text, terms);
        } catch (error) {
            teaser = entry.text;
        }
    }
    return '<div class="search-results__item">'
        + `<a href="${entry.route}">`
        + `<span class="search-results__item-crumb">${entry.crumb}</span>`
        + `<span class="search-results__item-title">${entry.title}</span>`
        + (teaser ? `<div class="search-results__item-body">${teaser}</div>` : '')
        + `</a>`
        + '</div>';
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

// Fetch the search index, saying which path failed and with what status. Without
// the response.ok check a 404 (a renamed index, a language dropped from
// config.toml) reached JSON.parse as an HTML error page and surfaced as an
// unexplained SyntaxError.
function fetchSearchIndex() {
    return fetch(SEARCH_INDEX_PATH).then((response) => {
        if (!response.ok) {
            throw new Error(`${SEARCH_INDEX_PATH} returned HTTP ${response.status}`);
        }
        return response.json();
    });
}

// Preload the search index after page load for instant search
function preloadSearchIndex() {
    // A failure here is not fatal: initIndex() fetches the index again on the
    // first keystroke. It is still worth a line in the console, because the
    // silent version made a broken index path look like nothing had happened.
    const store = (data) => { window.__searchIndexData = data; };
    const warn = (error) => {
        console.warn('[search] preloading the index failed, it will be fetched on demand:', error);
    };

    // Use requestIdleCallback to load during idle time, or setTimeout as fallback
    const preload = () => {
        fetchSearchIndex().then(store, warn);
        fetchHeadingIndex();
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(preload);
    } else {
        setTimeout(preload, 1000);
    }
}

function initSearch() {
    const fieldBoosts = { title: { boost: 5 }, body: { boost: 1 } };
    const options = {
        bool: "OR", // OR matching widens recall
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
            index = fetchSearchIndex().then(function (data) {
                indexCache = elasticlunr.Index.load(data);
                return indexCache;
            });
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
        togglePrompts(term.length >= 2);
        searchResultsItems.innerHTML = "";
        currentTerm = term;

        // Easter egg: "67" (and variants) triggers seesaw animation
        if (window.__easter67) {
            if (window.__easter67.isTriggerTerm(term)) {
                window.__easter67.trigger();
                searchResults.style.display = "block";
                const resultCount = activeContainer.querySelector('.search-results__count');
                if (resultCount) resultCount.textContent = "";
                const item = document.createElement("li");
                item.innerHTML = `<div class="search-results__item easter-67-message">`
                    + `<span class="search-results__item-title">6️⃣ 7️⃣</span>`
                    + `<div class="search-results__item-body">${IS_SPANISH ? "Seis... ¡siete!" : "Six... seven!"}</div>`
                    + `</div>`;
                searchResultsItems.appendChild(item);
                return;
            }
            window.__easter67.stop();
        }

        if (term === "" || term.length < 2) {
            return;
        }

        // Easter egg: the ticker symbol types out the word
        if (term.toLowerCase() === "btc") {
            input.value = "bitcoin";
            input.dispatchEvent(new KeyboardEvent("keyup", { key: "a" }));
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

        const ranked = filterAndRankResults(indexResults, term, searchTerm);
        const rankedHeadings = await searchHeadings(term);
        const resultCount = activeContainer.querySelector('.search-results__count');
        updateFilterCounts(ranked, rankedHeadings);

        const items = ranked.filter((item) => matchesFilter(pageSection(item)));
        const headings = rankedHeadings.filter((entry) => matchesFilter(entry.section));

        if (items.length === 0 && headings.length === 0) {
            if (resultCount) {
                resultCount.textContent = '';
            }

            const item = document.createElement("li");
            item.innerHTML = formatSearchResultItem({
                class: "empty",
                doc: {
                    title: SEARCH_TEXT.emptyTitle,
                    body: SEARCH_TEXT.emptyBody,
                }
            }, "");
            searchResultsItems.appendChild(item);
            return;
        }

        const shownItems = items.slice(0, MAX_PAGE_RESULTS);
        const shownHeadings = headings.slice(0, MAX_HEADING_RESULTS);

        // A heading that says what you typed leads, unless a page title says it
        // too. Otherwise a post matching one weak word outranks the section that
        // is actually about the query.
        const normalizedTerm = normalizeForSearch(term).trim();
        const titleHit = items.some((item) => normalizeForSearch(item.doc.title).includes(normalizedTerm));
        const headingsFirst = shownHeadings.length > 0 && shownHeadings[0].score >= 85 && !titleHit;

        // The chips carry the per-section counts, so this line only says how many
        // were found and how many of them the panel is showing
        if (resultCount) {
            const resultLabelSet = SEARCH_RESULT_LABELS[IS_SPANISH ? "es" : "en"] || SEARCH_RESULT_LABELS.en;
            const total = items.length + headings.length;
            const shown = shownItems.length + shownHeadings.length;
            const resultWord = total === 1 ? resultLabelSet.singular : resultLabelSet.plural;
            resultCount.textContent = shown < total
                ? `${shown} ${SEARCH_TEXT.of} ${total} ${resultWord}`
                : `${total} ${resultWord}`;
        }

        // Easter egg: check for bitcoin search
        const isBitcoinSearch = searchTerm.toLowerCase().includes('bitcoin');
        const terms = term.split(" ");
        let row = 0;

        const renderPages = () => {
            for (let i = 0; i < shownItems.length; i++) {
                let markup;
                try {
                    markup = formatSearchResultItem(shownItems[i], terms, isBitcoinSearch);
                } catch (error) {
                    console.error("Failed to render search result item", error, shownItems[i]);
                    const safeDoc = shownItems[i].doc || {};
                    markup = `<div class="search-results__item"><a href="${buildLocalizedHref(shownItems[i].ref || '#')}"><span class="search-results__item-title">${safeDoc.title || shownItems[i].ref || 'Result'}</span></a></div>`;
                }
                appendResultRow(markup, row++);
            }
        };

        const renderHeadings = () => {
            if (shownHeadings.length === 0) return;
            appendGroupLabel(SEARCH_TEXT.sectionsTitle);
            row++;
            for (const entry of shownHeadings) {
                appendResultRow(formatHeadingResultItem(entry, terms), row++);
            }
        };

        if (headingsFirst) {
            renderHeadings();
            renderPages();
        } else {
            renderPages();
            renderHeadings();
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

        input.addEventListener("focusout", function (e) {
            resultsItemsIndex = -1;
            const next = e.relatedTarget;
            if (window.__easter67 && (!next || !container.contains(next))) {
                window.__easter67.stop();
            }
        });
    });

    if (SEARCH_DIALOG) {
        const input = SEARCH_DIALOG.querySelector('input[type="search"]');

        const runSearch = () => {
            if (!input) return;
            input.focus();
            input.dispatchEvent(new KeyboardEvent("keyup", { key: "a" }));
        };

        SEARCH_DIALOG.addEventListener("click", function (e) {
            const chip = e.target.closest("[data-search-term]");
            if (chip && input) {
                input.value = chip.dataset.searchTerm;
                runSearch();
                return;
            }

            const filter = e.target.closest(".search-filter");
            if (filter) {
                setActiveFilter(filter.dataset.filter);
                runSearch();
                return;
            }

            if (e.target.closest("[data-search-clear-recent]")) {
                forgetRecentSearches();
                return;
            }

            // A query that led somewhere is worth offering again
            if (e.target.closest(".search-results a") && input) {
                rememberSearch(input.value);
            }
        });

        document.addEventListener("search-closed", function () {
            setActiveFilter("all");
            togglePrompts(false);
            renderRecentSearches();
        });

        renderRecentSearches();
        togglePrompts(false);
    }
}

function filterAndRankResults(results, term, searchTerm){
    const items = [];
    const normalizedTerm = normalizeForSearch(searchTerm).trim();
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

        // Boost score for title matches. Two things were wrong here.
        // The comparison lowercased but did not strip diacritics, so a reader
        // typing "paginas web" scored half of one typing "páginas web", while
        // matchesAllTokens above already folded both sides. And the prefix
        // branch sat after the substring branch, which subsumes it, so 2.5x
        // was unreachable: every prefix took the 2x path instead.
        const titleNormalized = normalizeForSearch(result.doc.title);
        if (normalizedTerm) {
            if (titleNormalized === normalizedTerm) {
                result.score *= 3; // Triple score for exact match
            } else if (titleNormalized.startsWith(normalizedTerm)) {
                result.score *= 2.5; // 2.5x score for prefix match
            } else if (titleNormalized.includes(normalizedTerm)) {
                result.score *= 2; // Double score for partial match
            }
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
    const section = sectionLabel(sectionBase);
    const href = buildLocalizedHref(item.ref);

    // Format date if available
    let dateStr = '';
    if (item.doc.date) {
        const [year, month, day] = item.doc.date.split('-');
        const date = new Date(year, month - 1, day);
        dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    const rawSnippet = (typeof item.doc.body === "string" && item.doc.body.length > 0)
        ? item.doc.body
        : (typeof item.doc.description === "string" ? item.doc.description : "");
    const snippetSource = rawSnippet.replace(/\s#(\s|$)/g, " ");
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

        // add <mark/> around search terms
        if (word[1] === TERM_WEIGHT) {
            teaser.push("<mark>");
        }
        startIndex = word[2] + word[0].length;
        teaser.push(body.substring(word[2], startIndex));

        if (word[1] === TERM_WEIGHT) {
            teaser.push("</mark>");
        }
    }
    teaser.push("…");
    return teaser.join("");
}
