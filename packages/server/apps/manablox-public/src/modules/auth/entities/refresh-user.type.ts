import { User } from '../../user/entities/user/user.model';

export class RefreshUser {
  user: User;
  refreshToken: string;
}
