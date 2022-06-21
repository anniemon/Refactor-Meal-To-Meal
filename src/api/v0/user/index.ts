import { User } from '@entity/user';
import { makeRoute, PlainCrudHandler } from '@api/handler';
import { POST } from './schema';

interface UserRequestBody {
  user_nickname: string;
  user_password: string;
  user_email: string;
}

class UserCrudHandler extends PlainCrudHandler {
  //TODO: 비밀번호 암호화
  protected signup = (Schema: object): void => {
    this.server.post(`${this.routePath}/signup`, this.getOptions(Schema), async (request) => {
      const requestBody: UserRequestBody = <UserRequestBody>request.body;
      const data = await this.repository.save(requestBody);
      return { data: { id: data.id } };
    });
  };

  public bindRoute = async () => {
    try {
      this.routePath = `user`;
      this.signup(POST());
    } catch (error: unknown) {
      this.server?.log.error(error);
    }
  };
}

export default makeRoute(User, UserCrudHandler);
