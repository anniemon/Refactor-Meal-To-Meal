import { User } from '@entity/user';
import { makeRoute, PlainCrudHandler } from '@api/handler';

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
        return 'ok';
      } else {
        throw new Error(`${data.user_email} does Not Exist`);
      }
    });
  };

  protected logout = (Schema: object): void => {
    this.server.get(`${this.routePath}/logout`, this.getOptions(Schema), async (request) => {});
  };

  public bindRoute = async () => {
    try {
      this.routePath = `/user`;
      this.signup(this.schema.POST);
      this.login(this.schema.POST);
    } catch (error: unknown) {
      this.server?.log.error(error);
    }
  };
}

export default makeRoute(User, UserCrudHandler);
