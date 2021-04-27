const FIELD_TYPES = {
    TEXT: 1,
    DATE: 11,
    DATETIME: 83,
    MEMO: 21
};

export function generateInput(attribute, attributeValue) {
    const valueFormatted = attributeValue ? attributeValue.ValueFormatted : null;
    const value = attributeValue ? attributeValue.Value : null;
    const type = attribute.FieldTypeId;

    if (type == FIELD_TYPES.TEXT) {
        return createElementAndSetValue('<input type="text" class="input" />', valueFormatted);
    } else if (type == FIELD_TYPES.DATE) {
        const date = value ? new Date(value) : null;
        const picker = new DatePicker(date);
        return picker.getRoot();
    } else if (type == FIELD_TYPES.MEMO) {
        return createElementAndSetValue('<input type="text" class="input" />', valueFormatted);
    } else if (type == FIELD_TYPES.DATETIME) {
        const date = value ? new Date(value) : null;
        const picker = new DatePicker(date);
        return picker.getRoot();
    } else {
        return $('');
    }
}