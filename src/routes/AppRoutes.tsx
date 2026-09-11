import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";

import AdminDashboard from "../pages/dashboard/AdminDashboard";
import CourseManagerDashboard from "../pages/dashboard/CourseManagerDashboard";
import StudentDashboard from "../pages/dashboard/StudentDashboard";

import Courses from "../pages/courses/Courses";
import CourseDetails from "../pages/courses/CourseDetails";
import CourseForm from "../pages/courses/CourseForm";

import Templates from "../pages/templates/Templates";
import TemplateDesigner from "../pages/templates/TemplateDesigner";

import GenerateCertificate from "../pages/certificates/GenerateCertificate";
import BulkGenerate from "../pages/certificates/BulkGenerate";
import Certificates from "../pages/certificates/Certificates";
import CertificateDetails from "../pages/certificates/CertificateDetails";

import IssuanceReport from "../pages/reports/IssuanceReport";
import VerificationReport from "../pages/reports/VerificationReport";
import RevocationReport from "../pages/reports/RevocationReport";

import CertificateRequests from "../pages/course-manager/CertificateRequests";
import CertificateRequest from "../pages/student/CertificateRequest";


function RoleRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return (
      <Navigate
        to="/admin/dashboard"
        replace
      />
    );
  }

  if (user.role === "course-manager") {
    return (
      <Navigate
        to="/course-manager/dashboard"
        replace
      />
    );
  }

  return (
    <Navigate
      to="/student/dashboard"
      replace
    />
  );
}


export default function AppRoutes() {
  return (
    <Routes>

      {/* =========================
          AUTH
      ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />


      {/* =========================
          HOME
      ========================= */}

      <Route
        path="/"
        element={<RoleRedirect />}
      />


      {/* =========================
          ADMIN DASHBOARD
      ========================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoutes
            allowedRoles={["admin"]}
          >
            <AdminDashboard />
          </ProtectedRoutes>
        }
      />


      {/* =========================
          COURSE MANAGER DASHBOARD
      ========================= */}

      <Route
        path="/course-manager/dashboard"
        element={
          <ProtectedRoutes
            allowedRoles={["course-manager"]}
          >
            <CourseManagerDashboard />
          </ProtectedRoutes>
        }
      />


      {/* =========================
          STUDENT DASHBOARD
      ========================= */}

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoutes
            allowedRoles={["student"]}
          >
            <StudentDashboard />
          </ProtectedRoutes>
        }
      />


      {/* =========================
          COURSES
      ========================= */}

      <Route
        path="/courses"
        element={
          <ProtectedRoutes
            allowedRoles={[
              "admin",
              "course-manager",
            ]}
          >
            <Courses />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/courses/:id"
        element={
          <ProtectedRoutes
            allowedRoles={[
              "admin",
              "course-manager",
            ]}
          >
            <CourseDetails />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/courses/new"
        element={
          <ProtectedRoutes
            allowedRoles={["admin"]}
          >
            <CourseForm />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/courses/edit/:id"
        element={
          <ProtectedRoutes
            allowedRoles={["admin"]}
          >
            <CourseForm />
          </ProtectedRoutes>
        }
      />


      {/* =========================
          TEMPLATES
      ========================= */}

      <Route
        path="/templates"
        element={
          <ProtectedRoutes
            allowedRoles={[
              "admin",
              "course-manager",
            ]}
          >
            <Templates />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/templates/new"
        element={
          <ProtectedRoutes
            allowedRoles={["admin"]}
          >
            <TemplateDesigner />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/templates/:id"
        element={
          <ProtectedRoutes
            allowedRoles={[
              "admin",
              "course-manager",
            ]}
          >
            <TemplateDesigner />
          </ProtectedRoutes>
        }
      />


      {/* =========================
          CERTIFICATE GENERATION
      ========================= */}

      <Route
        path="/certificates/generate"
        element={
          <ProtectedRoutes
            allowedRoles={[
              "admin",
              "course-manager",
            ]}
          >
            <GenerateCertificate />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/certificates/bulk"
        element={
          <ProtectedRoutes
            allowedRoles={[
              "admin",
              "course-manager",
            ]}
          >
            <BulkGenerate />
          </ProtectedRoutes>
        }
      />


      {/* =========================
          CERTIFICATES
      ========================= */}

      <Route
        path="/certificates"
        element={
          <ProtectedRoutes
            allowedRoles={[
              "admin",
              "course-manager",
              "student",
            ]}
          >
            <Certificates />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/certificates/:id"
        element={
          <ProtectedRoutes
            allowedRoles={[
              "admin",
              "course-manager",
              "student",
            ]}
          >
            <CertificateDetails />
          </ProtectedRoutes>
        }
      />


      {/* =========================
          COURSE MANAGER
      ========================= */}

      <Route
        path="/course-manager/certificate-requests"
        element={
          <ProtectedRoutes
            allowedRoles={["course-manager"]}
          >
            <CertificateRequests />
          </ProtectedRoutes>
        }
      />


      {/* =========================
          STUDENT
      ========================= */}

      <Route
        path="/student/certificate-request"
        element={
          <ProtectedRoutes
            allowedRoles={["student"]}
          >
            <CertificateRequest />
          </ProtectedRoutes>
        }
      />


      {/* =========================
          REPORTS
      ========================= */}

      <Route
        path="/reports/issuance"
        element={
          <ProtectedRoutes
            allowedRoles={["admin"]}
          >
            <IssuanceReport />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/reports/verification"
        element={
          <ProtectedRoutes
            allowedRoles={["admin"]}
          >
            <VerificationReport />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/reports/revocation"
        element={
          <ProtectedRoutes
            allowedRoles={["admin"]}
          >
            <RevocationReport />
          </ProtectedRoutes>
        }
      />


      {/* =========================
          UNKNOWN ROUTES
      ========================= */}

      <Route
        path="*"
        element={<RoleRedirect />}
      />

    </Routes>
  );
}