import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './appRouter';

const { HTTP_PORT = '80' } = process.env; // will spin up on 80 on prod

const server = createHTTPServer({
  router: appRouter,
});

const { port } = server.listen(parseInt(HTTP_PORT)); // port here is optional and will be random if not provided

console.info(`Listening on port ${port}`);
