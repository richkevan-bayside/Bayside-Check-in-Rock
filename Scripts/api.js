
const ROCK_API_BASE_URL = 'https://rock.bayside.church/api';
    
function updateAttributeValue(attributeValueId, newValue) {
    const url = `https://rock.bayside.church/api/AttributeValues/${attributeValueId}`;

    const request = new Request(url, {
        method: 'PATCH',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ Value: newValue })
    });

    fetch(request)
    .then(() => {
        
    })
    .catch(() => {
        
    });
}

function insertNewAttributeValue(attributeId, entityId, value) {
    const url = `https://rock.bayside.church/api/AttributeValues`;

    const request = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            IsSystem: false,
            EntityId: entityId,
            AttributeId: attributeId,
            Value: value
        })
    });

    fetch(request)
    .then(() => {
        
    })
    .catch((response) => {
        
    });
}