"use strict";
const errorsMessage = {
    date: {
        format: '{0} format is invalid'
    }
};
let selectSubject = ['test 1', 'test 2', 'test 3'];
let selectedSubject = [];
window.onload = (e) => {
    var _a, _b;
    const interactElement = (id, callback) => {
        if (!id)
            return;
        let element = document.getElementById(id);
        if (element)
            callback(element);
    };
    const createPicklist = (element, options) => {
        const html = `<select class="picklist" multiple="true" size="8" onchange>${options.reduce((init, option) => init += `<option value="${option}">${option}</option>`, '')}</select>`;
        element.innerHTML = html;
    };
    const createSelectSubjectPL = (options) => {
        interactElement('select-subjects', (element) => createPicklist(element, options));
    };
    const createSelectedSubjectPL = (options) => {
        interactElement('selected-subjects', (element) => createPicklist(element, options));
    };
    const remoteAction = (url, type, data) => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open(type, url);
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200)
                    resolve(request.response);
            };
            request.onerror = () => {
                if (request.readyState === 4)
                    reject(request.response);
            };
            if (type === 'post')
                request.send(data);
            else
                request.send();
        });
    };
    const validationsRequired = (inputs, fields) => {
        let errors = {};
        for (let i = 0; i < inputs.length; i++) {
            if (fields.includes(inputs[i].name) && inputs[i].validity.valueMissing)
                errors[inputs[i].name] = `${inputs[i].name} is required`;
        }
        return errors;
    };
    const formatError = (name, fieldType, errorType) => {
        return errorsMessage[fieldType][errorType].replace('{0}', name);
    };
    const validationsDate = (inputs, errors, typeError) => {
        inputs.forEach((input) => {
            if (input.type === 'date' && input.validity.patternMismatch)
                errors[input.name] = formatError(input.name, 'date', typeError);
        });
        return errors;
    };
    const submitForm = (event) => {
        const form = new FormData(document.forms[0]);
        const inputs = document.querySelectorAll('input');
        //let error: string[] = validationsRequired(inputs, []);
    };
    const createTable = (data) => {
        const element = document.getElementById('table');
        data.reduce((init, row) => init += `<tr>
            <td>${row['name']}</td>
            <td>${row['email']}</td>
        </tr>`, '');
    };
    const initDataTable = () => {
        remoteAction(`index.php?action=getStudents`, 'get', undefined)
            .then((data) => {
            console.log(data);
            if (data)
                createTable(JSON.parse(data));
        })
            .catch((err) => console.log(err));
    };
    createSelectSubjectPL(selectSubject);
    createSelectedSubjectPL(selectedSubject);
    (_a = document.getElementById('select')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
        event.preventDefault();
        const elements = document.querySelectorAll('div[id="select-subjects"] option:checked');
        let chosenOptions = Array.from(elements, (element) => element.value);
        selectSubject = selectSubject.filter((options) => !chosenOptions.includes(options));
        selectedSubject.push(...chosenOptions);
        createSelectSubjectPL(selectSubject);
        createSelectedSubjectPL(selectedSubject);
    });
    (_b = document.getElementById('selected')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (event) => {
        event.preventDefault();
        const elements = document.querySelectorAll('div[id="selected-subjects"] option:checked');
        let chosenOptions = Array.from(elements, (element) => element.value);
        selectedSubject = selectedSubject.filter((options) => !chosenOptions.includes(options));
        selectSubject.push(...chosenOptions);
        createSelectSubjectPL(selectSubject);
        createSelectedSubjectPL(selectedSubject);
    });
    initDataTable();
};
//# sourceMappingURL=registrant.js.map