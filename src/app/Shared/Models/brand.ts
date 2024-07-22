import { model } from "./model";
import { user } from "./user";

export interface brand {
    id :number;
    
     libelle :string;
    
     models :model;
    
   createdBy :user;
    
    updatedBy :user;
    
   createdAt :Date;
    
     modifiedAt :Date;  
}