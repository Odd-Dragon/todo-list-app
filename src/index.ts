//This code I saved from when I was using the bundler to make this- I just thought it was fun
import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });
//This is the beginning of the actual project- starting off strong with a custom type for later
type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}
//The two console.log lines were things included in the tutorial to make sure everything worked properly
//console.log("Hi")
import { v4 as uuidV4 } from "uuid";
//console.log(uuidV4())
const list= document.querySelector<HTMLUListElement>("#list");
const form= document.getElementById("#new-task-form") as HTMLFormElement | null;
const input= document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = []
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()
  loadTasks()
  if(input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask)

  addListItem(newTask)
  input.value = ""
})

/*Something in this function is not working.
I've done a lot of troubleshooting (and 
comparing to other code- it all matches,
which is maddening) to try to figure 
out why, but it's just not... doing what 
it's supposed to. I'm stumped, and this 
needs to be turned in, so this is what I have. */
function addListItem(task : Task){
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    console.log(tasks)
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return[]
  return JSON.parse(taskJSON)
}