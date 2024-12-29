window.addEventListener('load', function () {
    function addLinkToContainer(containerSelector, linkSelector) {
        document
            .querySelectorAll(containerSelector)
            .forEach((div) => {
                div.addEventListener('click', () => {
                    const link = div.querySelector(linkSelector);
                    if (link) {
                        window.location.href = link.href;
                    }
                });
            });
    }

    addLinkToContainer('.post-preview', 'h3.post-title a');
    addLinkToContainer('.reading-preview', 'h3.reading-title a');
});
