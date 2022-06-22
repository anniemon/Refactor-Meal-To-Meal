import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
// import { validateRoutes, validateAccessToken } from '@lib/middleware/validate-access-token';
import fs from 'fs';

import user from './user';
import plain from '@api/handler';

const IndexRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
  server.register(plain, options);
  server.register(user, options);
};

export default fp(IndexRoute);
