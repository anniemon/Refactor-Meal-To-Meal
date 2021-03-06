export const SIGNUP = (entityName = 'user') => {
  return {
    schema: {
      description: `${entityName} user 회원가입`,
      tags: [`${entityName}`],
      summary: `signup ${entityName}`,
      security: [{ apiKey: [] }],
      body: {
        type: 'object',
        properties: {
          user_nickname: { type: 'string' },
          user_email: { type: 'string' },
          user_password: { type: 'string' },
        },
        required: ['user_nickname', 'user_email', 'user_password'],
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
      summary: `login ${entityName}`,
      security: [{ apiKey: [] }],
      body: {
        type: 'object',
        properties: {
          user_email: { type: 'string' },
          user_password: { type: 'string' },
        },
        required: ['user_email', 'user_password'],
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

export const LOGOUT = (entityName = 'user') => {
  return {
    schema: {
      description: `${entityName} user 로그아웃`,
      tags: [`${entityName}`],
      summary: `logout ${entityName} `,
      security: [{ apiKey: [] }],
      headers: {
        type: 'object',
        properties: {
          authorization: { type: 'string' },
        },
        required: ['authorization'],
      },
      response: {
        200: {
          description: 'logout success',
          type: 'object',
        },
      },
    },
  };
};
