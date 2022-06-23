import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { Repository } from 'typeorm';
import { Plain, PlainEntity } from '@entity/plain';
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
  name: string;
}

export class PlainCrudHandler {
  server: FastifyInstance;
  options: FastifyPluginOptions;
  entity: PlainEntity;
  routePath: string;
  routePrefix: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  repository: Repository<any>;
  schema: { GET: object; GET_ID: object; POST: object; PUT: object; DELETE: object };
  constructor(
    server: FastifyInstance,
    options: FastifyPluginOptions,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    entity: PlainEntity
  ) {
    this.server = server;
    this.entity = entity;
    this.routePath = `/${entity.name.toLowerCase()}`;
    this.routePrefix = `${options.prefix}`;
    this.repository = server.db.getRepository(entity);
    this.schema = DEFAULT_SCHEMA(entity.name.toLowerCase());
  }

  protected getOptions = (Schema: object): object => {
    return Object.assign(Schema, { prefix: this.routePrefix });
  };

  protected find = (Schema: object): void => {
    this.server.get(`${this.routePath}`, this.getOptions(Schema), async (request) => {
      const query: requestQuery = <requestQuery>request.query;
      const orderValue = ['ASC'].includes(query.order) ? 'ASC' : 'DESC';
      const dataArray = await this.repository.find({
        skip: query.offset === undefined ? 0 : query.offset,
        take: query.limit === undefined ? 10 : query.limit,
        order: {
          id: orderValue,
        },
      });
      return dataArray;
    });
  };

  protected get = (Schema: object): void => {
    this.server.get(`${this.routePath}/:id`, this.getOptions(Schema), async (request) => {
      const params: requestParams = <requestParams>request.params;
      const data = await this.repository.findBy({ id: Number(params.id) });
      if (data.length > 0) return data[0];
      else {
        throw new Error(`${params.id} does Not Exist`);
      }
    });
  };

  protected create = (Schema: object): void => {
    this.server.post(`${this.routePath}`, this.getOptions(Schema), async (request) => {
      try {
        const data: requestBody = <requestBody>request.body;
        const res = await this.repository.save(data);
        return { data: { id: res.id } };
      } catch (error) {
        this.server?.log.error(error);
      }
    });
  };

  protected update = (Schema: object): void => {
    this.server.put(`${this.routePath}/:id`, this.getOptions(Schema), async (request) => {
      const params: requestParams = <requestParams>request.params;
      const bodyParams: requestBody = <requestBody>request.body;
      const data = await this.repository.findBy({ id: Number(params.id) });
      if (data.length > 0) {
        const myData = data[0];
        Object.assign(myData, { ...bodyParams });
        await this.repository.update(myData.id, myData);
        const updatedData = await this.repository.findBy({ id: myData.id });
        return { data: updatedData };
      } else {
        throw new Error(`${params.id} does Not Exist`);
      }
    });
  };

  protected delete = (Schema: object): void => {
    this.server.delete(`${this.routePath}/:id`, this.getOptions(Schema), async (request) => {
      const params: requestParams = <requestParams>request.params;
      const data = await this.repository.findBy({ id: Number(params.id) });
      if (data.length > 0) {
        const myData = data[0];
        await this.repository.update(myData.id, myData);
        return `${myData.id} is removed`;
      } else {
        throw new Error(`${params.id} does Not Exist`);
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
export const makeRoute = (entity: unknown, handler = PlainCrudHandler) => {
  const route = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    const uris = new handler(server, options, entity as PlainEntity);
    await uris.bindRoute();
  };
  return route;
};

export default makeRoute(Plain);
