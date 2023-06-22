import { CourseInterface } from 'interfaces/course';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface LessonInterface {
  id?: string;
  name: string;
  content: string;
  course_id: string;
  teacher_id: string;
  created_at?: any;
  updated_at?: any;

  course?: CourseInterface;
  user?: UserInterface;
  _count?: {};
}

export interface LessonGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  content?: string;
  course_id?: string;
  teacher_id?: string;
}
