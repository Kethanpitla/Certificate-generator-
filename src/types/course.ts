export interface Course {
  id: string;
  courseCode: string;
  title: string;
  description: string;
  durationHours: number;
  category: string;
  instructor: string;
  isActive: boolean;
  totalCertificatesIssued: number;
  createdAt: string;
  updatedAt: string;
}