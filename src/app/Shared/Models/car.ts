import { insurence } from './insurence';
import { model } from './model';
import { TechnicalVisit } from './technicalVisit';
import { user } from './user';

export interface car {
  id: number;
  registrationNumber: string;
  miseEnCicerculation: Date;
  modifiedPositionAt: Date;
  kilometrage: number;
  number: string;
  numberSet: string;
  carState: string;
  lastLongitude: number;
  lastLatitude: number;
  raceRange: number;
  Model: model;
  TechnicalVisit: TechnicalVisit;

  Insurence: insurence;

  createdBy: user;

  updatedBy: user;

  createdAt: Date;

  modifiedAt: Date;
}
