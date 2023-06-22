import { UserInterface } from 'interfaces/user';
import { AssignmentInterface } from 'interfaces/assignment';
import { GetQueryInterface } from 'interfaces';

export interface StudentAssignmentInterface {
  id?: string;
  student_id: string;
  assignment_id: string;
  submission: string;
  feedback?: string;
  grade?: number;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  assignment?: AssignmentInterface;
  _count?: {};
}

export interface StudentAssignmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  student_id?: string;
  assignment_id?: string;
  submission?: string;
  feedback?: string;
}
