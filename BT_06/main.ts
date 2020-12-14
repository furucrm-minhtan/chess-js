window.onload = (e: Event) => {
    createSelectSubjectPL(selectSubject);
    createSelectedSubjectPL(selectedSubject);
    initDataTable([]);
    initEventSort();
     interactElement('submit', (element: HTMLElement) => element.addEventListener('click', submitForm));
}