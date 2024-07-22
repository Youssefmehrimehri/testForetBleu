import { reclamation } from "./reclamation";
import { user } from "./user";

export interface reclamationNotes{
     id :number;
  
     note :string;
     Reclamation : reclamation;
     createdBy :user;
   updatedBy  :user;
     createdAt :Date;
     modifiedAt :Date;
}