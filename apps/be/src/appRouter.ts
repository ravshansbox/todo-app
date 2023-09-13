import { todoRouter } from './todoRouter';
import { trpc } from './trpc';

export const appRouter = trpc.router({
  todos: todoRouter,
});

export type AppRouter = typeof appRouter;
