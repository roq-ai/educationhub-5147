import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { courseValidationSchema } from 'validationSchema/courses';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCourses();
    case 'POST':
      return createCourse();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCourses() {
    const data = await prisma.course
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'course'));
    return res.status(200).json(data);
  }

  async function createCourse() {
    await courseValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.assignment?.length > 0) {
      const create_assignment = body.assignment;
      body.assignment = {
        create: create_assignment,
      };
    } else {
      delete body.assignment;
    }
    if (body?.lesson?.length > 0) {
      const create_lesson = body.lesson;
      body.lesson = {
        create: create_lesson,
      };
    } else {
      delete body.lesson;
    }
    if (body?.student_course?.length > 0) {
      const create_student_course = body.student_course;
      body.student_course = {
        create: create_student_course,
      };
    } else {
      delete body.student_course;
    }
    const data = await prisma.course.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
