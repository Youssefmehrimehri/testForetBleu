import { agence } from "./agence";
import { course } from "./course";
import { reclamation } from "./reclamation";
import { user } from "./user";

export interface client extends user {
  expirationPasswordDate :Date ;
  birthDate :Date ;
 photo :string ;
    
 phoneNumber :string;
cguValidation :Date;
 gouvernerat :string;
 city :string;
  zipPostal :string;
  gender :string;
   races :course;
reclamations :reclamation;

     Agency :agence;

}