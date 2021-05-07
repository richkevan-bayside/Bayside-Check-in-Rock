
export default class Banner {
    constructor(text, cssClass) {
        this.root = $(`
            <div class="bcc-banner alert ${cssClass} alert-dismissable">
                ${text}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`
        );

        this.root.hide();
    }

    addToContainer(containerId) {
        const container = $(`#${containerId}`);

        if (container) {
            container.append(this.root);
            this.root.fadeIn(100);

            // remove banner after 5s
            setTimeout(() => {
                this.root.remove();
            }, 5000);
        }
    }
}