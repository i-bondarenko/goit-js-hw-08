import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea'),
}

const datesFormForLocalStor = {};
const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

addContentForm();

function onFormInput(event) {
    datesFormForLocalStor[event.target.name] = event.target.value;

    saveCurrentValueInLocalStor(datesFormForLocalStor);
}

function saveCurrentValueInLocalStor(object) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(object));
}

function onFormSubmit(event) {
    event.preventDefault();

    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function addContentForm() {
    const valueKeyOfLocalStor = localStorage.getItem(STORAGE_KEY);

    if (valueKeyOfLocalStor) {
        const parseValueKey = JSON.parse(valueKeyOfLocalStor);

        Object.entries(parseValueKey).forEach(([name, value]) => {
            datesFormForLocalStor[name] = value;
            refs.form.elements[name].value = value;
        });

        // refs.input.value = parseValueKey.email;
        // refs.textarea.value = parseValueKey.message;
    }
}
