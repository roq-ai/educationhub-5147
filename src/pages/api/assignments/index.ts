import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { assignmentValidationSchema } from 'validationSchema/assignments';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getAssignments();
    case 'POST':
      return createAssignment();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAssignments() {
    const data = await prisma.assignment
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'assignment'));
    return res.status(200).json(data);
  }

  async function createAssignment() {
    await assignmentValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.student_assignment?.length > 0) {
      const create_student_assignment = body.student_assignment;
      body.student_assignment = {
        create: create_student_assignment,
      };
    } else {
      delete body.student_assignment;
    }
    const data = await prisma.assignment.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
