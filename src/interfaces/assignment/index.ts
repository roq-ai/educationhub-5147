import { StudentAssignmentInterface } from 'interfaces/student-assignment';
import { CourseInterface } from 'interfaces/course';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AssignmentInterface {
  id?: string;
  name: string;
  description: string;
  course_id: string;
  teacher_id: string;
  created_at?: any;
  updated_at?: any;
  student_assignment?: StudentAssignmentInterface[];
  course?: CourseInterface;
  user?: UserInterface;
  _count?: {
    student_assignment?: number;
  };
}

export interface AssignmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  course_id?: string;
  teacher_id?: string;
}
