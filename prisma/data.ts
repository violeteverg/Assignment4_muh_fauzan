export const users = [
  {
    fullName: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    password: "password123",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    fullName: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    password: "password456",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const courses = [
  {
    name: "Introduction to Programming",
    code: "ITP101",
    price: 1000,
    description: "A beginner course on programming.",
    active: true,
  },
  {
    name: "Advanced Database Systems",
    code: "DBS201",
    price: 2000,
    description: "An advanced course on database management systems.",
    active: true,
  },
];

export const schedules = [
  {
    date: new Date("2024-11-01T10:00:00Z"),
  },
  {
    date: new Date("2024-12-01T14:00:00Z"),
  },
];

export const courseSchedules = [
  {
    courseId: 1,
    scheduleId: 1,
  },
  {
    courseId: 1,
    scheduleId: 2,
  },
  {
    courseId: 2,
    scheduleId: 1,
  },
];

export const userCourses = [
  {
    userId: 1,
    courseId: 1,
  },
  {
    userId: 1,
    courseId: 2,
  },
  {
    userId: 2,
    courseId: 1,
  },
];
