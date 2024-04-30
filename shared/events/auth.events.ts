import { SignUpRequestDTO } from 'shared/dto/auth.dto';

export class CreateUserEvent {
  constructor(public readonly email: string) {}
}
