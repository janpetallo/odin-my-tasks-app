
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

    getTodoList() {
        return this.todoList;
    }
}

export { Project };