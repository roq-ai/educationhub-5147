import { AssignmentInterface } from 'interfaces/assignment';
import { LessonInterface } from 'interfaces/lesson';
import { StudentCourseInterface } from 'interfaces/student-course';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CourseInterface {
  id?: string;
  name: string;
  grade: number;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  assignment?: AssignmentInterface[];
  lesson?: LessonInterface[];
  student_course?: StudentCourseInterface[];
  organization?: OrganizationInterface;
  _count?: {
    assignment?: number;
    lesson?: number;
    student_course?: number;
  };
}

export interface CourseGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
