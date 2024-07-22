import { agence } from './agence';
import { agent } from './agent';
import { client } from './client';
import { driver } from './driver';
import { user } from './user';
import { region } from './region';

export interface course {
  id: number;
  raceUUID: string;
  placeIdBegin: string;

  addressBegin: string;

  latitudeBegin: number;
  longitudeBegin: number;
  placeIdEnd: string;
  addressEnd: string;
  latitudeEnd: string;
  longitudeEnd: number;
  distance: number;
  endDate: Date;
  expectedTime: number;
  price: number;
  expectedPrice: number;
  rate: number;
  raceState: number;
  payementType: string;
  cancelCause: string;
  numClientStaf: string;

  client: client;

  driver: driver;

  agent: agent;

  agency: agence;

  region: region;

  createdBy: user;

  updatedBy: user;

  createdAt: Date;

  modifiedAt: Date;
}
