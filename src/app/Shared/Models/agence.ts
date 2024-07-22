import { agent } from "./agent";
import { client } from "./client";
import { course } from "./course";
import { entreprise } from "./entreprise";

export interface agence{
   id :number;
    intitule :string;

 entreprise :entreprise;
 clients :client;

  agent : agent;

 races :course;
}