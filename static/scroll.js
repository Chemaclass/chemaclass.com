window.addEventListener('load', function () {
    const SCROLL_UP_THRESHOLD = 10;
    const TOP_MARGIN = 95; // Always show the elements within px of the top
    let lastScrollY = window.scrollY;

    //////////////////////////
    // scroll to top button
    //////////////////////////
    const $scrollToTop = document.getElementById('scroll-to-top');

    $scrollToTop.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    //////////////////////////
    // navbar
    //////////////////////////
    const $navbar = document.querySelector('.site-header') || document.querySelector('header');
    const $toc = document.getElementById('toc-container');
    const isTOCHidden = () => (!$toc || $toc.dataset.hideToc === 'true');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY <= TOP_MARGIN) {
            // Always show when near the top of the page
            if ($navbar) {
                $navbar.classList.remove('hidden');
                $navbar.classList.add('show');
            }
            $scrollToTop.classList.remove('show');
            $scrollToTop.classList.add('hidden');
            if (!isTOCHidden() && $toc) $toc.classList.remove('toc-top');
        } else if (currentScrollY > lastScrollY) {
            // Scrolling down - navbar hides, TOC moves to top
            if ($navbar) {
                $navbar.classList.add('hidden');
                $navbar.classList.remove('show');
            }
            $scrollToTop.classList.remove('show');
            $scrollToTop.classList.add('hidden');
            if (!isTOCHidden() && $toc) {
                $toc.classList.add('toc-top');
                $toc.classList.remove('toc-navbar-visible');
            }
        } else if (lastScrollY - currentScrollY > SCROLL_UP_THRESHOLD) {
            // Scrolling up past the threshold - navbar shows, TOC moves down
            if ($navbar) {
                $navbar.classList.remove('hidden');
                $navbar.classList.add('show');
            }
            $scrollToTop.classList.remove('hidden');
            $scrollToTop.classList.add('show');
            if (!isTOCHidden() && $toc) {
                $toc.classList.add('toc-top');
                $toc.classList.add('toc-navbar-visible');
            }
        }

        lastScrollY = currentScrollY;
    });
});
