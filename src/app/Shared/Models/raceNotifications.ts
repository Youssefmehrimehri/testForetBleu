import { course } from "./course";
import { driver } from "./driver";

export interface raceNotifications {
     id:number;
    
    Race :course;
 drivers :driver;
    createdAt :Date;
}