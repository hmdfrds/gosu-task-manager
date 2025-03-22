# GosuTaskManager

## Overview

A simple command-line task management application built in Gosu. This project was created to explore the features of the Gosu language, including its static typing, object-oriented programming, functional constructs, and standard libraries.

## Features

- Add New Task: Create tasks with title, description, due date, priority, and auto-assigned ID.
- List All Tasks: View tasks in a formatted table, sorted by due date and priority.
- Mark Task as Completed: Change a task's status to "Completed".
- Delete Task: Remove tasks by their unique ID.
- Data Persistence: Tasks are saved to and loaded from tasks.json automatically.

## JSON File Structure

Example tasks.json (auto-generated during runtime):

```json
[
  {
    "id": 1,
    "title": "Finish Homework",
    "description": "Complete math exercises",
    "dueDate": "2025-04-01",
    "priority": "High",
    "status": "Pending"
  }
]
```

## Sample CLI Output

```bash
Welcome to GosuTaskManager!
--------------------------------
1. Add New Task  
2. List All Tasks  
3. Mark Task as Completed  
4. Delete Task  
5. Exit Application  

Please enter your choice (1-5):  
```

## License
This project is open-source and free to use under the MIT License.