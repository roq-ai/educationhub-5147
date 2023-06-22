import * as yup from 'yup';

export const courseValidationSchema = yup.object().shape({
  name: yup.string().required(),
  grade: yup.number().integer().required(),
  organization_id: yup.string().nullable().required(),
});
