import '../../node_modules/normalize.css/normalize.css';
import '../style.css';

export class MainService {

    constructor(todoService, modalService, api) {
        this.modalService = modalService;
        this.api = api;
        this.todoService = todoService;
        document.getElementsByClassName('app');
        this.btnAdd = document.getElementById('addBtn');
        this.btnAdd.addEventListener('click', (e) => this._onOpenModal(e));

        this.btnTogTheme = document.getElementById('togThemeBtn');
        this.btnTogTheme.addEventListener('click', (e) => this._toggleTheme(e));

        if (localStorage.getItem('dark-theme') === 'true') 
        {
            document.body.classList.toggle("dark-theme");
        }

    }

    fetchAllTodo() {
        this.api.fetchAllTodos().then((todos) => {
            todos.forEach((todo) => this.todoService.addTodo(todo.id, todo.title, todo.body, todo.userId)
            );
        });
    }

    _onOpenModal() {
        this.modalService.open();
    }

    _toggleTheme() {
        if (localStorage.getItem('dark-theme') === 'true') 
        {
            localStorage.setItem('dark-theme', 'false');
        }
        else
        {
            localStorage.setItem('dark-theme', 'true');
        }
        
        document.body.classList.toggle("dark-theme");
    }
}