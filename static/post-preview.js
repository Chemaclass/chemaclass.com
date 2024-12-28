window.addEventListener('load', function () {
    document
        .querySelectorAll('.preview.post-preview')
        .forEach((div) => {
            div.querySelectorAll('img')
                .forEach(img => img
                    .addEventListener('click', () => {
                        const link = div.querySelector('h3.post-title a');
                        if (link) {
                            window.location.href = link.href;
                        }
                    }));
        });
});
