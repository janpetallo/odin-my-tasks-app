
class Project {
    constructor(name) {
        this.name = name;
        this.todoList = [];
    }

    addTodoItem(todoItem) {
        this.todoList.push(todoItem);
    }

    removeTodoItem(todoItem) {
        this.todoList = this.todoList.filter(item => 
            item !== todoItem 
        ); 
    }
}

export { Project };