"use strict";
var _c, _d;
const errorsMessage = {
    date: {
        format: '{0} format is invalid'
    }
};
const patterns = {
    email: '(.*)@.(gmail|yahoo).com',
    date: '[0-9]{4}-[0-9]{2}-[0-9]{2}'
};
var table = {
    sort: '',
    show: [],
    data: []
};
var selectSubject = [
    'LT Hướng Đối Tượng',
    'Cấu Trúc Dữ Liệu',
    'LT C trên Window',
    'NN CNPM',
    'Trí Tuệ Nhân Tạo',
    'CSDL và Web',
    'CĐ Java',
    'Cơ Sở Dữ Liệu',
    'Hợp Ngữ'
];
var selectedSubject = [];
const serializeForm = (form) => {
    let obj = {};
    for (var key of form.keys()) {
        obj[key] = form.get(key);
    }
    return obj;
};
const submitForm = (event) => {
    console.log(event);
    event.preventDefault();
    const form = new FormData(document.forms[0]);
    const inputs = document.querySelectorAll('input');
    let errors = validations(inputs, ['code', 'name', 'address', 'phone', 'email', 'gender', 'birthdate']);
    showMessage(errors);
    if (!Object.keys(errors).length) {
        remoteAction('index.php', 'post', JSON.stringify({
            "form": serializeForm(form),
            "subjects": selectedSubject
        }))
            .then((response) => {
            response = JSON.parse(response);
            if (response.messages) {
                table.data.push(serializeForm(form));
                createTable(table.data);
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
    return false;
};
const next = () => {
};
const previous = () => {
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
const updateBirthDate = () => {
    interactElement('group-date', (element) => {
        let groupDate = element.querySelectorAll('select, input');
        interactElement('birth-date', (element) => {
            element.value = `${groupDate[2].value}-${groupDate[0].value}-${groupDate[1].value}`;
            console.log(element.value);
        });
    });
};
const valdationEmail = (input, errors, typeError) => {
    let regex = new RegExp(patterns.email);
    if (!regex.test(input.value)) {
        errors[`${input.name}-error`] = formatError(input.name, 'email', typeError);
        return true;
    }
    return false;
};
const validationDate = (input, errors, typeError) => {
    let regex = new RegExp(patterns.date);
    if (!regex.test(input.value)) {
        errors[`${input.name}-error`] = formatError(input.name, 'date', typeError);
        return true;
    }
    ;
    return false;
};
const validations = (inputs, fields) => {
    let errors = {};
    for (let i = 0; i < inputs.length; i++) {
        console.log(inputs[i].name);
        if (fields.includes(inputs[i].name)) {
            if (validationRequired(inputs[i], errors))
                continue;
            else if (inputs[i].type === 'date' && validationDate(inputs[i], errors, 'date'))
                continue;
            else if (inputs[i].type === 'email' && valdationEmail(inputs[i], errors, 'email'))
                continue;
        }
    }
    return errors;
};
const validationRequired = (input, errors, typeError) => {
    if (input.validity.valueMissing) {
        errors[`${input.name}-error`] = `${input.name} is required`;
        return true;
    }
    ;
    return false;
};
const createTable = (data) => {
    const length = data.length < 20 ? data.length : 20;
    const showData = table.show = Array.from({ length: length }, (value, index) => data[index]);
    console.log(data[0]);
    const tableHtml = showData.reduce((init, row) => {
        if (Object.keys(row).length)
            init +=
                `<tr>
                    <td>${row['code']}</td>
                    <td>${row['name']}</td>
                    <td>${row['gender']}</td>
                    <td>${row['birth']}</td>
                </tr>`;
        return init;
    }, '');
    interactElement('content', (element) => {
        element.innerHTML = tableHtml.toString();
    });
};
const initDataTable = (subjects) => {
    remoteAction(`index.php?action=getStudents`, 'get', subjects)
        .then((data) => {
        if (data) {
            table.data = JSON.parse(data);
            createTable(table.data);
        }
    })
        .catch((err) => console.log(err));
};
(_c = document.getElementById('select')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (event) => {
    event.preventDefault();
    const elements = document.querySelectorAll('div[id="select-subjects"] option:checked');
    let chosenOptions = Array.from(elements, (element) => element.value);
    selectSubject = selectSubject.filter((options) => !chosenOptions.includes(options));
    selectedSubject.push(...chosenOptions);
    createSelectSubjectPL(selectSubject);
    createSelectedSubjectPL(selectedSubject);
    initDataTable(selectedSubject);
});
(_d = document.getElementById('selected')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (event) => {
    event.preventDefault();
    const elements = document.querySelectorAll('div[id="selected-subjects"] option:checked');
    let chosenOptions = Array.from(elements, (element) => element.value);
    selectedSubject = selectedSubject.filter((options) => !chosenOptions.includes(options));
    selectSubject.push(...chosenOptions);
    createSelectSubjectPL(selectSubject);
    createSelectedSubjectPL(selectedSubject);
    initDataTable(selectedSubject);
});
const showMessage = (messages) => {
    const feedbacks = document.querySelectorAll('div[id*=error]');
    console.log(feedbacks);
    feedbacks.forEach((feedback) => {
        var _c, _d;
        if (messages[feedback.id]) {
            feedback.textContent = messages[feedback.id];
            (_c = feedback.parentElement) === null || _c === void 0 ? void 0 : _c.classList.add('invalid');
        }
        else {
            feedback.textContent = '';
            (_d = feedback.parentElement) === null || _d === void 0 ? void 0 : _d.classList.remove('invalid');
        }
    });
};
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
const sort = (col, data) => {
    data.sort((a, b) => {
        const _a = data[col].ToUpperCase();
        const _b = data[col].ToUpperCase();
        if (_a < _b)
            return -1;
        else if (_a > _b)
            return 1;
        return 0;
    });
};
const initEventSort = () => {
    document.querySelectorAll('th').forEach((element) => element.addEventListener('click', (event) => {
        const element = event.target;
        sort(element.id.split('-')[0], table.show);
    }));
};
interactElement('group-date', (element) => {
    element.querySelectorAll('select, input[type="text"]').forEach((select) => select.addEventListener('change', updateBirthDate));
});
const formatError = (name, fieldType, errorType) => {
    return errorsMessage[fieldType][errorType].replace('{0}', name);
};
//# sourceMappingURL=registrant.js.map