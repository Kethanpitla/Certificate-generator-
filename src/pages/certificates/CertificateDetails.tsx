import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  FileText,
  History,
  Mail,
  QrCode,
  ShieldCheck,
  User,
  X,
  XCircle,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const certificateData = {
  id: "CERT-2026-000184",
  recipient: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  course: "Advanced Web Development",
  template: "Professional Blue",
  issueDate: "September 10, 2026",
  completionDate: "September 09, 2026",
  grade: "A+",
  score: "94%",
  status: "Active",
  issuer: "Admin User",
  generationTime: "September 10, 2026 at 10:42 AM",
  verificationCode: "VH8K2P91",
  verificationUrl: "https://certifyhub.example.com/verify/VH8K2P91",
};

export default function CertificateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [revokeReason, setRevokeReason] = useState("");
  const [status, setStatus] = useState(certificateData.status);

  const certificate = {
    ...certificateData,
    id: id || certificateData.id,
  };

  const handleDownload = () => {
    const content = `
CERTIFICATE OF COMPLETION

Certificate ID: ${certificate.id}

This certificate is proudly presented to

${certificate.recipient}

for successfully completing

${certificate.course}

Grade: ${certificate.grade}
Score: ${certificate.score}

Completion Date: ${certificate.completionDate}
Issue Date: ${certificate.issueDate}

Issued by: ${certificate.issuer}

Verification Code: ${certificate.verificationCode}
Verification URL: ${certificate.verificationUrl}

Status: ${status}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${certificate.id}.txt`;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const handleRevoke = () => {
    if (!revokeReason.trim()) {
      return;
    }

    setStatus("Revoked");
    setShowRevokeModal(false);
    setRevokeReason("");
  };

  return (
    <DashboardLayout activeItem="All Certificates">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <span>/</span>
            <Link to="/certificates" className="hover:text-blue-600">
              Certificates
            </Link>
            <span>/</span>
            <span className="text-slate-700">{certificate.id}</span>
          </div>

          <button
            onClick={() => navigate("/certificates")}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Certificates
          </button>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Certificate Details
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View certificate information, verification data and audit
                history.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <Download size={17} />
                Download
              </button>

              {status === "Active" && (
                <button
                  onClick={() => setShowRevokeModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  <XCircle size={17} />
                  Revoke Certificate
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div
          className={`rounded-2xl border p-5 ${
            status === "Active"
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`rounded-full p-3 ${
                  status === "Active"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {status === "Active" ? (
                  <CheckCircle2 size={28} />
                ) : (
                  <XCircle size={28} />
                )}
              </div>

              <div>
                <p
                  className={`text-lg font-bold ${
                    status === "Active"
                      ? "text-emerald-800"
                      : "text-red-800"
                  }`}
                >
                  Certificate {status}
                </p>

                <p
                  className={`mt-1 text-sm ${
                    status === "Active"
                      ? "text-emerald-700"
                      : "text-red-700"
                  }`}
                >
                  {status === "Active"
                    ? "This certificate is valid and can be publicly verified."
                    : "This certificate has been revoked and is no longer valid."}
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                status === "Active"
                  ? "bg-white text-emerald-700"
                  : "bg-white text-red-700"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          {/* Certificate Preview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Certificate Preview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Generated certificate document
                </p>
              </div>

              <FileText className="text-slate-400" size={22} />
            </div>

            <div className="flex min-h-[520px] items-center justify-center rounded-xl bg-slate-100 p-5">
              <div className="relative w-full max-w-[760px] overflow-hidden border-[10px] border-double border-blue-900 bg-white px-8 py-12 text-center shadow-xl sm:px-14">
                <div className="absolute left-0 top-0 h-2 w-full bg-blue-700" />

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                  <Award size={34} />
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-blue-700">
                  Certificate of Completion
                </p>

                <h3 className="mt-8 text-2xl font-serif font-bold text-slate-900 sm:text-4xl">
                  {certificate.recipient}
                </h3>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-500">
                  This certificate is proudly presented for successfully
                  completing the course
                </p>

                <h4 className="mt-4 text-xl font-bold text-slate-800 sm:text-2xl">
                  {certificate.course}
                </h4>

                <div className="mx-auto mt-7 h-px max-w-md bg-slate-200" />

                <div className="mt-7 flex flex-wrap justify-center gap-8 text-sm">
                  <div>
                    <p className="text-xs text-slate-400">Grade</p>
                    <p className="mt-1 font-bold text-blue-700">
                      {certificate.grade}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Score</p>
                    <p className="mt-1 font-bold text-slate-800">
                      {certificate.score}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Issued</p>
                    <p className="mt-1 font-bold text-slate-800">
                      {certificate.issueDate}
                    </p>
                  </div>
                </div>

                <div className="mt-9 flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-5 sm:flex-row">
                  <div className="text-left">
                    <p className="text-xs text-slate-400">Certificate ID</p>
                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {certificate.id}
                    </p>
                  </div>

                  <div className="flex h-20 w-20 items-center justify-center border border-slate-200 bg-white">
                    <QrCode size={58} className="text-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <FileText size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Certificate Information
                  </h2>
                  <p className="text-xs text-slate-500">
                    Certificate metadata
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <InfoRow
                  icon={<Award size={17} />}
                  label="Certificate ID"
                  value={certificate.id}
                />

                <InfoRow
                  icon={<User size={17} />}
                  label="Recipient"
                  value={certificate.recipient}
                />

                <InfoRow
                  icon={<Mail size={17} />}
                  label="Email"
                  value={certificate.email}
                />

                <InfoRow
                  icon={<FileText size={17} />}
                  label="Course"
                  value={certificate.course}
                />

                <InfoRow
                  icon={<FileText size={17} />}
                  label="Template"
                  value={certificate.template}
                />

                <InfoRow
                  icon={<CalendarDays size={17} />}
                  label="Completion Date"
                  value={certificate.completionDate}
                />

                <InfoRow
                  icon={<CalendarDays size={17} />}
                  label="Issue Date"
                  value={certificate.issueDate}
                />

                <InfoRow
                  icon={<ShieldCheck size={17} />}
                  label="Issuer"
                  value={certificate.issuer}
                />
              </div>
            </div>

            {/* QR Verification */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600">
                  <QrCode size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    QR Verification
                  </h2>
                  <p className="text-xs text-slate-500">
                    Public verification information
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-slate-50 p-5">
                <div className="flex h-36 w-36 items-center justify-center rounded-xl border-4 border-white bg-white shadow-sm">
                  <QrCode size={112} className="text-slate-900" />
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Verification Code
                </p>

                <p className="mt-1 text-lg font-bold tracking-wider text-slate-900">
                  {certificate.verificationCode}
                </p>

                <a
                  href={`/verify/${certificate.verificationCode}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Open Verification Page
                  <ExternalLink size={15} />
                </a>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
                <p className="mb-1 text-xs font-medium text-slate-400">
                  Verification URL
                </p>

                <p className="break-all text-xs text-slate-600">
                  {certificate.verificationUrl}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Verification History */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <History size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Verification History
                </h2>
                <p className="text-xs text-slate-500">
                  Recent public verification activity
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <TimelineItem
                title="Certificate verified"
                description="Public verification completed successfully"
                time="Sep 10, 2026 • 11:18 AM"
                icon={<CheckCircle2 size={16} />}
              />

              <TimelineItem
                title="Certificate verified"
                description="QR verification page accessed"
                time="Sep 10, 2026 • 10:58 AM"
                icon={<ShieldCheck size={16} />}
              />

              <TimelineItem
                title="Certificate issued"
                description="Certificate generated successfully"
                time="Sep 10, 2026 • 10:42 AM"
                icon={<Award size={16} />}
                last
              />
            </div>
          </div>

          {/* Audit Trail */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-orange-50 p-2.5 text-orange-600">
                <Clock3 size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Audit Trail
                </h2>
                <p className="text-xs text-slate-500">
                  System activity for this certificate
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <AuditRow
                action="Certificate generated"
                user={certificate.issuer}
                time={certificate.generationTime}
              />

              <AuditRow
                action="QR code generated"
                user="Certificate System"
                time="September 10, 2026 at 10:42 AM"
              />

              <AuditRow
                action="Certificate stored"
                user="Certificate System"
                time="September 10, 2026 at 10:42 AM"
              />

              <AuditRow
                action="Certificate emailed"
                user="Notification Service"
                time="September 10, 2026 at 10:43 AM"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:justify-between">
          <Link
            to="/certificates/generate"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Award size={17} />
            Generate Another
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Download size={17} />
              Download Certificate
            </button>

            {status === "Active" && (
              <button
                onClick={() => setShowRevokeModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                <XCircle size={17} />
                Revoke
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Revoke Modal */}
      {showRevokeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <XCircle size={24} />
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Revoke Certificate?
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  This action will make the certificate invalid for public
                  verification.
                </p>
              </div>

              <button
                onClick={() => setShowRevokeModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Reason for revocation
              </label>

              <textarea
                value={revokeReason}
                onChange={(event) => setRevokeReason(event.target.value)}
                rows={4}
                placeholder="Enter the reason for revoking this certificate..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowRevokeModal(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleRevoke}
                disabled={!revokeReason.trim()}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                Revoke Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-slate-400">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function TimelineItem({
  title,
  description,
  time,
  icon,
  last = false,
}: {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-4">
      {!last && (
        <div className="absolute left-[15px] top-8 h-full w-px bg-slate-200" />
      )}

      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        {icon}
      </div>

      <div className="pb-2">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
        <p className="mt-2 text-xs font-medium text-slate-400">{time}</p>
      </div>
    </div>
  );
}

function AuditRow({
  action,
  user,
  time,
}: {
  action: string;
  user: string;
  time: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-800">{action}</p>
      <div className="mt-2 flex flex-col gap-1 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>By {user}</span>
        <span>{time}</span>
      </div>
    </div>
  );
}