
import workflows from './workflows';

function setLoadingState(loading) {
    if (loading) {
        $('.bcc-loading').show();
    } else {
        $('.bcc-loading').hide();
    }
}

function createElementAndSetValue(html, value) {
    let elem = $('' + html);
    elem.val(value);
    return elem;
}

export function foo() {
    alert('foo');
}

export const workflow = workflows;