import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@todo-app/be/src/appRouter'; // bundler knows that we don't use anything from this module

export const trpc = createTRPCReact<AppRouter>();
