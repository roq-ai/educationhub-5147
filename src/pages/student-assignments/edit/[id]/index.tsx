import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getStudentAssignmentById, updateStudentAssignmentById } from 'apiSdk/student-assignments';
import { Error } from 'components/error';
import { studentAssignmentValidationSchema } from 'validationSchema/student-assignments';
import { StudentAssignmentInterface } from 'interfaces/student-assignment';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { AssignmentInterface } from 'interfaces/assignment';
import { getUsers } from 'apiSdk/users';
import { getAssignments } from 'apiSdk/assignments';

function StudentAssignmentEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<StudentAssignmentInterface>(
    () => (id ? `/student-assignments/${id}` : null),
    () => getStudentAssignmentById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: StudentAssignmentInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateStudentAssignmentById(id, values);
      mutate(updated);
      resetForm();
      router.push('/student-assignments');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<StudentAssignmentInterface>({
    initialValues: data,
    validationSchema: studentAssignmentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Student Assignment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="submission" mb="4" isInvalid={!!formik.errors?.submission}>
              <FormLabel>Submission</FormLabel>
              <Input type="text" name="submission" value={formik.values?.submission} onChange={formik.handleChange} />
              {formik.errors.submission && <FormErrorMessage>{formik.errors?.submission}</FormErrorMessage>}
            </FormControl>
            <FormControl id="feedback" mb="4" isInvalid={!!formik.errors?.feedback}>
              <FormLabel>Feedback</FormLabel>
              <Input type="text" name="feedback" value={formik.values?.feedback} onChange={formik.handleChange} />
              {formik.errors.feedback && <FormErrorMessage>{formik.errors?.feedback}</FormErrorMessage>}
            </FormControl>
            <FormControl id="grade" mb="4" isInvalid={!!formik.errors?.grade}>
              <FormLabel>Grade</FormLabel>
              <NumberInput
                name="grade"
                value={formik.values?.grade}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('grade', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.grade && <FormErrorMessage>{formik.errors?.grade}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'student_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<AssignmentInterface>
              formik={formik}
              name={'assignment_id'}
              label={'Select Assignment'}
              placeholder={'Select Assignment'}
              fetcher={getAssignments}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'student_assignment',
  operation: AccessOperationEnum.UPDATE,
})(StudentAssignmentEditPage);
