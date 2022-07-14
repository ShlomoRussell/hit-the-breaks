export interface UserModel {
  id: string | null;
  email: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean | null;
  token: string | null;
}
