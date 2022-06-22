import { FastifyRequest, FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
// import { verifyAccessToken, closeOAuthCache } from '@lib/modules/';
import { IncomingMessage } from 'http';

export interface ServerIncomingMessage extends IncomingMessage {
  locals: object;
}

export interface validateRoutes {
  includes: Array<string>;
  excludes: Array<string>;
}

const routes = (options: FastifyPluginOptions, routeNames: Array<string>): Array<string> => {
  return routeNames.map((route) => `${options.prefix}/${route}`);
};

const ACCESS_TOKEN_REGEXP = /^bearer\s+(.*)/i;
/**
 * HTTP 요청에서 인증 토큰을 얻음.
 *
 * @param {Request} req
 * @returns {string|undefined}
 */
const getAccessToken = (req: FastifyRequest) => {
  const authToken = req.headers['authorization'];
  const matched = authToken ? ACCESS_TOKEN_REGEXP.exec(authToken) : '';
  return matched && matched[1];
};

export const validateAccessToken = async (selectedRoutes: validateRoutes) => {
  const validateTokenMiddie: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    const includesRoutes = routes(options, selectedRoutes.includes);
    const excludesRoutes = routes(options, selectedRoutes.excludes);
    server.addHook('preHandler', async (req) => {
      try {
        if (excludesRoutes.some((routes) => (req.url as string).includes(routes))) {
          if (!includesRoutes.some((routes) => (req.url as string).includes(routes))) {
            return;
          }
        }
        const accessToken = getAccessToken(req);
        if (!accessToken) {
          throw new Error('invalid access token');
        }
        const accessTokenCredential = JSON.stringify([req.headers['user-agent']]);
        // const principal = await verifyAccessToken(accessToken, accessTokenCredential);
        (req.raw as ServerIncomingMessage).locals = {
          accessToken,
          // principal,
        };
        //TODO: 사용자 세션 정보이다. route 에서는 이렇게 접근해야한다. access 함수를 만들어야 할것 같다.
        //const locals = (request.raw as ServerIncomingMessage).locals;
      } catch (error: unknown) {
        server?.log.error(error);
        throw error;
      }
    });
    server.addHook('onClose', async () => {
      // await closeOAuthCache();
    });
  };
  return fp(validateTokenMiddie);
};

export default validateAccessToken;
