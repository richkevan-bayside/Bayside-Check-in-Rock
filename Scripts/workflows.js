
function onWorkflowRequestComplete(data) {
    setLoadingState(false);
    
    const parent = $('.bcc-form');
    const attributeKeys = Object.keys(data.AttributeValues);
    
    // create a field for each attrib
    attributeKeys.forEach((key) => {
        let attributeValue = data.AttributeValues[key];
        const attribute = data.Attributes[key];
        
        let container = $('<div></div>');
        let label = $(`<p><strong>${key}</strong></p>`);
        let value = $(`<p>${attributeValue.ValueFormatted}</p>`);
        let actions = $('<div class="actions mt-3"></div>');

        container.append(label);
        container.append(value);
        container.append(actions);
        container.appendTo(parent);
            
        let editButton = $('<button class="btn btn-secondary">Edit</button>');

        // edit button behavoir
        editButton.click(function() {
            editButton.hide();
            value.hide();

            // display form
            const input = generateInput(attribute, attributeValue);

            console.log(input);

            label.after(input);
            
            // add buttons
            cancelButton = $('<button href="#" class="btn btn-secondary mr-3">Cancel</button>');
            cancelButton.click(function() {
                // behavior for cancel button
                input.remove();
                cancelButton.remove();
                saveButton.remove();
                
                value.show();
                editButton.show();
            });

            saveButton = $('<button href="#" class="btn btn-primary">Save</button>');
            saveButton.click(function() {
                // behavior for save button
                attributeValue.ValueFormatted = input.val();
                value.text(input.val());
                
                // request

                
                input.remove();
                cancelButton.remove();
                saveButton.remove();
                
                value.show();
                editButton.show();
                
                // reload page
            });
            
            actions.append(cancelButton);
            actions.append(saveButton);
        });

        actions.append(editButton);
    });
}