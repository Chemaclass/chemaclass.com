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
    const $navbar = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY <= TOP_MARGIN) {
            // Always show when near the top of the page
            $navbar.classList.remove('hidden');
            $navbar.classList.add('show');
            $scrollToTop.classList.remove('show');
            $scrollToTop.classList.add('hidden');
        } else if (currentScrollY > lastScrollY) {
            // Scrolling down
            $navbar.classList.add('hidden');
            $navbar.classList.remove('show');
            $scrollToTop.classList.remove('show');
            $scrollToTop.classList.add('hidden');
        } else if (lastScrollY - currentScrollY > SCROLL_UP_THRESHOLD) {
            // Scrolling up past the threshold
            $navbar.classList.remove('hidden');
            $navbar.classList.add('show');
            $scrollToTop.classList.remove('hidden');
            $scrollToTop.classList.add('show');
        }

        lastScrollY = currentScrollY;
    });
});
