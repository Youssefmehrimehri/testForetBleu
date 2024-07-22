import { user } from './user';

export interface region {
  id: number;
  rgIntitule: string;

  createdBy: user;

  updatedBy: user;
  createdAt: Date;
  modifiedAt: Date;
}
