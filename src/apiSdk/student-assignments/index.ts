import axios from 'axios';
import queryString from 'query-string';
import { StudentAssignmentInterface, StudentAssignmentGetQueryInterface } from 'interfaces/student-assignment';
import { GetQueryInterface } from '../../interfaces';

export const getStudentAssignments = async (query?: StudentAssignmentGetQueryInterface) => {
  const response = await axios.get(`/api/student-assignments${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStudentAssignment = async (studentAssignment: StudentAssignmentInterface) => {
  const response = await axios.post('/api/student-assignments', studentAssignment);
  return response.data;
};

export const updateStudentAssignmentById = async (id: string, studentAssignment: StudentAssignmentInterface) => {
  const response = await axios.put(`/api/student-assignments/${id}`, studentAssignment);
  return response.data;
};

export const getStudentAssignmentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/student-assignments/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStudentAssignmentById = async (id: string) => {
  const response = await axios.delete(`/api/student-assignments/${id}`);
  return response.data;
};
