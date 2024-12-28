window.addEventListener('load', function () {
    const $scrollToTop = document.getElementById('scroll-to-top');
    const $postTitle = document.querySelector('.post-title');

    if (!$postTitle) {
        $scrollToTop.classList.add('hidden');
        return;
    }

    const scrollThreshold = 80;

    if (window.scrollY >= scrollThreshold) {
        $scrollToTop.classList.remove('hidden');
        $scrollToTop.classList.add('show');
    }

    let lastScrollY = window.scrollY;
    // TODO: Extract `debounce` implementation to shared module or something
    window.addEventListener('scroll', debounce(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY >= scrollThreshold) {
            $scrollToTop.classList.remove('hidden');
            $scrollToTop.classList.add('show');
        } else {
            $scrollToTop.classList.remove('show');
            $scrollToTop.classList.add('hidden');
        }

        lastScrollY = currentScrollY;
    }, 100));

    $scrollToTop.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});
