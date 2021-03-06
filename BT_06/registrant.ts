const errorsMessage: Object = {
    date: {
        format: '{0} format is invalid'
    }
}
let selectSubject: Array<string> = ['test 1', 'test 2', 'test 3'];
let selectedSubject: Array<string> = [];


window.onload = (e: Event) => {
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

    const validationsRequired = (inputs: NodeListOf<HTMLInputElement>, fields: Array<string>): Object => {
        let errors: Object = {};
        for (let i = 0; i < inputs.length; i++) {
            if(fields.includes(inputs[i].name) && inputs[i].validity.valueMissing) errors[inputs[i].name] = `${inputs[i].name} is required`;
        }
        return errors;    
    }

    const formatError = (name: string, fieldType: string, errorType: string) => {
        return errorsMessage[fieldType][errorType].replace('{0}', name);
    }

    const validationsDate = (inputs: NodeListOf<HTMLInputElement>, errors: Object, typeError: string) => {
        inputs.forEach((input: HTMLInputElement) => {
            if(input.type === 'date' && input.validity.patternMismatch) errors[input.name] = formatError(input.name, 'date', typeError);
        });
        return errors;
    }

    const submitForm = (event: Event) => {
        const form = new FormData(document.forms[0]);
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input');

        //let error: string[] = validationsRequired(inputs, []);
        
    }
    
    const createTable = (data: Object[]) => {
        const element = document.getElementById('table');
        data.reduce((init: string, row: Object) => init += `<tr>
            <td>${row['name']}</td>
            <td>${row['email']}</td>
        </tr>` , '');
    }

    const initDataTable = () => {
        remoteAction(`index.php?action=getStudents`, 'get', undefined)
            .then((data: any) => {
                console.log(data);
                if (data) createTable(JSON.parse(data));
            })
            .catch((err: string) => console.log(err));
    };

    createSelectSubjectPL(selectSubject);
    createSelectedSubjectPL(selectedSubject);

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
    initDataTable();
}
