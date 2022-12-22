import '../../node_modules/normalize.css/normalize.css';
import '../style.css';

export class ApiService {

    fetchAllNames() {
        return fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json());
    }

    fetchNamesById(id) {
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => res.json());
    }


    fetchAllTodos() {
        return fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());
    }

    create(data) {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            return res.json();
        });
    }

    update(id, data) {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            return res.json();
        });
    }

    remove(id) {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });
    }
}

