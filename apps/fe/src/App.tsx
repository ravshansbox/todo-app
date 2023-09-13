import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentType } from 'react';
import { trpc } from './trpc';
import { httpBatchLink } from '@trpc/client';
import { Todos } from './Todos';

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: import.meta.env.VITE_API_BASE_URL })],
});

export const App: ComponentType = () => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Todos />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
