"use strict";
const errorsMessage = {
    date: {
        format: '{0} format is invalid'
    }
};
const patterns = {
    email: '(.*)@.(gmail|yahoo).com'
};
let selectSubject = [
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
let selectedSubject = [];
window.onload = (e) => {
    var _c, _d;
    const submitForm = (event) => {
        console.log(event);
        event.preventDefault();
        const form = new FormData(document.forms[0]);
        const inputs = document.querySelectorAll('input');
        let errors = validations(inputs, ['code', 'name', 'address', 'phone', 'email', 'gender', 'birthdate']);
        showMessage(errors);
        if (!Object.keys(errors).length) {
            remoteAction('index.php', 'post', form)
                .then((response) => {
                console.log(response);
            })
                .catch((error) => {
                console.log(error);
            });
        }
        return false;
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
        let date = '';
        interactElement('group-date', (element) => {
            element.querySelectorAll('select').forEach((select, i) => {
                date += select.value + (i == 2) ? '' : '/';
            });
        });
        interactElement('birth-date', (element) => {
            element.value = date;
        });
    };
    const formatError = (name, fieldType, errorType) => {
        return errorsMessage[fieldType][errorType].replace('{0}', name);
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
        let regex = new RegExp(patterns.email);
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
    console.log(document.querySelectorAll('input[type="text"], input:checked[type="radio"]'));
    const createTable = (data) => {
        const length = data.length < 20 ? data.length : 20;
        const showData = Array.from({ length: length }, (value, index) => data[index]);
        const table = showData.reduce((init, row) => {
            if (row)
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
            element.innerHTML = table.toString();
        });
    };
    const initDataTable = () => {
        remoteAction(`index.php?action=getStudents`, 'get', undefined)
            .then((data) => {
            if (data)
                createTable(JSON.parse(data));
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
    });
    (_d = document.getElementById('selected')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (event) => {
        event.preventDefault();
        const elements = document.querySelectorAll('div[id="selected-subjects"] option:checked');
        let chosenOptions = Array.from(elements, (element) => element.value);
        selectedSubject = selectedSubject.filter((options) => !chosenOptions.includes(options));
        selectSubject.push(...chosenOptions);
        createSelectSubjectPL(selectSubject);
        createSelectedSubjectPL(selectedSubject);
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
    // const initEventSort = ()
    interactElement('group-date', (element) => {
        element.querySelectorAll('select, input[type="text"]').forEach((select) => select.addEventListener('change', updateBirthDate));
    });
    interactElement('submit', (element) => element.addEventListener('click', submitForm));
    initDataTable();
    createSelectSubjectPL(selectSubject);
    createSelectedSubjectPL(selectedSubject);
};
//# sourceMappingURL=registrant.js.map