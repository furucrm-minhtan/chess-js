"use strict";
window.onload = (e) => {
    createSelectSubjectPL(selectSubject);
    createSelectedSubjectPL(selectedSubject);
    initDataTable([]);
    initEventSort();
    interactElement('submit', (element) => element.addEventListener('click', submitForm));
};
//# sourceMappingURL=main.js.map