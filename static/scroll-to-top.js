window.addEventListener('load', function () {
    const $scrollToTop = document.getElementById('scroll-to-top');
    const $postTitle = document.querySelector('.post-title');

    if (!$postTitle) {
        $scrollToTop.classList.add('hidden');
        return;
    }

    let lastScrollY = window.scrollY;
    const topMargin = 80; // Always show the navbar within px of the top

    // TODO: Extract `debounce` implementation to shared module or something
    window.addEventListener('scroll', debounce(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY >= topMargin) {
            $scrollToTop.classList.remove('hidden');
            $scrollToTop.classList.add('show');
        } else {
            $scrollToTop.classList.remove('show');
            $scrollToTop.classList.add('hidden');
        }

        lastScrollY = currentScrollY;
    }, 50));

    $scrollToTop.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});
