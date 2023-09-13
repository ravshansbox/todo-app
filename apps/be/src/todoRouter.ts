import { z } from 'zod';
import { trpc } from './trpc'; // let's implement todos api

type Todo = {
  id: number;
  description: string;
  isCompleted: boolean;
};

// this is just a dummy todo array
const todos: Todo[] = [{ id: 1, description: 'Buy some milk', isCompleted: false }];

// can be an async function
const listTodos = trpc.procedure.query(() => {
  return todos;
});

// this is a mutation
const addTodo = trpc.procedure
  .input(z.object({ description: z.string() }))
  .mutation(({ input }) => {
    // input signature is inferred from zod schema
    const id = Math.max(...todos.map((todo) => todo.id)) + 1;
    // by default a todo is incomplete
    const todo: Todo = { id, description: input.description, isCompleted: false };
    // let's push this into the todos array
    todos.push(todo);
    // let's return new todo back
    return todo;
  });

// now let's implement toggle todo
const toggleTodo = trpc.procedure.input(z.object({ id: z.number() })).mutation(({ input }) => {
  // let's find the todo we want to toggle
  const todo = todos.find((todo) => todo.id === input.id); // love this type system
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
  }
  return todo;
});

// we also can refactor every api into it's own file
export const todoRouter = trpc.router({
  listTodos,
  addTodo,
  toggleTodo,
});
