import '../../node_modules/normalize.css/normalize.css';
import '../style.css';

export class ModalServiceUpd{
    _card;
    constructor(todoService, api) {
        this.api = api;
        this.todoService = todoService;
        this.overlay = document.querySelector('.overlay');
        this.modal = document.querySelector('.modalUpd');

        this.listener = this.close.bind(this);
        document.querySelector('.modalUpd svg').addEventListener('click', this.listener);

        this.submitBtn = document.querySelector('.submit-btn-upd');
        this.submitBtn.addEventListener('click', this._onUpdate.bind(this));
    }

    open(card) {
        this.modal.classList.add('active');
        this.overlay.classList.add('active');

        this._card = card;
        document.querySelector('.modal__title-id').innerText = this._card.cardId;
        
        const form = document.forms[1];

        form.elements[0].value = card.cardUserId;
        form.elements[1].value = card.childNodes[0].childNodes[2].innerText;
        form.elements[2].value = card.childNodes[1].innerText;

    }

    close() {
        document.getElementsByClassName('formUpd-errors')[0].innerHTML = '';
        document.forms[1].reset();
        this.modal.classList.remove('active');
        this.overlay.classList.remove('active');
    }

    _onUpdate(e) {

        const formData = {id: this._card.cardId};
        const form = document.forms[1];

        Array.from(form.elements)
            .filter((item) => !!item.name)
            .forEach((elem) => {
                formData[elem.name.slice(0,-3)] = elem.value;
            });

        if (!this._validateFormUpd(form, formData)) {
            return;
        }
   
        this.api.update(this._card.cardId, formData).then((data) => {
            this.todoService.updateTodo(this._card, data.title, data.body, data.userId);
        });

        form.reset();
        this.close();
    }

    _validateFormUpd(form, formData) {
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
        
        if (errors.length) {
            const errorEl = form.getElementsByClassName('formUpd-errors')[0];
            errorEl.innerHTML = errors.map((er) => `<div>${er}</div>`).join('');

            return false;
        }

        return true;
    }
}