<template>
  <div class="todo-list">
    <TodoListItem
      v-for="todo in todos"
      :key="todo.id"
      @change-state="(e) => setTodoState(e, todo.id)"
      :todo-item="todo"
    >
    </TodoListItem>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem.vue"
export default {
  components: {
    TodoListItem,
  },
  props: ["todos"],
  setup(props) {
    const { todos } = props

    function setTodoState(e, idx) {
      const todo = todos.find(v => v.id === idx)
      todo.completed = e.target.checked
      localStorage.setItem('todos_list', JSON.stringify(todos))
    }
    return {
      setTodoState,
    }
  }
}
</script>

<style>
.todo-list {
  display: grid;
  row-gap: 14px;
}
</style>
