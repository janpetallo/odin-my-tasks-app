import { compareAsc } from "date-fns";

class Project {
  constructor(name) {
    this.name = name;
    this.todoList = [];
  }

  addTodoItem(todoItem) {
    this.todoList.push(todoItem);
    this.sortTodoList();
  }

  removeTodoItem(todoItem) {
    this.todoList = this.todoList.filter((item) => item !== todoItem);
  }

  getTodoList() {
    return this.todoList;
  }

  sortTodoList() {
    this.todoList.sort((a, b) =>
      compareAsc(new Date(a.dueDate), new Date(b.dueDate))
    );
  }
}

export { Project };
