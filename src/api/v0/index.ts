import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import ping from './ping';
import product from './product';
import plain from '@api/handler';

const IndexRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
  server.register(ping, options);
  server.register(plain, options);
  server.register(product, options);
};

export default fp(IndexRoute);
