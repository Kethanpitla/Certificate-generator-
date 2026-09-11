import { type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  FileImage,
  ImagePlus,
  QrCode,
  Save,
  Upload,
  UserRound,
  X,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

export default function TemplateDesigner() {
  const navigate = useNavigate();

  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Course Completion");

  const [background, setBackground] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);

  const [saved, setSaved] = useState(false);

  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement>,
    type: "background" | "logo",
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    if (type === "background") {
      setBackground(imageUrl);
    } else {
      setLogo(imageUrl);
    }
  };

  const handleSave = () => {
    if (!templateName.trim()) {
      return;
    }

    setSaved(true);

    setTimeout(() => {
      navigate("/templates");
    }, 1200);
  };

  return (
    <DashboardLayout activeItem="Templates">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/templates")}
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Template Designer
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create a professional certificate template.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/templates")}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!templateName.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-300"
            >
              {saved ? <Check size={18} /> : <Save size={18} />}
              {saved ? "Saved" : "Save Template"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_1fr]">
          {/* Left Configuration Panel */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Template Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter the basic details for your certificate.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Template Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={templateName}
                    onChange={(event) =>
                      setTemplateName(event.target.value)
                    }
                    placeholder="e.g. Professional Course Certificate"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    placeholder="Describe this certificate template..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:bg-white"
                  >
                    <option>Course Completion</option>
                    <option>Achievement</option>
                    <option>Excellence</option>
                    <option>Participation</option>
                    <option>Award</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Background Upload */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Certificate Background
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Upload a background image for your certificate.
              </p>

              <div className="mt-5">
                {background ? (
                  <div className="relative overflow-hidden rounded-xl border border-slate-200">
                    <img
                      src={background}
                      alt="Certificate background preview"
                      className="h-40 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => setBackground(null)}
                      className="absolute right-2 top-2 rounded-lg bg-white p-2 text-red-500 shadow-sm"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50">
                    <div className="rounded-xl bg-white p-3 text-blue-600 shadow-sm">
                      <ImagePlus size={24} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      Upload background
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PNG, JPG or JPEG
                    </p>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      className="hidden"
                      onChange={(event) =>
                        handleImageUpload(event, "background")
                      }
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Logo Upload */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Organization Logo
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add your organization logo to the certificate.
              </p>

              <div className="mt-5">
                {logo ? (
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={logo}
                        alt="Organization logo"
                        className="h-14 w-14 rounded-lg border border-slate-200 bg-white object-contain p-1"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Logo uploaded
                        </p>

                        <p className="text-xs text-slate-400">
                          Ready for certificate
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLogo(null)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <X size={17} />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-blue-400 hover:bg-blue-50">
                    <div className="rounded-xl bg-white p-3 text-blue-600 shadow-sm">
                      <Upload size={22} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Upload organization logo
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        PNG, JPG or SVG
                      </p>
                    </div>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                      className="hidden"
                      onChange={(event) =>
                        handleImageUpload(event, "logo")
                      }
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Right Preview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Live Preview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Preview how the certificate will look.
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                A4 Landscape
              </span>
            </div>

            {/* Certificate */}
            <div className="mt-6 flex min-h-[650px] items-center justify-center overflow-hidden rounded-2xl bg-slate-100 p-5 lg:p-10">
              <div
                className="relative aspect-[1.414/1] w-full max-w-[900px] overflow-hidden border-[12px] border-double border-blue-700 bg-white shadow-2xl"
                style={{
                  backgroundImage: background
                    ? `url(${background})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!background && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />
                )}

                <div className="absolute inset-4 border border-blue-200" />

                <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                  {logo ? (
                    <img
                      src={logo}
                      alt="Organization logo"
                      className="mb-4 h-16 w-16 object-contain"
                    />
                  ) : (
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-200 bg-white/90 text-blue-600">
                      <FileImage size={27} />
                    </div>
                  )}

                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-blue-600 sm:text-xs">
                    Certificate of Completion
                  </p>

                  <h3 className="mt-4 text-xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                    {templateName || "Certificate Title"}
                  </h3>

                  <p className="mt-3 text-[10px] text-slate-500 sm:text-xs lg:text-sm">
                    This certificate is proudly presented to
                  </p>

                  <div className="mt-2 border-b-2 border-slate-300 px-8 pb-2">
                    <p className="text-lg font-bold italic text-slate-800 sm:text-2xl lg:text-3xl">
                      Recipient Name
                    </p>
                  </div>

                  <p className="mt-4 max-w-lg text-[9px] leading-4 text-slate-500 sm:text-xs lg:text-sm">
                    For successfully completing the required course and
                    demonstrating the knowledge and skills expected for
                    successful completion.
                  </p>

                  <div className="mt-5 flex w-full max-w-xl items-end justify-between gap-5">
                    <div className="text-center">
                      <div className="mb-1 h-px w-20 bg-slate-400 sm:w-28" />

                      <p className="text-[8px] text-slate-500 sm:text-[10px]">
                        Authorized Signature
                      </p>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center border border-slate-300 bg-white/90 sm:h-20 sm:w-20">
                      <QrCode className="h-10 w-10 text-slate-700 sm:h-12 sm:w-12" />
                    </div>

                    <div className="text-center">
                      <div className="mb-1 h-px w-20 bg-slate-400 sm:w-28" />

                      <p className="text-[8px] text-slate-500 sm:text-[10px]">
                        Date of Completion
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-5 left-0 right-0 text-center">
                    <p className="text-[7px] font-medium text-slate-400 sm:text-[9px]">
                      Certificate ID: CERT-XXXXXXXX
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Fields */}
            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="text-sm font-bold text-blue-900">
                Dynamic Certificate Fields
              </h3>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                These fields will automatically be populated when a
                certificate is generated.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-xs font-medium text-slate-700">
                  <UserRound size={15} className="text-blue-600" />
                  Recipient Name
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-xs font-medium text-slate-700">
                  <FileImage size={15} className="text-blue-600" />
                  Course Title
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-xs font-medium text-slate-700">
                  <QrCode size={15} className="text-blue-600" />
                  QR Code
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-xs font-medium text-slate-700">
                  <Check size={15} className="text-blue-600" />
                  Certificate ID
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}