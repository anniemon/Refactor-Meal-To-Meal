import { FastifyRequest, FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { IncomingMessage } from 'http';

export interface ServerIncomingMessage extends IncomingMessage {
  locals: object;
}

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

export const validateAccessToken = async () => {
  const validateTokenMiddie: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.addHook('preHandler', async (req) => {
      try {
        const accessToken = getAccessToken(req);
        if (!accessToken) {
          throw new Error('invalid access token');
        }
        const verified = await server.jwt.verify(accessToken);
        console.log(verified, 'verified');
        console.log(accessToken, 'accessToken');

        (req.raw as ServerIncomingMessage).locals = {
          accessToken,
        };
        //TODO: 사용자 세션 정보이다. route 에서는 이렇게 접근해야한다. access 함수를 만들어야 할것 같다.
        //const locals = (request.raw as any).locals;
      } catch (error: unknown) {
        server?.log.error(error);
        throw error;
      }
    });
  };
  return fp(validateTokenMiddie);
};

export default validateAccessToken;
