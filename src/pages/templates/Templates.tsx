import { useMemo, useState } from "react";
import {
    Check,
    Eye,
    Plus,
    Search,
    Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { certificateTemplates } from "../../data/certificateTemplates";
import type { CertificateTemplate } from "../../data/certificateTemplates";

export default function Templates() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] =
        useState("");

    const [category, setCategory] =
        useState("All");

    const [selectedTemplate, setSelectedTemplate] =
        useState<number | null>(null);

    const categories = [
        "All",
        ...Array.from(
            new Set(
                certificateTemplates.map(
                    (template) => template.category
                )
            )
        ),
    ];

    const filteredTemplates = useMemo(() => {
        return certificateTemplates.filter(
            (template) => {
                const matchesSearch =
                    template.name
                        .toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        ) ||
                    template.description
                        .toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        );

                const matchesCategory =
                    category === "All" ||
                    template.category === category;

                return (
                    matchesSearch &&
                    matchesCategory
                );
            }
        );
    }, [searchTerm, category]);

    return (
        <DashboardLayout activeItem="Templates">

            <div className="space-y-6">

                {/* HEADER */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>
                        <div className="flex items-center gap-2">
                            <Sparkles
                                size={22}
                                className="text-blue-600"
                            />

                            <h1 className="text-2xl font-bold text-slate-900">
                                Certificate Templates
                            </h1>
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                            Choose from professionally designed
                            certificate templates.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/templates/designer"
                            )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        Create Template
                    </button>

                </div>

                {/* SUMMARY */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Total Templates
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {certificateTemplates.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Categories
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {categories.length - 1}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Available Designs
                        </p>

                        <p className="mt-2 text-3xl font-bold text-blue-600">
                            Ready to use
                        </p>
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
                                    setSearchTerm(
                                        event.target.value
                                    )
                                }
                                placeholder="Search templates..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {/* CATEGORIES */}
                        <div className="flex flex-wrap gap-2">

                            {categories.map(
                                (item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() =>
                                            setCategory(item)
                                        }
                                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${category === item
                                                ? "bg-blue-600 text-white"
                                                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                )
                            )}

                        </div>

                    </div>

                </div>

                {/* TEMPLATE GRID */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {filteredTemplates.map(
                        (template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                selected={
                                    selectedTemplate ===
                                    template.id
                                }
                                onSelect={() =>
                                    setSelectedTemplate(
                                        template.id
                                    )
                                }
                            />
                        )
                    )}

                </div>

                {filteredTemplates.length === 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
                        <Search
                            size={35}
                            className="mx-auto text-slate-300"
                        />

                        <h3 className="mt-4 font-semibold text-slate-900">
                            No templates found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Try a different search or category.
                        </p>
                    </div>
                )}

            </div>

        </DashboardLayout>
    );
}

interface TemplateCardProps {
    template: CertificateTemplate;
    selected: boolean;
    onSelect: () => void;
}

function TemplateCard({
    template,
    selected,
    onSelect,
}: TemplateCardProps) {
    return (
        <div
            className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${selected
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-slate-200"
                }`}
        >

            {/* PREVIEW */}
            <div className="bg-slate-100 p-5">

                <div
                    className="relative aspect-[1.414/1] overflow-hidden bg-white shadow-md"
                    style={{
                        border: `8px solid ${template.primaryColor}`,
                    }}
                >

                    {/* INNER BORDER */}
                    <div
                        className="absolute inset-2"
                        style={{
                            border: `2px solid ${template.primaryColor}`,
                        }}
                    />

                    {/* TOP DECORATION */}
                    <div className="absolute left-1/2 top-5 -translate-x-1/2">
                        <div
                            className="flex h-9 w-9 items-center justify-center rounded-full"
                            style={{
                                backgroundColor:
                                    template.primaryColor,
                                color:
                                    template.secondaryColor,
                            }}
                        >
                            <AwardIcon />
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">

                        <div
                            className="text-[7px] font-bold uppercase tracking-[0.25em]"
                            style={{
                                color:
                                    template.primaryColor,
                            }}
                        >
                            Certificate of Completion
                        </div>

                        <div
                            className="mt-2 text-[14px] font-bold"
                            style={{
                                color:
                                    template.accentColor,
                            }}
                        >
                            CERTIFYHUB
                        </div>

                        <div className="mt-3 h-px w-24 bg-slate-300" />

                        <div
                            className="mt-3 text-[9px] italic"
                            style={{
                                color:
                                    template.accentColor,
                            }}
                        >
                            This certificate is proudly presented to
                        </div>

                        <div
                            className="mt-2 text-[15px] font-bold"
                            style={{
                                color:
                                    template.primaryColor,
                            }}
                        >
                            John Doe
                        </div>

                        <div className="mt-2 text-[7px] text-slate-500">
                            For successfully completing
                        </div>

                        <div
                            className="mt-1 text-[9px] font-semibold"
                            style={{
                                color:
                                    template.accentColor,
                            }}
                        >
                            Advanced Web Development
                        </div>

                        <div className="mt-4 flex gap-8 text-[6px] text-slate-400">
                            <span>Issue Date</span>
                            <span>Certificate ID</span>
                        </div>

                    </div>

                    {/* CORNER ACCENTS */}
                    <div
                        className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2"
                        style={{
                            borderColor:
                                template.primaryColor,
                        }}
                    />

                    <div
                        className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2"
                        style={{
                            borderColor:
                                template.primaryColor,
                        }}
                    />

                </div>

            </div>

            {/* DETAILS */}
            <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                    <div>
                        <h3 className="font-bold text-slate-900">
                            {template.name}
                        </h3>

                        <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {template.category}
                        </span>
                    </div>

                    {selected && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                            <Check size={17} />
                        </div>
                    )}

                </div>

                <p className="mt-3 min-h-[40px] text-sm leading-5 text-slate-500">
                    {template.description}
                </p>

                {/* COLOR PREVIEW */}
                <div className="mt-4 flex items-center gap-2">

                    <span
                        className="h-5 w-5 rounded-full border border-white shadow"
                        style={{
                            backgroundColor:
                                template.primaryColor,
                        }}
                    />

                    <span
                        className="h-5 w-5 rounded-full border border-white shadow"
                        style={{
                            backgroundColor:
                                template.secondaryColor,
                        }}
                    />

                    <span
                        className="h-5 w-5 rounded-full border border-white shadow"
                        style={{
                            backgroundColor:
                                template.accentColor,
                        }}
                    />

                </div>

                {/* ACTIONS */}
                <div className="mt-5 flex gap-2">

                    <button
                        type="button"
                        onClick={onSelect}
                        className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold ${selected
                                ? "bg-blue-600 text-white"
                                : "bg-slate-900 text-white hover:bg-slate-800"
                            }`}
                    >
                        {selected
                            ? "Selected"
                            : "Select Template"}
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            alert(
                                `Preview: ${template.name}`
                            )
                        }
                        className="flex items-center justify-center rounded-xl border border-slate-200 px-4 text-slate-600 hover:bg-slate-50"
                    >
                        <Eye size={18} />
                    </button>

                </div>

            </div>

        </div>
    );
}

function AwardIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle
                cx="12"
                cy="8"
                r="6"
            />
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.12" />
        </svg>
    );
}