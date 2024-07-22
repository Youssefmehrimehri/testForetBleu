import { car } from "./car";
import { user } from "./user";

export interface insurence {
     id:number;
    
     SN:string;
    
     beginDate :Date;
    
      endDate :Date;
    
     insurenceType :string;
    
     company :string;
    
     montant :number;
     photo :string;
   
     Car :car;
    
     createdBy :user;
 
     updatedBy :user;
    
     createdAt :Date;
    
     modifiedAt :Date; 
}