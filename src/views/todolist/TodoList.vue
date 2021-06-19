<template>
  <div class="todo-list">
    <TodoListItem
      v-for="todo in todos"
      :key="todo.id"
      @change-state="todo.completed = $event.target.checked"
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
}
</script>

<style>
.todo-list {
  display: grid;
  row-gap: 14px;
}
</style>
