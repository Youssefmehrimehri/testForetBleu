import { reclamationNotes } from "./reclamationNotes";
import { client } from "./client";
import { course } from "./course";
import { driver } from "./driver";
import { user } from "./user";

export interface reclamation {
    id:number;
  
    motif:string;
  
     description:string;
   
     ReclamationType :string;
   reclamationState :string;
    
     Client :client;

   driver :driver;
    
    race :course;

 reclamationNotes :reclamationNotes;
    
    createdBy:user;
 updatedBy :user;

    createdAt:Date;
    
     modifiedAt :Date;
}