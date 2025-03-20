uses gw.lang.reflect.json.Json
uses java.time.LocalDate


var taskManager = new TaskManager()

for (task in taskManager.Tasks){
  print(task)
}

var newTask1 = new Task(4, "Read Book", "Reading Mr Potter", LocalDate.now().toString(), "Low")
var newTask2 = new Task(5, "Read Manhwa", "Reading Duo Levelling", LocalDate.now().toString(), "Low")

taskManager.addTask(newTask1)
taskManager.addTask(newTask2)

for (task in taskManager.Tasks){
  print(task)
}

taskManager.removeTaskById(4)
taskManager.removeTaskById(5)

for (task in taskManager.Tasks){
  print(task)
}
