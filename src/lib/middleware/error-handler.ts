import { FastifyError, FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const errorHandler: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.setErrorHandler(async (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    server?.log.error(error);
    reply.status(500).send(Object.assign(error, { code: '500' }));
  });
};
/* example
{
  "statusCode": 404,
  "code": "404",
  "error": "Not Found",
  "message": "0 is not exist"
}
*/
export default fp(errorHandler);
