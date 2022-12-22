import '../node_modules/normalize.css/normalize.css';
import './style.css';

import { ApiService } from './js/ApiService.js'
import { TodoService } from './js/TodoService.js'
import { MainService } from './js/MainService.js'
import { ModalService } from './js/ModalService.js'

/*
 * Задание:
 * Реализовать ToDoList приложение которое будет отображать список всех дел
 * Можно: просмотреть список всех дел, добавить todo и удалить, а так же изменить
 */

const api = new ApiService();
const todoService = new TodoService(api);
const modalService = new ModalService(todoService, api);
const service = new MainService(todoService, modalService, api);
service.fetchAllTodo();
