import * as yup from 'yup';

export const studentCourseValidationSchema = yup.object().shape({
  student_id: yup.string().nullable().required(),
  course_id: yup.string().nullable().required(),
});
