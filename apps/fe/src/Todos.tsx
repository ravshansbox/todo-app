import { ComponentType } from 'react';
import { trpc } from './trpc';
// let's implement all functionality

export const Todos: ComponentType = () => {
  // let's use trpc query now
  const todos = trpc.todos.listTodos.useQuery();
  const addTodo = trpc.todos.addTodo.useMutation({
    onSuccess: () => todos.refetch(),
  });
  // let's implement toggle now
  const toggleTodo = trpc.todos.toggleTodo.useMutation({
    onSuccess: () => todos.refetch(),
  });

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.data?.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                cursor: 'pointer',
                textDecorationLine: todo.isCompleted ? 'line-through' : undefined,
              }}
              onClick={() => {
                toggleTodo.mutate({ id: todo.id });
              }}
            >
              {todo.description}
            </span>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const description = formData.get('description'); // this is null or string or a file
          if (typeof description === 'string') {
            // ts assertion
            addTodo.mutate({ description }); // we need to refresh the list after this
          }
          // let's reset the form
          event.currentTarget.reset();
        }}
      >
        <input name="description" />
        <button type="submit">Add</button>
      </form>
    </>
  );
};
