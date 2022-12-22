import '../../node_modules/normalize.css/normalize.css';
import '../style.css';

export class ModalService {
    constructor(todoService, api) {
        this.api = api;
        this.todoService = todoService;
        this.overlay = document.querySelector('.overlay');
        this.modal = document.querySelector('.modal');

        this.listener = this.close.bind(this);
        document.querySelector('.modal svg').addEventListener('click', this.listener);

        this.submitBtn = document.querySelector('.submit-btn');
        this.submitBtn.addEventListener('click', this._onCreate.bind(this));
    }

    open() {
        this.modal.classList.add('active');
        this.overlay.classList.add('active');
    }

    close() {
        document.forms[0].reset();
        document.getElementsByClassName('form-errors')[0].innerHTML = '';
        this.modal.classList.remove('active');
        this.overlay.classList.remove('active');
    }

    _onCreate(e) {
        e.preventDefault();

        const formData = {};
        const form = document.forms[0];

        Array.from(form.elements)
            .filter((item) => !!item.name)
            .forEach((elem) => {
                formData[elem.name] = elem.value;
            });

        if (!this._validateForm(form, formData)) {
            return;
        }

        this.api.create(formData).then((data) => { //тут API https://jsonplaceholder.typicode.com/ всегда возвращает айди поста 101, я так понимаю, это особенность api
            this.todoService.addTodo(data.id, data.title, data.body, data.userId);
        });

        
        form.reset();
        this.close();
    }

    _validateForm(form, formData) {
        const errors = [];
        
        if (formData.userId > 10 || formData.userId < 1) {
            errors.push('Поле пользователь должно содержать число от 1 до 10');
        }
        if (formData.title.length >= 100) {
            errors.push('Поле наименование должно иметь не более 100 символов');
        }
        if (!formData.body.length) {
            errors.push('Поле описание должно быть заполнено');
        }

        console.log(errors.length);
        if (errors.length) {
            const errorEl = form.getElementsByClassName('form-errors')[0];
            errorEl.innerHTML = errors.map((er) => `<div>${er}</div>`).join('');

            return false;
        }

        return true;
    }
}