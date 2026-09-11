import {
  BookOpen,
  Clock,
  Award,
  User,
  ArrowRight,
} from "lucide-react";

import type  { Course } from "../../types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
          <BookOpen className="h-6 w-6 text-blue-600" />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            course.isActive
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {course.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Course information */}
      <div className="mt-5">
        <p className="text-xs font-medium text-blue-600">
          {course.courseCode}
        </p>

        <h3 className="mt-1 text-lg font-semibold text-gray-900">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {course.description}
        </p>
      </div>

      {/* Metadata */}
      <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{course.durationHours} hours</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User className="h-4 w-4" />
          <span>{course.instructor}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Award className="h-4 w-4" />
          <span>{course.totalCertificatesIssued} certificates</span>
        </div>
      </div>

      {/* Action */}
      <a
        href={`/courses/${course.id}`}
        className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
      >
        View Course
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}