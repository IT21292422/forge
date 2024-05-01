import { User } from '../model/user.model';

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface GetALlUsersResponseDTO {
  users: User[];
}
