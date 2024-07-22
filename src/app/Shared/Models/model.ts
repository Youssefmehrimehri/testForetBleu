import { brand } from "./brand";
import { car } from "./car";

export interface model {
    id:number;
    libelle :string;

     modelType:string;
 brand : brand;
 
     cars :car;
}