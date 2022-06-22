import { FastifyRequest, FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

interface ServerRequest extends FastifyRequest {
  locals: object;
}

const addHookLocals: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.decorateRequest('locals', null);
  server.addHook('onRequest', async (req) => {
    (req as ServerRequest).locals = {};
  });
};
export default fp(addHookLocals);
