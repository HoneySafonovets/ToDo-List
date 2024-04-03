export { createNotes, tasks, checkLocalStorage, renderTask, addToPage }
import { main } from "./vars.js"

let tasks = [];

function checkLocalStorage() {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) => {
      const renderFrame = renderTask(task)
      addToPage(renderFrame)
    })
  }
}

function createNotes(title, text, titleBegin, textBegin) {
  const newTask = {
    id: Date.now(),
    title: title,
    text: text,
    titleBegin: titleBegin,
    textBegin: textBegin,
  }
  const noteEl = renderTask(newTask)
  noteEl.id = newTask.id

  tasks.push(newTask)

  saveToLocalStorage()
  return noteEl
}

function renderTask(task) {
  const noteEl = document.createElement('div');
  noteEl.className = 'note';
  noteEl.id = task.id;
  noteEl.dataset.parent = 'parent';
  noteEl.innerHTML = `
    <div class="note-header">
      <textarea class="note-title" id="note-title" disabled rows="1" readonly wrap="hard" placeholder="${task.titleBegin}">${task.title}</textarea>
      <input id="note-title-input" class="note-hidden note-title-input" placeholder="${task.titleBegin}" type="text" autocomplete="off" value="${task.title}" spellcheck="false">
      <div class="note-actions">
        <button class="note-edit">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="note-delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
    <textarea id="note-description" rows="15" wrap="hard" readonly class="note-textarea" disabled placeholder="${task.textBegin}">${task.text}</textarea>
    <textarea id="note-textarea" class="note-hidden note-textarea" rows="15" wrap="hard" spellcheck="false" placeholder="${task.textBegin}">${task.text}</textarea>
  `
  
  const editBtn = noteEl.querySelector('.note-edit');
  const delBtn = noteEl.querySelector('.note-delete');
  const titleEl = noteEl.querySelector('#note-title');
  const textEl = noteEl.querySelector('#note-description');
  const textArea = noteEl.querySelector('#note-textarea');
  const titleInput = noteEl.querySelector('#note-title-input');
  

  editBtn.addEventListener('click', () => {
    textEl.classList.toggle('note-hidden');
    titleEl.classList.toggle('note-hidden');
    

    textArea.classList.toggle('note-hidden');
    titleInput.classList.toggle('note-hidden');
    titleInput.focus()
  })
  delBtn.addEventListener('click', (e) => {
    noteEl.remove()
    removeItemLocalStorage(e)
    saveToLocalStorage()
  })
  titleInput.addEventListener('input', (e) => {
    const parentNode = e.target.closest('.note')
    titleEl.innerHTML = e.target.value
    
    const id = Number(parentNode.id)
    const task = tasks.find((task) => task.id === id)
    task.title = titleEl.innerHTML
    task.titleBegin = titleEl.innerHTML
    saveToLocalStorage()
  })
  textArea.addEventListener('input', (e) => {
    const parentNode = e.target.closest('.note')
    textEl.innerHTML = e.target.value
    const id = Number(parentNode.id)
    const task = tasks.find((task) => task.id === id)
    task.text = textEl.innerHTML;
    saveToLocalStorage()
  })

  return noteEl
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeItemLocalStorage(e) {
  const parentNode = e.target.closest('.note')
  const id = Number(parentNode.id)
  tasks = tasks.filter((task) => task.id !== id)
}

function addToPage(el) {
  main.appendChild(el)
}