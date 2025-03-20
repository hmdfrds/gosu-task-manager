package com.gosutaskmanager

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
  
  function addTask(task: Task): Boolean{
    // Duplicate Id check
    if (_tasks.firstWhere(\ t -> t.Id == task.Id) != null){
      return false
    }
    _tasks.add(task)
    return saveTasks()
  }
  
  function getTaskById(id: int): Task{
    for (t in _tasks){
      if (t.Id == id){
        return t
      }
    }
    return null
  }
  
  function updateTask(task: Task): Boolean{
    var taskIndex = -1
    // Find task in the list
    for (i in 0.._tasks.size()-1){
      if (_tasks[i].Id == task.Id){
        taskIndex = i
      }
    }
    if (taskIndex == -1){
      return false
    }
    // Just replace the element with a new one
    _tasks[taskIndex] = task
    return saveTasks()
  }
  
  function removeTaskById(id: int): Boolean {
    var lenBefore = _tasks.size()
    _tasks.removeWhere(\ t -> t.Id == id)
    return lenBefore != _tasks.size() && saveTasks()
  }
  
  /**
   * Loads tasks fro mthe JSON file (if it exists) into the in-memory list.
   */
  function loadTasks(): Boolean{
    try {
        var path = Paths.get(_filePath)
        if (Files.exists(path)){
          print("File Exists")
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
  
  function saveTasks():Boolean{
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
  
  
}