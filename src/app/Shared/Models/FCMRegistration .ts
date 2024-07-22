import { user } from "./user";

export interface FCMRegistration {
 id:number;
 registrationId :string;
deviceType :String;
   user :user;
}