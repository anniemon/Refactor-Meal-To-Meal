export const GET = (entityName: string) => {
  return {
    schema: {
      description: `test ${entityName} api`,
      tags: [`${entityName}`],
      summary: `get ${entityName} array`,
      security: [{ apiKey: [] }],
      params: {},
      response: {
        201: {
          description: 'Succesful response',
          type: 'array',
          properties: {
            id: { type: 'number' },
            type: { type: 'string' },
            state: { type: 'string' },
            flags: { type: 'number' },
            code: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            extras: { type: 'object' },
          },
        },
        /*
        default: {
          description: 'Default response',
          type: 'array',
          properties: {},
        },
        */
      },
    },
  };
};

export const GET_ID = (entityName: string) => {
  return {
    schema: {
      description: `test ${entityName} api`,
      tags: [`${entityName}`],
      summary: `get ${entityName} object`,
      security: [{ apiKey: [] }],
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: `${entityName} id`,
          },
        },
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            type: { type: 'string' },
            state: { type: 'string' },
            flags: { type: 'number' },
            code: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            extras: { type: 'object' },
          },
        },
        /*
        default: {
          description: 'Default response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            type: { type: 'string' },
            state: { type: 'string' },
            flags: { type: 'number' },
            code: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            extras: { type: 'object' },
          },
        },
        */
      },
    },
  };
};

export const POST = (entityName: string) => {
  return {
    schema: {
      description: `test ${entityName} api`,
      tags: [`${entityName}`],
      summary: `post ${entityName} object`,
      security: [{ apiKey: [] }],
      params: {},
      body: {
        type: 'object',
        properties: {
          type: { type: 'string' },
          state: { type: 'string' },
          flags: { type: 'number' },
          code: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          extras: { type: 'object' },
        },
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            type: { type: 'string' },
            state: { type: 'string' },
            flags: { type: 'number' },
            code: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            extras: { type: 'object' },
          },
        },
        /*
        default: {
          description: 'Default response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            type: { type: 'string' },
            state: { type: 'string' },
            flags: { type: 'number' },
            code: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            extras: { type: 'object' },
          },
        },
        */
      },
    },
  };
};

export const PUT = (entityName: string) => {
  return {
    schema: {
      description: `test ${entityName} api`,
      tags: [`${entityName}`],
      summary: `put ${entityName} object`,
      security: [{ apiKey: [] }],
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: `${entityName} id`,
          },
        },
      },
      body: {
        type: 'object',
        properties: {
          type: { type: 'string' },
          state: { type: 'string' },
          flags: { type: 'number' },
          code: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          extras: { type: 'object' },
        },
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            type: { type: 'string' },
            state: { type: 'string' },
            flags: { type: 'number' },
            code: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            extras: { type: 'object' },
          },
        },
        /*
        default: {
          description: 'Default response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            type: { type: 'string' },
            state: { type: 'string' },
            flags: { type: 'number' },
            code: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            extras: { type: 'object' },
          },
        },
        */
      },
    },
  };
};

export const DELETE = (entityName: string) => {
  return {
    schema: {
      description: `test ${entityName} api`,
      tags: [`${entityName}`],
      summary: `delete ${entityName} object`,
      security: [{ apiKey: [] }],
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: `${entityName} id`,
          },
        },
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            type: { type: 'string' },
            state: { type: 'string' },
            flags: { type: 'number' },
            code: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            extras: { type: 'object' },
          },
        },
        /*
        default: {
          description: 'Default response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            type: { type: 'string' },
            state: { type: 'string' },
            flags: { type: 'number' },
            code: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            extras: { type: 'object' },
          },
        },
        */
      },
    },
  };
};

export const DEFAULT_SCHEMA = (entityName: string) => {
  return {
    GET: GET(entityName),
    GET_ID: GET_ID(entityName),
    POST: POST(entityName),
    PUT: PUT(entityName),
    DELETE: DELETE(entityName),
  };
};
