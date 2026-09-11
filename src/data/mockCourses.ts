import type { Course } from "../types/course";

export const mockCourses: Course[] = [
  {
    id: "course-001",
    courseCode: "FSD-001",
    title: "Full Stack Web Development",
    description:
      "Learn frontend and backend development using modern web technologies.",
    durationHours: 120,
    category: "Web Development",
    instructor: "Rahul Kumar",
    isActive: true,
    totalCertificatesIssued: 248,
    createdAt: "2026-01-15",
    updatedAt: "2026-08-20",
  },
  {
    id: "course-002",
    courseCode: "PY-002",
    title: "Python Programming",
    description:
      "Learn Python programming from fundamentals to advanced concepts.",
    durationHours: 80,
    category: "Programming",
    instructor: "Priya Reddy",
    isActive: true,
    totalCertificatesIssued: 186,
    createdAt: "2026-02-10",
    updatedAt: "2026-08-18",
  },
  {
    id: "course-003",
    courseCode: "DS-003",
    title: "Data Science Fundamentals",
    description:
      "Introduction to data analysis, visualization and data science concepts.",
    durationHours: 100,
    category: "Data Science",
    instructor: "Arjun Sharma",
    isActive: true,
    totalCertificatesIssued: 142,
    createdAt: "2026-03-05",
    updatedAt: "2026-08-15",
  },
  {
    id: "course-004",
    courseCode: "ML-004",
    title: "Machine Learning",
    description:
      "Learn machine learning algorithms, model training and evaluation.",
    durationHours: 110,
    category: "Artificial Intelligence",
    instructor: "Sneha Rao",
    isActive: true,
    totalCertificatesIssued: 98,
    createdAt: "2026-03-20",
    updatedAt: "2026-08-10",
  },
  {
    id: "course-005",
    courseCode: "UI-005",
    title: "UI/UX Design",
    description:
      "Learn user interface and user experience design principles.",
    durationHours: 60,
    category: "Design",
    instructor: "Kiran Reddy",
    isActive: false,
    totalCertificatesIssued: 74,
    createdAt: "2026-04-01",
    updatedAt: "2026-07-25",
  },
];