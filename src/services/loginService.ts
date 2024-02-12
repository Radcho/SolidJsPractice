import Login from '../interfaces/login';
import User from '../interfaces/user';
import { getFakeUser, wait } from '../utils/mockUtil';
import BaseService from './baseService';

class LoginService extends BaseService {
    public async login(login: Login): Promise<User> {
        // Commented out since we only use generated data
        // return await this.post<User, Login>('/login', login);

        await wait(500);
        console.debug('Logged in as user:', login.username);
        return getFakeUser();
    }
}

const loginService = new LoginService();
export default loginService;
