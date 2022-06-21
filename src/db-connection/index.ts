import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import AppDataSource from '@data-source';

export const db = fp(async (server: FastifyInstance) => {
  try {
    const dataSource = await AppDataSource.initialize();
    server.decorate('db', dataSource);
    server.addHook('onClose', async () => {
      await dataSource.destroy();
    });
  } catch (error) {
    server.log.error(error);
  }
});
