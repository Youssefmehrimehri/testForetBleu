import { car } from "./car";
import { course } from "./course";
import { raceNotifications } from "./raceNotifications";
import { reclamation } from "./reclamation";
import { user } from "./user";

export interface driver extends user {
   expirationPasswordDate :Date ;
  birthDate :Date ;
  licenseNumber:string ;
  photo :string ;
  phoneNumber :string ;
 phoneNumber2 :string;
  cin :string ;
   cguValidation :Date;
 gouvernerat :string;
 activityCity :string;
 isOwner :boolean;
  isCurrentDriver :boolean;
 Car :car;
 races :course;
 reclamations :reclamation;
raceNotifications:raceNotifications;

}