import 'express-session';
import { IUser } from '../utils/interface';

declare module 'express-session' {
  interface SessionData {
    user?: Partial<IUser>;
  }
}
