
import workflows from './workflows';
import banner from './components/banner'
import datePicker from './components/date-picker';

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
export const component = {
    Banner: banner,
    DatePicker: datePicker
};