window.addEventListener('load', function () {
    function addLinkToImgs(listSelector, linkSelector) {
        document
            .querySelectorAll(listSelector)
            .forEach((div) => {
                div.querySelectorAll('img')
                    .forEach(img => img
                        .addEventListener('click', () => {
                            const link = div.querySelector(linkSelector);
                            if (link) {
                                window.location.href = link.href;
                            }
                        }));
            });
    }

    addLinkToImgs('.post-preview', 'h3.post-title a');
    addLinkToImgs('.reading-preview', 'h3.reading-title a');
});
