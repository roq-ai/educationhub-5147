const mapping: Record<string, string> = {
  assignments: 'assignment',
  courses: 'course',
  lessons: 'lesson',
  organizations: 'organization',
  'student-assignments': 'student_assignment',
  'student-courses': 'student_course',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
