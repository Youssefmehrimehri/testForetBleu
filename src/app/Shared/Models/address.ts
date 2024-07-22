import { agent } from './agent';
import { user } from './user';

export interface addresse {
  id: number;

  libelle: string;

  placeId: string;

  address: string;

  longitude: number;

  latitude: number;

  adressType: string;
  user: user;

  agent: agent;

  createdAt: Date;
  modifiedAt: Date;
}
