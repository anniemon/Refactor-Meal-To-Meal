import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import { port } from '@server';

const getHost = (publicUrl: string) => {
  if (['local', 'test'].includes(process.env.NODE_ENV as string)) return '127.0.0.1';
  const domain = publicUrl;
  return domain.replace(/(^\w+:|^)\/\//, '');
};

const getPort = () => (['local', 'test'].includes(process.env.NODE_ENV as string) ? port : 443);
const getSchemes = () => (['local', 'test'].includes(process.env.NODE_ENV as string) ? 'http' : 'https');

export const swagger: FastifyPluginAsync = fp(async (server: FastifyInstance) => {
  server.register(fastifySwagger, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'testing the fastify swagger api',
        version: '0.1.3',
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
      host: `${getHost('localhost')}:${getPort()}`,
      schemes: [getSchemes()],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    hideUntagged: true,
    exposeRoute: true,
  });
});
