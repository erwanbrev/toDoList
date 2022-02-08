// on recupere les éléments du DOM

const form = document.querySelector('.form');
const formInput = document.querySelector('.form>input');
const listItems = document.querySelector('.list-items');

let todolist = {
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
    Object.keys(todolist).map(key => createHTML(todolist[key]));
}
window.addEventListener('load', loadHTML);
//? 1ere etape
form.addEventListener('submit', createItem)

function createItem(e) {
    e.preventDefault();
    // console.log(formInput.value);
    createHTML(formInput.value);
    this.reset();
}

function createHTML(todo) {
    if (!todo.todo) return;
    const html = `
    <span>${todo.todo}</span>
    <button name="trash" class="trash">🗑️</button>
    <button class="check">✔️</button>
    `
    const li = document.createElement('li');
    li.classList.add('item');
    li.innerHTML = html;
    // chaque saisie se place au dessus du plus ancien
    listItems.insertBefore(li, listItems.firstChild);
}