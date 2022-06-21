import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const PingRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
  server.get(options.prefix + '/.ping', async function (request, reply) {
    try {
      return reply.code(200).send('pong');
    } catch (error) {
      return reply.send(500);
    }
  });
};

export default fp(PingRoute);
