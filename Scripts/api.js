
const ROCK_API_BASE_URL = 'http://bcceric.baysideonline.com/api';

export function rockRequest(body, endpoint, method, options) {
    const request = new Request({
        method: method,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
    });

    const url = `${ROCK_API_BASE_URL}/${endpoint}`;
    let returnData = null;

    fetch(url, request)
    .then((response) => {
        // check status codes
        if (response.ok) {
            return response.json();
        } else {
            if (options && options.failure) {
                options.failure(response);
            }
        }
    })
    .then((json) => {
        if (options && options.sucess) {
            options.sucess(json);
        }
    })
    .catch((error) => {
        if (options && options.failure) {
            options.failure(error);
        }
    });

    return returnData;
}