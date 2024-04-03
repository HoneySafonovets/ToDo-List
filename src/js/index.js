import { main, noteAdd, } from '../../ToDo List/js/vars.js'
import { tasks, createNotes, checkLocalStorage, renderTask, addToPage } from '../../ToDo List/js/setToLocalStorage.js'

checkLocalStorage()

noteAdd.addEventListener('click', () => {
  const el = createNotes('', '', 'Загаловок', 'Ваш текст...')

  addToPage(el)
})