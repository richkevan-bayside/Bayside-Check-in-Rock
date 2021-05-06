
function init() {
    $('.bcc-dropdown').each(function() {
        initDropdown(this);
    });
}

function initDropdown(root) {
    const $root = $(root);
    const $menu = $root.children('.bcc-dropdown-menu');
    const $valueLabel = $root.find('.bcc-dropdown-value');
    const $items = $menu.children('.bcc-dropdown-item');

    function expand() {
        $menu.show();
        $menu.data('expanded', true);
    }

    function collapse() {
        $menu.hide();
        $menu.data('expanded', false);
    }

    function setValue(newValue) {
        if (!newValue || newValue === '') {
            return;
        }

        const targetDropdownItem = $menu.find(`.bcc-dropdown-item[value=${newValue}]`);
        const targetLabel = $(targetDropdownItem).data('label');

        $valueLabel.text(targetLabel);
        $root.val(newValue);
    }

    // add toggle listener
    $root.children('.bcc-dropdown-toggle').click(function () {
        $menu.toggle();
        
        if ($root.data('expanded') == true) {
            $root.data('expanded', false);
        } else {
            $root.data('expanded', true);
        }
    });

    // add item click listeners
    $items.click(function () {
        const $this = $(this);
        const newValue = $this.val();

        alert(newValue);

        console.log($this);

        setValue(newValue);
        collapse();
    });

    // set value from value attribute on each dropdown item
    $items.each(function () {
        const $this = $(this);
        $this.val($this.attr('value'));
    });

    // process expanded attribute
    const expanded = $root.data('expanded');

    if (expanded == null || expanded == false) {
        $root.data('expanded', false);
        $menu.hide();
    } else if (expanded == true) {
        $menu.show();
    }

    // process placeholder and value attribute
    const initialValue = $root.val();
    const placeholer = $root.attr('placeholer');

    if (initialValue == null && placeholer != null) {
        $valueLabel.text(placeholer);
    } else if (initialValue != null) {
        setValue(initialValue);
    }
}

const module = {
    init
}

export default module;