import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Search,
  User,
  X,
  XCircle,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

interface CertificateRequest {
  id: number;
  studentName: string;
  email: string;
  course: string;
  score: string;
  completionDate: string;
  submittedDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialRequests: CertificateRequest[] = [
  {
    id: 1,
    studentName: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    course: "Full Stack Web Development",
    score: "92%",
    completionDate: "August 20, 2026",
    submittedDate: "September 9, 2026",
    status: "Pending",
  },
  {
    id: 2,
    studentName: "Priya Reddy",
    email: "priya.reddy@example.com",
    course: "Python Programming",
    score: "88%",
    completionDate: "August 18, 2026",
    submittedDate: "September 8, 2026",
    status: "Pending",
  },
  {
    id: 3,
    studentName: "Arjun Kumar",
    email: "arjun.kumar@example.com",
    course: "Data Analytics",
    score: "95%",
    completionDate: "August 15, 2026",
    submittedDate: "September 7, 2026",
    status: "Pending",
  },
  {
    id: 4,
    studentName: "Sneha Patel",
    email: "sneha.patel@example.com",
    course: "Machine Learning Fundamentals",
    score: "91%",
    completionDate: "August 12, 2026",
    submittedDate: "September 5, 2026",
    status: "Approved",
  },
  {
    id: 5,
    studentName: "Vikram Singh",
    email: "vikram.singh@example.com",
    course: "Cloud Computing",
    score: "78%",
    completionDate: "August 10, 2026",
    submittedDate: "September 4, 2026",
    status: "Rejected",
  },
];

export default function CertificateRequests() {
  const [requests, setRequests] =
    useState<CertificateRequest[]>(
      initialRequests
    );

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRequest, setSelectedRequest] =
    useState<CertificateRequest | null>(null);

  const [showRejectModal, setShowRejectModal] =
    useState(false);

  const [rejectionReason, setRejectionReason] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState<
      "All" | "Pending" | "Approved" | "Rejected"
    >("All");

  const filteredRequests = requests.filter(
    (request) => {
      const matchesSearch =
        request.studentName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        request.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        request.course
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        request.status === activeFilter;

      return matchesSearch && matchesFilter;
    }
  );

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const rejectedCount = requests.filter(
    (request) => request.status === "Rejected"
  ).length;

  const approveRequest = (id: number) => {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              status: "Approved",
            }
          : request
      )
    );

    setSelectedRequest(null);
  };

  const rejectRequest = () => {
    if (!selectedRequest) {
      return;
    }

    if (!rejectionReason.trim()) {
      return;
    }

    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === selectedRequest.id
          ? {
              ...request,
              status: "Rejected",
            }
          : request
      )
    );

    setShowRejectModal(false);
    setSelectedRequest(null);
    setRejectionReason("");
  };

  return (
    <DashboardLayout activeItem="Certificate Requests">
      <div className="space-y-6">

        {/* PAGE HEADER */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Certificate Requests
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review student course completion requests
              before certificates are issued.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <Clock
              size={19}
              className="text-amber-600"
            />

            <span className="text-sm font-semibold text-amber-700">
              {pendingCount} pending review
            </span>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock size={24} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Pending
                </p>

                <p className="text-2xl font-bold text-slate-900">
                  {pendingCount}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Approved
                </p>

                <p className="text-2xl font-bold text-slate-900">
                  {approvedCount}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <XCircle size={24} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Rejected
                </p>

                <p className="text-2xl font-bold text-slate-900">
                  {rejectedCount}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* FILTERS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search student, email or course..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap gap-2">

              {(
                [
                  "All",
                  "Pending",
                  "Approved",
                  "Rejected",
                ] as const
              ).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {filter}
                </button>
              ))}

            </div>

          </div>
        </div>

        {/* REQUEST TABLE */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Course
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Score
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Completion
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredRequests.map(
                  (request) => (
                    <tr
                      key={request.id}
                      className="hover:bg-slate-50"
                    >

                      {/* STUDENT */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-600">
                            {request.studentName.charAt(
                              0
                            )}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {request.studentName}
                            </p>

                            <p className="text-xs text-slate-500">
                              {request.email}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* COURSE */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <FileText
                            size={17}
                            className="text-slate-400"
                          />

                          <span className="text-sm font-medium text-slate-700">
                            {request.course}
                          </span>
                        </div>
                      </td>

                      {/* SCORE */}
                      <td className="px-6 py-5">
                        <span className="font-semibold text-slate-700">
                          {request.score}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5">
                        <p className="text-sm text-slate-700">
                          {request.completionDate}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Submitted{" "}
                          {request.submittedDate}
                        </p>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        {request.status ===
                          "Pending" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                            <Clock size={13} />
                            Pending
                          </span>
                        )}

                        {request.status ===
                          "Approved" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 size={13} />
                            Approved
                          </span>
                        )}

                        {request.status ===
                          "Rejected" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                            <XCircle size={13} />
                            Rejected
                          </span>
                        )}
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedRequest(
                                request
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <Eye size={15} />
                            Review
                          </button>

                          {request.status ===
                            "Pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  approveRequest(
                                    request.id
                                  )
                                }
                                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                              >
                                Approve
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedRequest(
                                    request
                                  );
                                  setShowRejectModal(
                                    true
                                  );
                                }}
                                className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                              >
                                Reject
                              </button>
                            </>
                          )}

                        </div>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

          {filteredRequests.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-4">
                <Search
                  size={25}
                  className="text-slate-400"
                />
              </div>

              <h3 className="font-semibold text-slate-900">
                No requests found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* =========================
          REVIEW MODAL
          ========================= */}

      {selectedRequest &&
        !showRejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">

            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

              <div className="flex items-center justify-between border-b border-slate-200 p-6">

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Review Certificate Request
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Check the student's course completion
                    details before making a decision.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedRequest(null)
                  }
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>

              </div>

              <div className="space-y-5 p-6">

                {/* STUDENT */}
                <div className="rounded-xl bg-slate-50 p-5">

                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                      <User size={21} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Student
                      </p>

                      <p className="font-bold text-slate-900">
                        {selectedRequest.studentName}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div>
                      <p className="text-xs text-slate-400">
                        Email
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedRequest.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Course
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedRequest.course}
                      </p>
                    </div>

                  </div>

                </div>

                {/* COMPLETION DETAILS */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-400">
                      Completion Score
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {selectedRequest.score}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-400">
                      Completion Date
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {selectedRequest.completionDate}
                    </p>
                  </div>

                </div>

                {/* STATUS */}
                <div className="rounded-xl border border-slate-200 p-4">

                  <p className="text-xs text-slate-400">
                    Current Request Status
                  </p>

                  <div className="mt-2">
                    {selectedRequest.status ===
                      "Pending" && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
                        <Clock size={15} />
                        Pending Review
                      </span>
                    )}

                    {selectedRequest.status ===
                      "Approved" && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                        <CheckCircle2 size={15} />
                        Approved
                      </span>
                    )}

                    {selectedRequest.status ===
                      "Rejected" && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">
                        <XCircle size={15} />
                        Rejected
                      </span>
                    )}
                  </div>

                </div>

              </div>

              {/* MODAL ACTIONS */}
              <div className="flex flex-col gap-3 border-t border-slate-200 p-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedRequest(null)
                  }
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>

                {selectedRequest.status ===
                  "Pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setShowRejectModal(true);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-100"
                    >
                      <XCircle size={17} />
                      Reject Request
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        approveRequest(
                          selectedRequest.id
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      <CheckCircle2 size={17} />
                      Approve Request
                    </button>
                  </>
                )}

              </div>

            </div>

          </div>
        )}

      {/* =========================
          REJECTION MODAL
          ========================= */}

      {showRejectModal &&
        selectedRequest && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-4">

            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

              <div className="flex items-center justify-between border-b border-slate-200 p-6">

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Reject Certificate Request
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Provide a reason for rejecting this request.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason("");
                  }}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>

              </div>

              <div className="p-6">

                <div className="mb-5 rounded-xl bg-red-50 p-4">
                  <p className="text-sm font-semibold text-red-800">
                    {selectedRequest.studentName}
                  </p>

                  <p className="mt-1 text-xs text-red-600">
                    {selectedRequest.course}
                  </p>
                </div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Rejection reason
                </label>

                <textarea
                  value={rejectionReason}
                  onChange={(event) =>
                    setRejectionReason(
                      event.target.value
                    )
                  }
                  rows={5}
                  placeholder="Enter the reason for rejecting this certificate request..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />

                {!rejectionReason.trim() && (
                  <p className="mt-2 text-xs text-slate-400">
                    A rejection reason is required.
                  </p>
                )}

              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 p-6">

                <button
                  type="button"
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason("");
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={!rejectionReason.trim()}
                  onClick={rejectRequest}
                  className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reject Request
                </button>

              </div>

            </div>

          </div>
        )}

    </DashboardLayout>
  );
}