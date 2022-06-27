import { User } from '@entity/user';
import { makeRoute, PlainCrudHandler } from '@api/handler';
import { SIGNUP, LOGIN, LOGOUT } from './schema';
import { validateAccessToken } from '@lib/middleware/validate-access-token';

interface UserRequestBody {
  user_nickname?: string;
  user_password: string;
  user_email: string;
}

class UserCrudHandler extends PlainCrudHandler {
  //TODO: 비밀번호 암호화, 유효성 검사
  protected signup = (Schema: object): void => {
    this.server.post(`${this.routePath}/signup`, this.getOptions(Schema), async (request) => {
      const requestBody: UserRequestBody = <UserRequestBody>request.body;
      const data = await this.repository.save(requestBody);
      return { data: { id: data.id } };
    });
  };

  protected login = (Schema: object): void => {
    //TODO: jwt
    this.server.post(`${this.routePath}/login`, this.getOptions(Schema), async (request) => {
      const requestBody: UserRequestBody = <UserRequestBody>request.body;
      const data = await this.repository.findOneBy({ user_email: requestBody.user_email });
      if (data && data.user_password === requestBody.user_password) {
        const accessToken = await this.server.jwt.sign(data, { expiresIn: '1d' });
        return { accessToken: accessToken };
      } else {
        throw new Error(`please check user email or password`);
      }
    });
  };

  protected logout = (Schema: object): void => {
    this.server.get(`${this.routePath}/logout`, this.getOptions(Schema), async (request) => {
      const accessToken = request.headers.authorization;
      console.log(accessToken);
      const at = validateAccessToken();
      console.log(at, 'what is at');
      return at;
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
