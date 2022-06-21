import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import { Repository, Not } from 'typeorm';
import fp from 'fastify-plugin';
import { Plain, DataState } from '@entity/plain';
import { DEFAULT_SCHEMA } from './schema';

export interface requestQuery {
  offset: number;
  limit: number;
  order: string;
}

export interface requestParams {
  id: string;
}

export interface requestBody {
  type: string;
  state: DataState;
  flags: number;
  code: string;
  name: string;
  description: string;
  extras: JSON;
}

export class PlainCrudHandler {
  server: FastifyInstance;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: any;
  routePrefix: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  repository: Repository<any>;
  schema: { GET: object; GET_ID: object; POST: object; PUT: object; DELETE: object };
  constructor(
    server: FastifyInstance,
    options: FastifyPluginOptions,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    entity: any
  ) {
    this.server = server;
    this.entity = entity;
    this.routePrefix = `${options.prefix}/${entity.name}`;
    this.repository = server.db.getRepository(entity);
    this.schema = DEFAULT_SCHEMA(entity.name);
  }

  protected find = (Schema: object): void => {
    this.server.get(this.routePrefix, Schema, async (request, reply) => {
      try {
        const query: requestQuery = <requestQuery>request.query;
        const orderValue = ['ASC'].includes(query.order) ? 'ASC' : 'DESC';
        const dataArray = await this.repository.find({
          where: {
            state: Not(DataState.DELETED),
          },
          skip: query.offset === undefined ? 0 : query.offset,
          take: query.limit === undefined ? 10 : query.limit,
          order: {
            id: orderValue,
          },
        });
        console.log('query', query);
        return reply.code(200).send(dataArray);
      } catch (error) {
        this.server?.log.error(error);
        return reply.send(500);
      }
    });
  };

  protected get = (Schema: object): void => {
    this.server.get(this.routePrefix + '/:id', Schema, async (request, reply) => {
      try {
        const params: requestParams = <requestParams>request.params;
        const data = await this.repository.findBy({ id: Number(params.id), state: Not(DataState.DELETED) });
        if (data.length > 0) return reply.code(200).send(data[0]);
        else return reply.code(404).send('Not Exist');
      } catch (error) {
        this.server?.log.error(error);
        return reply.send(500);
      }
    });
  };

  protected create = (Schema: object): void => {
    this.server.post(this.routePrefix, Schema, async (request, reply) => {
      try {
        const data: requestBody = <requestBody>request.body;
        await this.repository.save(data);
        return reply.code(200).send(`${data.name} is saved`);
      } catch (error) {
        this.server?.log.error(error);
        return reply.send(500);
      }
    });
  };

  protected update = (Schema: object): void => {
    this.server.put(this.routePrefix + '/:id', Schema, async (request, reply) => {
      try {
        const params: requestParams = <requestParams>request.params;
        const bodyParams: requestBody = <requestBody>request.body;
        const data = await this.repository.findBy({ id: Number(params.id), state: Not(DataState.DELETED) });
        if (data.length > 0) {
          const myData = data[0];
          Object.assign(myData, { ...bodyParams });
          await this.repository.update(myData.id, myData);
          return reply.code(200).send(`${myData.extras} is saved`);
        } else {
          return reply.code(404).send('Not Exist');
        }
      } catch (error) {
        this.server?.log.error(error);
        return reply.send(500);
      }
    });
  };

  protected delete = (Schema: object): void => {
    this.server.delete(this.routePrefix + '/:id', Schema, async (request, reply) => {
      try {
        const params: requestParams = <requestParams>request.params;
        const data = await this.repository.findBy({ id: Number(params.id), state: Not(DataState.DELETED) });
        if (data.length > 0) {
          const myData = data[0];
          myData.state = DataState.DELETED;
          await this.repository.update(myData.id, myData);
          return reply.code(200).send(`${myData.id} is removed`);
        } else {
          return reply.code(404).send('Not Exist');
        }
      } catch (error) {
        this.server?.log.error(error);
        return reply.send(500);
      }
    });
  };

  public bindRoute = async () => {
    try {
      this.find(this.schema.GET);
      this.get(this.schema.GET_ID);
      this.create(this.schema.POST);
      this.update(this.schema.PUT);
      this.delete(this.schema.DELETE);
    } catch (error) {
      console.error(error);
      this.server?.log.error(error);
    }
  };
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeRoute = (entity: any, handler: any = PlainCrudHandler) => {
  const route: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    const uris = new handler(server, options, entity);
    await uris.bindRoute();
  };
  return fp(route);
};

export default makeRoute(Plain);
