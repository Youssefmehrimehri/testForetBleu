import { FCMRegistration } from "./FCMRegistration ";
import { addresse } from "./address";

export interface user {
   id : number;
    
    firstName: string;
    
    lastName :string;
    
     userName :string;
    
     email: string;
    
     password :string;
    UserState :string;
    isDeletable :boolean;
     isEmailValidated :boolean;
    isPhoneNumberValidated :boolean;
  
   fcmRegistrations :FCMRegistration;

    addresses :addresse;
  
 createdBy :user;
  
    updatedBy :user;
  
   createdAt : Date;

 modifiedAt :Date;
}