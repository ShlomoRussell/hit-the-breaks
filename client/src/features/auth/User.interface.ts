export interface UserModel {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
    isAdmin: boolean;
    token:string | null
}
