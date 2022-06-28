import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
// import { validateRoutes, validateAccessToken } from '@lib/middleware/validate-access-token';

import user from './user';
import plain from '@api/handler';

const IndexRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
  server.register(plain, options);
  server.register(jwt, { secret: process.env.JWT_SECRET as string });
  server.register(user, options);
};

export default fp(IndexRoute);
