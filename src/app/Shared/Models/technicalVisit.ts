import { car } from "./car";
import { user } from "./user";

export interface TechnicalVisit{
    id :number;
    
     passDate :Date;
    
     lieu :string;
     photo :string;
     car :car;
  
     createdBy :user;
   
     updatedBy :user;
   
     createdAt :Date;
    
     modifiedAt :Date;
}