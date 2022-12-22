import '../../node_modules/normalize.css/normalize.css';
import '../style.css';

import { ModalServiceUpd } from './ModalServiceUpd.js'

export class TodoService {
    toToList;

    constructor(api) {
        this.api = api;
        this.toToList = window.document.querySelector('.todo-list');
        this._handleUpdate = this._handleUpdate.bind(this);
        this._handleRemove = this._handleRemove.bind(this);
        
        this.modalServiceUpd = new ModalServiceUpd(this, api);
    }

    addTodo(number, title, body, userId) {
        this.toToList.append(this._createTodo(number, title, body, userId));
    }

    _createTodo(number, title, body, userId) {
        const container = document.createElement('div');
        container.classList.add('todo-list__item');
        container.cardId = number;
        container.cardUserId = userId;
        container.classList.add('card');
        const header = document.createElement('div');
        header.classList.add('card__header');
        const content = document.createElement('div');
        content.classList.add('card__content');

        const numberEl = document.createElement('h3');
        numberEl.append(document.createTextNode('#'+number));
        numberEl.classList.add('card__number');

        const userIdEl = document.createElement('h3');
        this.api.fetchNamesById(userId).then((result) => userIdEl.append(document.createTextNode('User: '+ result.username)));

        userIdEl.classList.add('card__userId');

        const titleEl = document.createElement('h3');
        titleEl.append(document.createTextNode(title));
        titleEl.classList.add('card__title');

        content.append(document.createTextNode(body));
        content.classList.add('card__body');

        const btnEl2 = document.createElement('button');
        btnEl2.append(document.createTextNode('E'));
        btnEl2.classList.add('card__remove');

        const btnEl = document.createElement('button');
        btnEl.append(document.createTextNode('x'));
        btnEl.classList.add('card__remove');

        const bntsContainer = document.createElement('div');
        bntsContainer.append(btnEl2);
        bntsContainer.append(btnEl);
        
        header.append(numberEl);
        header.append(userIdEl);
        header.append(titleEl);
        header.append(bntsContainer);

        container.append(header);
        container.append(content);
        btnEl2.addEventListener('click', this._handleUpdate);
        btnEl.addEventListener('click', this._handleRemove);
        
        return container;
    }

    updateTodo(card, title, body, userId) {
        card.childNodes[0].childNodes[2].innerText = title;
        card.childNodes[1].innerText = body;

        this.api.fetchNamesById(userId).then((result) => card.childNodes[0].childNodes[1].innerText = 'User: '+ result.username);
    }

    _handleUpdate(event) {
        const card = event.target.parentElement.parentElement.parentElement;
        this.modalServiceUpd.open(card);
    }

    _handleRemove(event) {
        const card = event.target.parentElement.parentElement.parentElement;
        this.api.remove(card.cardId).then((res) => {
            if (res.status >= 200 && res.status <= 300) {
                event.target.removeEventListener('click', this._handleRemove);
                card.remove();
            }
        });
    }
}