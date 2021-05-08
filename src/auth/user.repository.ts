import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialDto } from './dto/user-credential.ato';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserCredentialDto: UserCredentialDto): Promise<User> {
    const { username, password } = createUserCredentialDto;
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    return user;
  }
}
