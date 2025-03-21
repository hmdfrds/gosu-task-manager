package gosutaskmanager

uses java.util.ArrayList
uses java.util.List
uses java.nio.file.Files
uses java.nio.file.Paths
uses java.nio.charset.StandardCharsets
uses gw.lang.reflect.json.Json
uses manifold.api.util.JsonUtil


class TaskManager {
  var _tasks = new ArrayList<Task>()
  var _filePath : String
  
  construct(filePath: String = "tasks.json") {
    _filePath = filePath
    loadTasks()
  }
  
  property get Tasks(): List<Task>{
    return _tasks.copy()
  }
  
  function addTask(title: String, description: String, dueDate: String, priority: String){
    try {
      var task = new Task(getNextId(), title, description, dueDate, priority)
      _tasks.add(task)
      saveTasks()
      print("Task added successfully with ID: ${task.Id}\n")
    } catch(e: Exception) {
      print("Error adding task ${e.Message}\n")
    }
  }
  
  function getTaskById(id: int): Task{
    for (t in _tasks){
      if (t.Id == id){
        return t
      }
    }
    return null
  }
  
  
  function removeTaskById(id: int) {
    var lenBefore = _tasks.size()
    _tasks.removeWhere(\ t -> t.Id == id)
    
    if (lenBefore != _tasks.size() && saveTasks()){
      print("Task ${id} deleted successfully.\n")
    } else {
      print("Task deletion failed.\n")
    }
  }
  
  /**
   * Loads tasks fro mthe JSON file (if it exists) into the in-memory list.
   */
  private function loadTasks(): Boolean{
    try {
        var path = Paths.get(_filePath)
        if (Files.exists(path)){
          var jsonText = new String(Files.readAllBytes(path), StandardCharsets.UTF_8)
          var tasksDyn: Dynamic = Json.fromJson(jsonText)
          for(taskDyn in tasksDyn.value){
            var task = Task.fromMap(taskDyn)
            _tasks.add(task)
          }
        }
        
    } catch (e: Exception){
      print("Error loading tasks: "+ e.Message + "\n")
      return false
    }
    return true
  }
  
  private function saveTasks():Boolean{
    try {
      var jsonArray = new ArrayList<Map<String,Object>>()
      for (task in _tasks){
        jsonArray.add(task.toMap())
      }
      var jsonContent = JsonUtil.toJson(jsonArray)
      Files.write(Paths.get(_filePath), jsonContent.getBytes(StandardCharsets.UTF_8))
    }catch (e: Exception){
      print("Error saving tasks: " +e.Message + "\n")
      return false
    }
    return true
  }
  
  function getNextId(): int{
    var maxId = 0
    for (task in _tasks){
      if (task.Id > maxId){
        maxId = task.Id
      }
    }
    return maxId
  }
  
  function listTasks(){
    if (_tasks.Empty){
      print("No tasks found.\n")
      return
    }
    
    // Sort tasks by due date then by priority
    _tasks.sort( \ a, b -> {
      var cmp = a.DueDate.compareTo(b.DueDate)
      if (cmp != 0){
        return cmp
      }
      var prioOrder = {"High" -> 1, "Medium" -> 2, "Low"-> 3}
      return prioOrder[a.Priority] - prioOrder[b.Priority]
    })
    
    // Print table header
    print("--------------------------------------------------\n")
    print("| ID | Title              | Due Date   | Priority | Status   |\n")
    print("--------------------------------------------------\n")
    
    // Print each task
    for(task in _tasks){
   
      print(String.format("| %2-d | %-18s | %-10s | %-8s |\n",{ String.valueOf(task.Id), task.Title, task.DueDate.toString(), task.Priority, task.Status}))
    }
    print("--------------------------------------------------\n")
  }
  
  function markTaskAsCompleted(taskId: int){
    var found = false
    for (task in _tasks){
      if (task.Id == taskId){
        task.Status = "Completed"
        found = true
        break
      }
    }
    if (found){
      saveTasks()
      print("Task ${taskId} marked as completed.\n")
    } else {
      print("Task with ID ${taskId} not found.\n")
    }
  }
  
}