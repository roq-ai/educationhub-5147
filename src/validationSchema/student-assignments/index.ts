import * as yup from 'yup';

export const studentAssignmentValidationSchema = yup.object().shape({
  submission: yup.string().required(),
  feedback: yup.string(),
  grade: yup.number().integer(),
  student_id: yup.string().nullable().required(),
  assignment_id: yup.string().nullable().required(),
});
