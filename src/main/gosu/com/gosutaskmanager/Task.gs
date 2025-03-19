package com.gosutaskmanager
uses java.time.LocalDate
uses java.time.format.DateTimeFormatter
uses java.time.format.DateTimeParseException

/**
 * Represents a task with an ID, title, description due date, priority, and status.
 */
class Task {

  var _id: int
  var _title: String
  var _description: String
  var _dueDate: LocalDate
  var _priority: String // High, Medium, Low
  var _status: String = "Pending"
  
  /**
   * Construct a new Task.
   * 
   * @param id the unique identifier
   * @param title the task title (non-empty)
   * @param description a detailed description
   * @param dueDate the due date as a string in "YYYY-MM-DD" format; must not be in the past
   * @param priority the priority ("High", "Medium", "Low")
   */
  construct(id : int, title: String, description: String, dueDate: String, priority: String) {
    if (title == null || title.trim().length() == 0) {
      throw new IllegalArgumentException("Title cannot be empty.")
    }
    // Validate date format and that it's not in the past.
    try {
      var formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
      var parsedDate = LocalDate.parse(dueDate, formatter)
      if (parsedDate.isBefore(LocalDate.now())) {
        throw new IllegalArgumentException("Due date cannot be in the past.")
      } 
      _dueDate = parsedDate
    } catch(e: DateTimeParseException) {
      throw new IllegalArgumentException("Invalid date format. Use YYYY-MM-DD.")
    }
    // Validate priority (case insensitive, but store with first letter uppercase)
    var capPriority = priority.toLowerCase().capitalize()
    var validPriorities = { "High", "Medium", "Low" }
    if (!validPriorities.contains(capPriority)) {
      throw new IllegalArgumentException("Priority must be High, Medium, or Low.")
    }
    
    _id = id
    _title = title
    _description = description
    _priority = capPriority
  }
  
  property get Id(): int{ return _id }
  property get Title(): String{ return _title }
  property get Description(): String { return _description }
  property get DueDate(): LocalDate { return _dueDate }
  property get Priority(): String { return _priority }
  property get Status(): String { return _status }
  
  property set Status(newStatus: String) {
    _status = newStatus
  }
  
  /**
   * Returns a Map representation of the task for JSON serialization.
   */
   function toMap() : Map<String,Object> {
     return {
       "id"-> _id,
       "title" -> _title,
       "description" -> _description,
       "dueDate" -> _dueDate,
       "priority" -> _priority,
       "status" -> _status
     }
   }
  
  /**
   * Creates a Task instance from a Map.
   * 
   * @Param data the map of task properties
   * @return a Task object
   */
   static function fromMap(data: Map<String, Object>): Task{
     var task = new Task(
     data.get("id") as int,
     data.get("title") as String,
     data.get("description") as String,
     data.get("dueDate") as String,
     data.get("priority") as String
     )
     task.Status = data.get("status") as String
     return task
   }
   
}