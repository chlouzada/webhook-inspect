export interface ICollection {
  _id: string;
  name: string;
  publicCollection: boolean;
  redirectTo?: string;
  userRef: string;
  webhooksRef: string;
}