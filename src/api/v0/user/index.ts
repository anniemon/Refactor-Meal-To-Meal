import { User } from '@entity/user';
import { makeRoute, PlainCrudHandler } from '@api/handler';
import { SIGNUP, LOGIN, LOGOUT } from './schema';
import bcrypt from 'bcrypt';

interface UserRequestBody {
  user_nickname?: string;
  user_password: string;
  user_email: string;
}

class UserCrudHandler extends PlainCrudHandler {
  protected signup = (Schema: object): void => {
    this.server.post(`${this.routePath}/signup`, this.getOptions(Schema), async (request) => {
      const requestBody: UserRequestBody = <UserRequestBody>request.body;
      const hashed = await bcrypt.hash(requestBody.user_password, 10);
      requestBody.user_password = hashed;
      const data = await this.repository.save(requestBody);
      return { data: { id: data.id } };
    });
  };

  protected login = (Schema: object): void => {
    this.server.post(`${this.routePath}/login`, this.getOptions(Schema), async (request) => {
      const requestBody: UserRequestBody = <UserRequestBody>request.body;
      const data = await this.repository.findOneBy({ user_email: requestBody.user_email });
      const isMatched = await bcrypt.compare(requestBody.user_password, data.user_password);
      if (isMatched) {
        delete data.user_password;
        const accessToken = await this.server.jwt.sign(data, { expiresIn: '1d' });
        return { accessToken: accessToken };
      } else {
        throw new Error(`please check user email or password`);
      }
    });
  };

  protected logout = (Schema: object): void => {
    this.server.get(`${this.routePath}/logout`, this.getOptions(Schema), async (request) => {
      const authorization = request.headers.authorization;
      if (!authorization) {
        throw new Error(`no access token found`);
      }
      const accessToken = authorization.split(' ')[1];
      const verified = await this.server.jwt.verify(accessToken);
      if (!verified) {
        throw new Error(`invalid access token`);
      }
      request.headers.authorization = '';
      return { message: `logged out successfully` };
    });
  };

  public bindRoute = async () => {
    try {
      this.routePath = `/user`;
      this.signup(SIGNUP());
      this.login(LOGIN());
      this.logout(LOGOUT());
    } catch (error: unknown) {
      this.server?.log.error(error);
    }
  };
}

export default makeRoute(User, UserCrudHandler);
