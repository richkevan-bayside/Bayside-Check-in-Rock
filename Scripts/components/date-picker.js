
/*
 * the date picker element
 */
class DatePicker {
    constructor(initialValue) {
        if (!initialValue) {
            initialValue = new Date();
        }

        // some variables
        this.state = {
            current: initialValue,
            selected: initialValue,
            nextSelectAction: 'start'
        };
        
        // create elements
        this.root = $('<div class="date-picker"></div>');
        this.value = $('<div class="date-picker-value"></div>');
        this.panel = $('<div class="date-picker-panel"></div>"');
        this.controls = $(`
            <div class="date-picker-controls">
                <button data-role="month-prev" class="date-picker-button">
                    <i class="fa fa-sort-desc fa-rotate-180"></i>
                </button>
                <button data-role="year-prev" class="date-picker-button">
                    <i class="fa fa-step-forward fa-rotate-270"></i>
                </button>
                <p class="month-label">Date Picker</p>
                <button data-role="year-next" class="date-picker-button">
                    <i class="fa fa-step-forward"></i>
                </button>
                <button data-role="month-next" class="date-picker-button">
                    <i class="fa fa-sort-desc fa-rotate-270"></i>
                </button>
            </div>`
        );

        this.legend = $(`
            <div class="date-picker-legend"> 
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>Th</div>
                <div>F</div>
                <div>S</div>
            </div>
        `);

        this.days = $('<div class="days"></div>');

        // add elements to panel
        this.panel.append(this.controls);
        this.panel.append(this.legend);
        this.panel.append(this.days);

        // add elements to root
        this.root.append(this.value);
        this.root.append(this.panel);

        this.renderValue();
        this.renderDays();
        this.addEventListeners();
        this.setValueToCurrentSelected();
    }

    getRoot() {
        return this.root;
    }

    handleWindowClick(event) {
        // close modal if we did't click on the date picker
        for (let p of event.path) {
            if (p.classList && p.classList.contains('date-picker')) return;
        }

        this.hidePanel();
    }

    showPanel() {
        this.panel.show();
        window.addEventListener('click', this.handleWindowClick.bind(this));
    }

    hidePanel() {
        this.panel.hide();
        window.removeEventListener('click', this.handleWindowClick);
    }

    handleDayClick(e, day) {
        const selectedDay = $(e.target).attr('data-value');
        
        alert(selectedDay);
        
        let selectedDate = new Date(this.state.current);
        selectedDate.setDate(selectedDay);
        
        this.state.selected = selectedDate;

        this.renderValue();
        this.renderDays();
        this.hidePanel();
        this.setValueToCurrentSelected();
    }

    setValueToCurrentSelected() {
        this.root.val(this.state.current.Date('yyyy-mm-dd'));
    }

    renderValue() {
        const text = this.state.selected ? 
        `${this.state.selected.getMonth() + 1}/${this.state.selected.getDate()}/${this.state.selected.getFullYear()}` :
        'n/a';

        this.value.text(text);
    }

    addEventListeners() {
        this.controls.children('[data-role=year-prev]').click(() => {
            this.state.current.setFullYear(this.state.current.getFullYear() - 1);
            this.renderDays();
            this.renderValue();
        });

        this.controls.children('[data-role=year-next]').click(() => {
            this.state.current.setFullYear(this.state.current.getFullYear() + 1);
            this.renderDays();
            this.renderValue();
        });

        this.controls.children('[data-role=month-prev]').click(() => {
            this.state.current.setMonth(this.state.current.getMonth() - 1);
            this.renderDays();
            this.renderValue();
        });

        this.controls.children('[data-role=month-next]').click(() => {
            this.state.current.setMonth(this.state.current.getMonth() - 1);
            this.renderDays();
            this.renderValue();
        });

        this.value.click(() => {
            this.showPanel();
        });
    }

    renderDays() {
        if (!this.days) {
            console.error('date picker: cannot render days becayse this.days is null');
            return;
        }

        // clear out days' children to start
        this.days.children().remove();

        // fill in the empty spots
        const dayOfWeeekStart = this.state.current.getDay();

        for (let i = 0; i < dayOfWeeekStart; i++) {
            const placeholderElem = $('<div></div>');
            this.days.append(placeholderElem);
        }

        // fill in days
        const CONSTANT = 40;
        let currentDateCopy = new Date(this.state.current);
        currentDateCopy.setDate(CONSTANT);
        const daysInMonth = CONSTANT - currentDateCopy.getDate();

        for (let i = 0; i < daysInMonth; i++) {
            let dayDate = new Date(this.state.current);
            dayDate.setDate(i + 1);
            const dayElem = $('<div></div>');
            dayElem.text(`${i + 1}`);
            dayElem.attr('data-value',  i + 1);

            dayElem.click('click', (e) => this.handleDayClick(e));

            if (compareDate(this.state.selected, dayDate)) {
                dayElem.addClass('selected');
            }

            this.days.append(dayElem);
        }

        // fill in extra spaces
        const mod = this.days.children.length % 7;

        for (let i = 0; i < 7 - mod; i++) {
            const placeholderElem = $('<div></div>');
            this.days.append(placeholderElem);
        }

        // render month label
        const monthText = Intl.DateTimeFormat('en-US', { month: 'long' }).format(this.state.current);
        this.controls.children('.month-label').text(`${monthText} ${this.state.current.getFullYear()}`);
    }
}

function compareDate(dateOne, dateTwo) {
    return dateOne && dateTwo &&
        dateOne.getDate() === dateTwo.getDate() &&
        dateOne.getMonth() === dateTwo.getMonth() &&
        dateOne.getYear() === dateTwo.getYear();
}

/**
 * gets a single workflow by id, data passed in through sucess callback
 * @param {int} id 
 * @param {function} sucess 
 */
function getWorkflow(id, sucess) {
    const endpoint = `Workflows/${id}?loadAttributes=expanded$`;

    rockApiRequest({}, endpoint, 'GET', {
        sucess
    });
}

/**
* preforms a request against the rock API
* @param {object} body - the request body
* @param {string} endpoint - the reletave path of the endpoint
* @param {string} method - HTTP verb
* @param {object} options - options for requests, see below
*  - displayErrorBanners: boolean
*  - displaySucessBanners: boolean
*  - sucess: function
*  - failure: function
*/
function rockApiRequest(body, endpoint, method, options) {
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