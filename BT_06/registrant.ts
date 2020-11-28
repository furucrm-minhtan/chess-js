const errorsMessage: Object = {
    date: {
        format: '{0} format is invalid'
    }
}
const patterns = {
    email: '(.*)@.(gmail|yahoo).com'
}

let selectSubject: Array<string> = [
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
let selectedSubject: Array<string> = [];


window.onload = (e: Event) => {

    const submitForm = (event: Event) => {
        console.log(event);
        event.preventDefault();

        const form = new FormData(document.forms[0]);
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input');

        let errors: Object = validations(inputs, ['code', 'name', 'address', 'phone', 'email', 'gender', 'birthdate']);
        showMessage(errors);

        if (!Object.keys(errors).length) {
            remoteAction('index.php', 'post', form)
                .then((response: string) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        return false;
    }
    
    const remoteAction = (url: string, type: 'get' | 'post', data: any) => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open(type, url);
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) 
                    resolve(request.response);
            }
            request.onerror = () => {
                if (request.readyState === 4) reject(request.response); 
            }
            if (type === 'post') request.send(data);
            else request.send();
        });
    }

    const updateBirthDate = (): void => {
        let date = '';
        interactElement('group-date', (element: HTMLElement) => {
            element.querySelectorAll('select').forEach((select: HTMLSelectElement, i: number) => {
                date += select.value + (i == 2) ? '' : '/';
            });
        });
        interactElement('birth-date', (element: HTMLInputElement) => {
            element.value = date;
        });
    }

    const formatError = (name: string, fieldType: string, errorType: string) => {
        return errorsMessage[fieldType][errorType].replace('{0}', name);
    }

    const valdationEmail = (input: HTMLInputElement, errors: Object, typeError: string): boolean => {
        let regex = new RegExp(patterns.email);
        if (!regex.test(input.value)) {
            errors[`${input.name}-error`] = formatError(input.name, 'email', typeError);
            return true;
        }
        return false
    }
    
    const validationDate = (input: HTMLInputElement, errors: Object, typeError: string): boolean => {
        let regex = new RegExp(patterns.email);
        if (!regex.test(input.value)) {
            errors[`${input.name}-error`] = formatError(input.name, 'date', typeError);
            return true;
        };
        return false;
    }

    const validations = (inputs: NodeListOf<HTMLInputElement>, fields: Array<string>): Object => {
        let errors: Object = {};
        for (let i = 0; i < inputs.length; i++) {
            console.log(inputs[i].name);
            if (fields.includes(inputs[i].name)) {
                if (validationRequired(inputs[i], errors)) continue;
                else if (inputs[i].type === 'date' && validationDate(inputs[i], errors, 'date')) continue;
                else if (inputs[i].type === 'email' && valdationEmail(inputs[i], errors, 'email')) continue;
            }

        }
        return errors;    
    }

    const validationRequired = (input: HTMLInputElement, errors: Object, typeError?: string): boolean => {
        if (input.validity.valueMissing) {
            errors[`${input.name}-error`] = `${input.name} is required`
            return true;
        };
        return false;
    }

    console.log(document.querySelectorAll('input[type="text"], input:checked[type="radio"]'));
    const createTable = (data: Object[]) => {
        const length = data.length < 20 ? data.length : 20;
        const showData = Array.from({ length: length }, (value: string, index: number) => data[index]);
        const table: Object = showData.reduce((init: string, row: Object) => 
        {   
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
        interactElement('content', (element: HTMLElement) => {
            element.innerHTML = table.toString();
        });
    }

    const initDataTable = () => {
        remoteAction(`index.php?action=getStudents`, 'get', undefined)
            .then((data: any) => {
                if (data) createTable(JSON.parse(data));
            })
            .catch((err: string) => console.log(err));
    };

    document.getElementById('select')?.addEventListener('click', (event: Event) => {
        event.preventDefault();

        const elements = document.querySelectorAll('div[id="select-subjects"] option:checked');
        let chosenOptions = Array.from(elements, (element: HTMLOptionElement) => element.value);
        selectSubject = selectSubject.filter((options: string) => !chosenOptions.includes(options));
        selectedSubject.push(...chosenOptions);

        createSelectSubjectPL(selectSubject);
        createSelectedSubjectPL(selectedSubject);
    });

    document.getElementById('selected')?.addEventListener('click', (event: Event) => {
        event.preventDefault();

        const elements = document.querySelectorAll('div[id="selected-subjects"] option:checked');
        let chosenOptions = Array.from(elements, (element: HTMLOptionElement) => element.value);
        selectedSubject = selectedSubject.filter((options: string) => !chosenOptions.includes(options));
        selectSubject.push(...chosenOptions);

        createSelectSubjectPL(selectSubject);
        createSelectedSubjectPL(selectedSubject);
    });

    const showMessage = (messages: Object) => {
        const feedbacks: NodeListOf<HTMLElement> = document.querySelectorAll('div[id*=error]');
        console.log(feedbacks);
        feedbacks.forEach((feedback: HTMLElement) => {
            if (messages[feedback.id]) {
                feedback.textContent = messages[feedback.id];
                feedback.parentElement?.classList.add('invalid');
            }
            else {
                feedback.textContent = '';
                feedback.parentElement?.classList.remove('invalid');
            }
        });
    }
    
     const interactElement = (id: string, callback: Function) => {
        if (!id) return;
        let element = document.getElementById(id);
        if (element) callback(element);
    }  
    
    const createPicklist = (element: HTMLElement, options: Array<string>) => {
        const html = `<select class="picklist" multiple="true" size="8" onchange>${options.reduce((init: string, option: string) => init+=`<option value="${option}">${option}</option>`, '')}</select>`;

        element.innerHTML = html;
    }

    const createSelectSubjectPL = (options: Array<string>) => {
        interactElement('select-subjects', (element: HTMLElement) => createPicklist(element, options));
    }

    const createSelectedSubjectPL = (options: Array<string>) => {
        interactElement('selected-subjects', (element: HTMLElement) => createPicklist(element, options));
    }

    const sort = (col: string, data: Object[]) => {
        data.sort((a: Object, b: Object) => {
            const _a = data[col].ToUpperCase();
            const _b = data[col].ToUpperCase();

            if (_a < _b) return -1;
            else if (_a > _b) return 1;
            return 0;
        })
    }

    // const initEventSort = ()

    interactElement('group-date', (element: HTMLElement) => {
        element.querySelectorAll('select, input[type="text"]').forEach((select: HTMLSelectElement) => select.addEventListener('change', updateBirthDate));
    });
    interactElement('submit', (element: HTMLElement) => element.addEventListener('click', submitForm));
    initDataTable();
    createSelectSubjectPL(selectSubject);
    createSelectedSubjectPL(selectedSubject);
}
