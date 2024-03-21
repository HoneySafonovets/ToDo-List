import { main, noteAdd, } from './vars.js'
import { tasks, createNotes, checkLocalStorage, renderTask, addToPage } from './setToLocalStorage.js'

checkLocalStorage()
// localStorage.clear()

noteAdd.addEventListener('click', () => {
  const el = createNotes('Заголовок', 'Ваш текст...')

  addToPage(el)
})