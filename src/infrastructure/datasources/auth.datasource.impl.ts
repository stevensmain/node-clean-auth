import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserModel } from "../../data";
import { BcryptAdapter } from "../../config/bcrypt";
import { UserMapper } from "../mappers/user.mapper";

type HashPassword = (password: string) => string;
type ComparePassword = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashPassword = BcryptAdapter.hash,
    private readonly comparePassword: ComparePassword = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, name, password } = registerUserDto;

    try {
      const exist = await UserModel.findOne({ email });
      if (exist) throw CustomError.badRequest("User already exist");

      const user = await UserModel.create({
        email,
        name,
        password: this.hashPassword(password),
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internal();
    }
  }
}
