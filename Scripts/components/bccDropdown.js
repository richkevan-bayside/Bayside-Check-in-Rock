import { rockRequest } from "../api";

function init() {
    $('.bcc-dropdown').each(function() {
        initDropdown(this);
    });
}

function initDropdown(root) {
    const $root = $(root);

    function expand() {
        const $menu = $root.children('.bcc-dropdown-menu');
        $menu.show();
        $menu.data('expanded', true);
    }

    function collapse() {
        const $menu = $root.children('.bcc-dropdown-menu');
        $menu.hide();
        $menu.data('expanded', false);
    }

    function setValue(newValue) {
        $root.val(newValue).change();
    }

    function initDropdownCommon() {
        const $menu = $root.children('.bcc-dropdown-menu');
        const $items = $menu.children('.bcc-dropdown-item');

        // add change listener to update label
        $root.change(function () {
            const newValue = $(this).val();

            if (!newValue || newValue === '') {
                return;
            }

            const targetDropdownItem = $menu.find(`.bcc-dropdown-item[value=${newValue}]`);
            const targetLabel = $(targetDropdownItem).data('label');

            $root.find('.bcc-dropdown-value').text(targetLabel);
        });

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
            $root.find('.bcc-dropdown-value').text(placeholer);
        } else if (initialValue != null) {
            setValue(initialValue);
        }
    }

    // process type attribute
    const dropdownType = $root.data('type');

    switch (dropdownType) {
        case 'campus':
            const $menu = $root.children('.bcc-dropdown-menu');
            populateCampusItems($menu, initDropdownCommon);
            break;
        default:
            initDropdownCommon();
            break;
    }
}

function populateCampusItems($menu, init) {
    $.ajax({
        type: 'GET',
        url: Rock.settings.get('baseUrl') + 'api/campuses?$filter=IsActive%20eq%20true',
        timeout: 5000
    })
    .done(function (data) {
        if (data) {
            for (const campus of data) {
                $menu.append(`
                    <div class="bcc-dropdown-item" data-label="${campus.Name}" value="${campus.Id}">
                        ${campus.Name}
                    </div>
                `);
            }
        }

        init();
    })
    .fail(function (xhr, status) {
        alert('failed to get campuses for dropdown: ' + status);
    });
}

const module = {
    init
}

export default module;