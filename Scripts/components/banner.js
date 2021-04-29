
export function addBanner(text, cssClass) {
    const container = $('#banner-container');

    if (container) {
        const newBanner = $(`
            <div class="bcc-banner alert ${cssClass} alert-dismissable">
                ${text}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`
        );

        const removeBannerTimeout = () => {
            newBanner.remove();
        }

        // add click listener to close button
        newBanner.find('.btn-close').click(function () {
            newBanner.remove();
        });

        newBanner.hide();
        container.append(newBanner);
        newBanner.fadeIn(100);

        // remove banner after 5s
        setTimeout(() => {
            newBanner.remove();
        }, 5000);
    }
}