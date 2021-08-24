
import { onMounted, ref } from "vue";

export default function useTodos() {
  const todos = ref([]);

  // 添加 todo
  const addTodo = (todo) => {
    todos.value.push(todo)
    localStorage.setItem('todos_list', JSON.stringify(todos.value))
  };

  // 获取远程 todos
  const fetchTodos = async () => {
    const list = JSON.parse(localStorage.getItem('todos_list')) || []
    todos.value = list
  };

  // onMounted(() => {
    fetchTodos();
  // });

  return {
    todos,
    addTodo,
  };
}
