export const SIGNUP = (entityName = 'user') => {
  return {
    schema: {
      description: `${entityName} user 회원가입`,
      tags: [`${entityName}`],
      summary: `post ${entityName} object`,
      security: [{ apiKey: [] }],
      body: {
        type: 'object',
        properties: {
          user_nickname: { type: 'string' },
          user_email: { type: 'string' },
          user_password: { type: 'string' },
        },
      },
      response: {
        201: {
          description: 'created',
          type: 'object',
          properties: {
            data: { type: 'number' },
          },
        },
      },
    },
  };
};

export const LOGIN = (entityName = 'user') => {
  return {
    schema: {
      description: `${entityName} user 로그인`,
      tags: [`${entityName}`],
      summary: `post ${entityName} object`,
      security: [{ apiKey: [] }],
      body: {
        type: 'object',
        properties: {
          user_email: { type: 'string' },
          user_password: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'login success',
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
          },
        },
      },
    },
  };
};
