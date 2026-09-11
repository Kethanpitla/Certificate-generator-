import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Award,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Download,
  FileSearch,
  Globe2,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

interface VerificationRecord {
  id: string;
  certificateId: string;
  recipient: string;
  course: string;
  verifiedAt: string;
  source: "QR Code" | "Verification URL" | "Certificate ID";
  result: "Verified" | "Revoked" | "Not Found";
  location: string;
}

const verificationRecords: VerificationRecord[] = [
  {
    id: "VER-001",
    certificateId: "CERT-2026-000184",
    recipient: "Rahul Sharma",
    course: "Advanced Web Development",
    verifiedAt: "Sep 10, 2026 • 11:18 AM",
    source: "QR Code",
    result: "Verified",
    location: "Hyderabad, India",
  },
  {
    id: "VER-002",
    certificateId: "CERT-2026-000183",
    recipient: "Priya Reddy",
    course: "Python Programming",
    verifiedAt: "Sep 10, 2026 • 11:02 AM",
    source: "Verification URL",
    result: "Verified",
    location: "Hyderabad, India",
  },
  {
    id: "VER-003",
    certificateId: "CERT-2026-000180",
    recipient: "Vikram Singh",
    course: "Machine Learning",
    verifiedAt: "Sep 09, 2026 • 04:42 PM",
    source: "QR Code",
    result: "Revoked",
    location: "Bengaluru, India",
  },
  {
    id: "VER-004",
    certificateId: "CERT-2026-000182",
    recipient: "Arjun Kumar",
    course: "Data Science Fundamentals",
    verifiedAt: "Sep 09, 2026 • 01:26 PM",
    source: "Certificate ID",
    result: "Verified",
    location: "Mumbai, India",
  },
  {
    id: "VER-005",
    certificateId: "CERT-2026-009999",
    recipient: "Unknown",
    course: "Unknown",
    verifiedAt: "Sep 08, 2026 • 08:14 PM",
    source: "Certificate ID",
    result: "Not Found",
    location: "Chennai, India",
  },
  {
    id: "VER-006",
    certificateId: "CERT-2026-000181",
    recipient: "Sneha Patel",
    course: "UI/UX Design",
    verifiedAt: "Sep 08, 2026 • 02:35 PM",
    source: "QR Code",
    result: "Verified",
    location: "Pune, India",
  },
  {
    id: "VER-007",
    certificateId: "CERT-2026-000179",
    recipient: "Ananya Rao",
    course: "Cloud Computing",
    verifiedAt: "Sep 07, 2026 • 10:48 AM",
    source: "Verification URL",
    result: "Verified",
    location: "Delhi, India",
  },
];

export default function VerificationReport() {
  const [search, setSearch] = useState("");
  const [resultFilter, setResultFilter] = useState("All Results");
  const [period, setPeriod] = useState("Last 30 Days");

  const filteredRecords = useMemo(() => {
    const value = search.toLowerCase().trim();

    return verificationRecords.filter((record) => {
      const matchesSearch =
        !value ||
        record.id.toLowerCase().includes(value) ||
        record.certificateId.toLowerCase().includes(value) ||
        record.recipient.toLowerCase().includes(value) ||
        record.course.toLowerCase().includes(value) ||
        record.location.toLowerCase().includes(value);

      const matchesResult =
        resultFilter === "All Results" ||
        record.result === resultFilter;

      return matchesSearch && matchesResult;
    });
  }, [search, resultFilter]);

  const verifiedCount = verificationRecords.filter(
    (record) => record.result === "Verified",
  ).length;

  const revokedCount = verificationRecords.filter(
    (record) => record.result === "Revoked",
  ).length;

  const notFoundCount = verificationRecords.filter(
    (record) => record.result === "Not Found",
  ).length;

  const totalVerifications = verificationRecords.length;

  const verificationRate = Math.round(
    (verifiedCount / totalVerifications) * 100,
  );

  const handleExport = () => {
    const headers = [
      "Verification ID",
      "Certificate ID",
      "Recipient",
      "Course",
      "Verified At",
      "Source",
      "Result",
      "Location",
    ];

    const rows = verificationRecords.map((record) => [
      record.id,
      record.certificateId,
      record.recipient,
      record.course,
      record.verifiedAt,
      record.source,
      record.result,
      record.location,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${value.replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "verification-report.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout activeItem="Verification Report">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <span>/</span>
              <span>Reports</span>
              <span>/</span>
              <span className="text-slate-700">
                Verification Report
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Verification Report
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor public certificate verification activity and results.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Download size={17} />
            Export Report
          </button>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search certificate, recipient, course or location..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="relative">
              <select
                value={resultFilter}
                onChange={(event) => setResultFilter(event.target.value)}
                className="min-w-[170px] appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:border-blue-500"
              >
                <option>All Results</option>
                <option>Verified</option>
                <option>Revoked</option>
                <option>Not Found</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <div className="relative">
              <CalendarDays
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className="min-w-[180px] appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-slate-700 focus:border-blue-500"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Verifications"
            value={String(totalVerifications)}
            description="Public verification attempts"
            icon={<Activity size={24} />}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            title="Verified"
            value={String(verifiedCount)}
            description={`${verificationRate}% successful verification rate`}
            icon={<CheckCircle2 size={24} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            title="Revoked"
            value={String(revokedCount)}
            description="Previously valid certificates"
            icon={<XCircle size={24} />}
            iconClass="bg-red-50 text-red-600"
          />

          <StatCard
            title="Not Found"
            value={String(notFoundCount)}
            description="Unknown certificate records"
            icon={<FileSearch size={24} />}
            iconClass="bg-orange-50 text-orange-600"
          />
        </div>

        {/* Analytics */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* Verification Trend */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Verification Trend
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Verification activity over the selected period.
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <BarChart3 size={20} />
              </div>
            </div>

            <div className="mt-8 flex h-56 items-end gap-3 border-b border-l border-slate-200 px-4">
              {[
                { day: "Mon", value: 38 },
                { day: "Tue", value: 52 },
                { day: "Wed", value: 44 },
                { day: "Thu", value: 68 },
                { day: "Fri", value: 58 },
                { day: "Sat", value: 74 },
                { day: "Sun", value: 62 },
              ].map((item) => (
                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-xs font-semibold text-slate-500">
                    {item.value}
                  </span>

                  <div
                    className="w-full max-w-10 rounded-t-lg bg-blue-500 transition hover:bg-blue-600"
                    style={{
                      height: `${item.value * 1.8}px`,
                    }}
                  />

                  <span className="mb-2 text-xs text-slate-400">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Sources */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Verification Sources
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  How certificates are being verified.
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600">
                <ShieldCheck size={20} />
              </div>
            </div>

            <div className="mt-7 space-y-6">
              <SourceRow
                icon={<QrCodeIcon />}
                title="QR Code"
                value={57}
                count={4}
              />

              <SourceRow
                icon={<Globe2 size={20} />}
                title="Verification URL"
                value={29}
                count={2}
              />

              <SourceRow
                icon={<Award size={20} />}
                title="Certificate ID"
                value={14}
                count={1}
              />
            </div>
          </div>
        </div>

        {/* Recent Verification Activity */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Verification Activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Detailed public verification records.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              {filteredRecords.length} records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Verification
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Certificate
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Recipient
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Source
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Location
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Result
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {record.id}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {record.verifiedAt}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      {record.result === "Not Found" ? (
                        <span className="font-semibold text-slate-500">
                          {record.certificateId}
                        </span>
                      ) : (
                        <Link
                          to={`/certificates/${record.certificateId}`}
                          className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                          {record.certificateId}
                        </Link>
                      )}

                      <p className="mt-1 text-xs text-slate-400">
                        {record.course}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-800">
                      {record.recipient}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                        {record.source}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {record.location}
                    </td>

                    <td className="px-5 py-4">
                      {record.result === "Verified" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 size={14} />
                          Verified
                        </span>
                      )}

                      {record.result === "Revoked" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                          <XCircle size={14} />
                          Revoked
                        </span>
                      )}

                      {record.result === "Not Found" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700">
                          <FileSearch size={14} />
                          Not Found
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="py-14 text-center">
              <FileSearch
                size={40}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-3 font-semibold text-slate-800">
                No verification records found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or result filter.
              </p>
            </div>
          )}
        </div>

        {/* Security Information */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex gap-4">
            <div className="shrink-0 rounded-xl bg-white p-3 text-blue-600 shadow-sm">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3 className="font-bold text-blue-900">
                Verification Security
              </h3>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                Every successful verification checks the certificate ID,
                certificate status and public verification record. Revoked
                certificates remain visible in the verification history but
                are clearly marked as invalid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function SourceRow({
  icon,
  title,
  value,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  count: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <div className="text-slate-500">{icon}</div>

        <span className="flex-1 text-sm font-semibold text-slate-700">
          {title}
        </span>

        <span className="text-sm font-bold text-slate-800">
          {count}
        </span>

        <span className="text-xs text-slate-400">
          {value}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function QrCodeIcon() {
  return (
    <div className="grid h-5 w-5 grid-cols-2 gap-0.5">
      <span className="rounded-sm border-2 border-current" />
      <span className="rounded-sm border-2 border-current" />
      <span className="rounded-sm border-2 border-current" />
      <span className="rounded-sm border-2 border-current" />
    </div>
  );
}