package gosutaskmanager

class UI {
  var _taskManager = new TaskManager()
  
  function displayMenu() {
    print("Welcome to GosuTaskManager!\n")
    print("--------------------------------\n")
    print("1. Add New Task\n")
    print("2. List All Tasks\n")
    print("3. Mark Task as Completed\n")
    print("4. Delete Task\n")
    print("5. Exit Application\n")
    print("Please enter your choice (1-5): ")
  }

  function start() {
    // Try to get a Console; if null (e.g., in an IDE), use Scanner.
    var console = System.console()
    var scanner = new java.util.Scanner(System.in)
    while(true) {
      displayMenu()
      var choice = console != null ? console.readLine() : scanner.nextLine()
      choice = choice.trim()
      switch(choice) {
        case "1":
          addTaskFlow(console, scanner)
          break
        case "2":
          _taskManager.listTasks()
          break
        case "3":
          markTaskFlow(console, scanner)
          break
        case "4":
          deleteTaskFlow(console, scanner)
          break
        case "5":
          print("Exiting GosuTaskManager. Goodbye!\n")
          return
        default:
          print("Invalid option. Please try again.\n")
      }
    }
  }
  
  private function addTaskFlow(console : java.io.Console, scanner : java.util.Scanner) {
    try {
      var title = getInput("Enter task title: ", console, scanner)
      var description = getInput("Enter task description: ", console, scanner)
      var dueDate = getInput("Enter due date (YYYY-MM-DD): ", console, scanner)
      var priority = getInput("Enter priority (High, Medium, Low): ", console, scanner)
      _taskManager.addTask(title, description, dueDate, priority)
    } catch(e : Exception) {
      print("Error: " + e.Message + "\n")
    }
  }
  
  private function getInput(message: String, console : java.io.Console, scanner : java.util.Scanner): String{
      var input: String
      if (console != null){
        input = console.readLine(message)
      }
      else {
        print(message)
        input = scanner.nextLine()
      }
      return input.trim()
  }
  
  private function markTaskFlow(console : java.io.Console, scanner : java.util.Scanner) {
    try {
      var taskId = Integer.parseInt(getInput("Enter the ID of the task to mark as completed: ", console, scanner))
      _taskManager.markTaskAsCompleted(taskId)
    } catch(e : Exception) {
      print("Error: " + e.Message + "\n")
    }
  }
  
  private function deleteTaskFlow(console : java.io.Console, scanner : java.util.Scanner) {
    try {
      var taskId = Integer.parseInt(getInput("Enter the ID of the task to delete: ",console, scanner))
      _taskManager.removeTaskById(taskId)
    } catch(e : Exception) {
      print("Error: " + e.Message + "\n")
    }
  }
}