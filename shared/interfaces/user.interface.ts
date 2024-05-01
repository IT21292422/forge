export interface IBaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
