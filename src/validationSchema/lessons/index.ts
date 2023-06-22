import * as yup from 'yup';

export const lessonValidationSchema = yup.object().shape({
  name: yup.string().required(),
  content: yup.string().required(),
  course_id: yup.string().nullable().required(),
  teacher_id: yup.string().nullable().required(),
});
