import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { studentAssignmentValidationSchema } from 'validationSchema/student-assignments';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.student_assignment
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStudentAssignmentById();
    case 'PUT':
      return updateStudentAssignmentById();
    case 'DELETE':
      return deleteStudentAssignmentById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStudentAssignmentById() {
    const data = await prisma.student_assignment.findFirst(convertQueryToPrismaUtil(req.query, 'student_assignment'));
    return res.status(200).json(data);
  }

  async function updateStudentAssignmentById() {
    await studentAssignmentValidationSchema.validate(req.body);
    const data = await prisma.student_assignment.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteStudentAssignmentById() {
    const data = await prisma.student_assignment.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
