// on recupere les éléments du DOM

const form = document.querySelector('.form');
const formInput = document.querySelector('.form>input');
const listItems = document.querySelector('.list-items');

let todoList = {
    todo1: {
        todo: 'Faire quelque chose'
    },
    todo2: {
        todo: 'Manger'
    },
    todo3: {
        todo: "S'inscrire sur Tinder"
    }
}
// boucler sur l'objet
function loadHTML() {

    if (!window.localStorage.getItem('data')) return;
    const data = JSON.parse(window.localStorage.getItem('data'));
    Object.keys(todoList).map(key => createHTML(todoList[key]));
}
window.addEventListener('load', loadHTML);
//? 1ere etape
form.addEventListener('submit', createItem)

function createItem(e) {
    e.preventDefault();
    const timestamp = Date.now();
    // console.log(timestamp);
    // console.log(formInput.value);
    todoList[timestamp] = {
        todo: formInput.value,
        checked: false
    }
    createHTML(todoList[timestamp], timestamp);
    saveObj();
    this.reset();
}

function createHTML(todo, key) {
    if (!todo.todo) return;
    const html = `
    <span>${todo.todo}</span>
    <button name="trash" class="trash">🗑️</button>
    <button name="check" class="check">${todo.checked ? '🔄' : '✔️'}</button>
    `
    const li = document.createElement('li');
    li.classList.add('item');
    li.setAttribute('data-key', key);
    li.innerHTML = html;
    // chaque saisie se place au dessus du plus ancien
    listItems.insertBefore(li, listItems.firstChild);
    li.children.trash.onclick = toBin;
    li.children.check.onclick = check;
}

function toBin() {
    this.parentNode.remove();
    const key = this.parentNode.getAttribute('data-key');
    delete todoList[key];
    saveObj();
}

function check() {
    this.parentNode.classList.toggle('flip');
    this.innerHTML = this.innerHTML === '✔️' ? "🔄" : "✔️";
    const key = this.parentNode.getAttribute('data-key');
    todoList[key].checked = !todoList[key].checked;
    console.log(todoList[key].checked);
    saveObj();
}

function saveObj() {
    window.localStorage.setItem('data', JSON.stringify(todoList));
}