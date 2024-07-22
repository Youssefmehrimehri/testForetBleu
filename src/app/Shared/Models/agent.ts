import { addresse } from './address';
import { agence } from './agence';
import { course } from './course';
import { roles } from './roles';
import { user } from './user';

export interface agent extends user {
  roles: roles;

  Agency: agence;

  addresses: addresse;
  races: course;
  state:string
  

}
