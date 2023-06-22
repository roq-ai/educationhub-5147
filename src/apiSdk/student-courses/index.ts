import axios from 'axios';
import queryString from 'query-string';
import { StudentCourseInterface, StudentCourseGetQueryInterface } from 'interfaces/student-course';
import { GetQueryInterface } from '../../interfaces';

export const getStudentCourses = async (query?: StudentCourseGetQueryInterface) => {
  const response = await axios.get(`/api/student-courses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStudentCourse = async (studentCourse: StudentCourseInterface) => {
  const response = await axios.post('/api/student-courses', studentCourse);
  return response.data;
};

export const updateStudentCourseById = async (id: string, studentCourse: StudentCourseInterface) => {
  const response = await axios.put(`/api/student-courses/${id}`, studentCourse);
  return response.data;
};

export const getStudentCourseById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/student-courses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStudentCourseById = async (id: string) => {
  const response = await axios.delete(`/api/student-courses/${id}`);
  return response.data;
};
