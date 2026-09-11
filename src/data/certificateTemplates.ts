export interface CertificateTemplate {
  id: number;
  name: string;
  category: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  style: string;
}

export const certificateTemplates: CertificateTemplate[] = [
  {
    id: 1,
    name: "Classic Gold",
    category: "Professional",
    description:
      "Elegant traditional certificate with gold borders and premium typography.",
    primaryColor: "#b8860b",
    secondaryColor: "#fff8e1",
    accentColor: "#1e293b",
    style: "classic-gold",
  },
  {
    id: 2,
    name: "Royal Blue",
    category: "Professional",
    description:
      "Formal blue certificate suitable for academic and professional courses.",
    primaryColor: "#1d4ed8",
    secondaryColor: "#eff6ff",
    accentColor: "#172554",
    style: "royal-blue",
  },
  {
    id: 3,
    name: "Emerald Excellence",
    category: "Achievement",
    description:
      "Modern emerald design emphasizing achievement and completion.",
    primaryColor: "#059669",
    secondaryColor: "#ecfdf5",
    accentColor: "#064e3b",
    style: "emerald",
  },
  {
    id: 4,
    name: "Modern Minimal",
    category: "Modern",
    description:
      "Clean minimalist layout with plenty of whitespace and subtle accents.",
    primaryColor: "#334155",
    secondaryColor: "#f8fafc",
    accentColor: "#0f172a",
    style: "minimal",
  },
  {
    id: 5,
    name: "Corporate Navy",
    category: "Corporate",
    description:
      "Professional navy layout designed for corporate training programs.",
    primaryColor: "#0f172a",
    secondaryColor: "#e2e8f0",
    accentColor: "#2563eb",
    style: "corporate-navy",
  },
  {
    id: 6,
    name: "Academic Prestige",
    category: "Academic",
    description:
      "Formal academic certificate with deep blue and gold detailing.",
    primaryColor: "#1e3a8a",
    secondaryColor: "#fef3c7",
    accentColor: "#92400e",
    style: "academic",
  },
  {
    id: 7,
    name: "Purple Achievement",
    category: "Achievement",
    description:
      "Distinctive purple design for professional achievements.",
    primaryColor: "#7c3aed",
    secondaryColor: "#f5f3ff",
    accentColor: "#4c1d95",
    style: "purple",
  },
  {
    id: 8,
    name: "Crimson Honor",
    category: "Award",
    description:
      "Bold crimson certificate designed for awards and recognition.",
    primaryColor: "#b91c1c",
    secondaryColor: "#fef2f2",
    accentColor: "#450a0a",
    style: "crimson",
  },
  {
    id: 9,
    name: "Ocean Breeze",
    category: "Modern",
    description:
      "Fresh teal and blue layout with a contemporary visual style.",
    primaryColor: "#0891b2",
    secondaryColor: "#ecfeff",
    accentColor: "#164e63",
    style: "ocean",
  },
  {
    id: 10,
    name: "Midnight Luxe",
    category: "Premium",
    description:
      "Premium dark certificate design with sophisticated accents.",
    primaryColor: "#eab308",
    secondaryColor: "#1e293b",
    accentColor: "#f8fafc",
    style: "midnight",
  },
  {
    id: 11,
    name: "Rose Elegance",
    category: "Elegant",
    description:
      "Soft rose design with elegant borders and refined typography.",
    primaryColor: "#be185d",
    secondaryColor: "#fdf2f8",
    accentColor: "#831843",
    style: "rose",
  },
  {
    id: 12,
    name: "Tech Future",
    category: "Technology",
    description:
      "Contemporary technology-inspired certificate with sharp accents.",
    primaryColor: "#2563eb",
    secondaryColor: "#eff6ff",
    accentColor: "#0f172a",
    style: "tech",
  },
  {
    id: 13,
    name: "Green Learning",
    category: "Education",
    description:
      "Friendly green certificate suitable for educational programs.",
    primaryColor: "#16a34a",
    secondaryColor: "#f0fdf4",
    accentColor: "#14532d",
    style: "green-learning",
  },
  {
    id: 14,
    name: "Silver Professional",
    category: "Professional",
    description:
      "Sophisticated silver-gray design for professional certifications.",
    primaryColor: "#64748b",
    secondaryColor: "#f1f5f9",
    accentColor: "#1e293b",
    style: "silver",
  },
  {
    id: 15,
    name: "Sunset Award",
    category: "Award",
    description:
      "Warm orange certificate designed to celebrate achievement.",
    primaryColor: "#ea580c",
    secondaryColor: "#fff7ed",
    accentColor: "#7c2d12",
    style: "sunset",
  },
  {
    id: 16,
    name: "Skyline",
    category: "Modern",
    description:
      "Bright sky-blue design with a clean modern certificate layout.",
    primaryColor: "#0284c7",
    secondaryColor: "#f0f9ff",
    accentColor: "#0c4a6e",
    style: "skyline",
  },
  {
    id: 17,
    name: "Executive Black",
    category: "Corporate",
    description:
      "Strong black and gold executive certificate for corporate use.",
    primaryColor: "#111827",
    secondaryColor: "#f9fafb",
    accentColor: "#d4af37",
    style: "executive",
  },
  {
    id: 18,
    name: "Lavender Learning",
    category: "Education",
    description:
      "Soft lavender certificate suitable for online learning programs.",
    primaryColor: "#8b5cf6",
    secondaryColor: "#f5f3ff",
    accentColor: "#5b21b6",
    style: "lavender",
  },
  {
    id: 19,
    name: "Heritage",
    category: "Classic",
    description:
      "Traditional heritage-inspired certificate with a timeless appearance.",
    primaryColor: "#92400e",
    secondaryColor: "#fffbeb",
    accentColor: "#451a03",
    style: "heritage",
  },
  {
    id: 20,
    name: "Diamond Excellence",
    category: "Premium",
    description:
      "Premium geometric certificate representing excellence and distinction.",
    primaryColor: "#475569",
    secondaryColor: "#f8fafc",
    accentColor: "#0f172a",
    style: "diamond",
  },
  {
    id: 21,
    name: "Innovation",
    category: "Technology",
    description:
      "Creative certificate design for innovation and technology courses.",
    primaryColor: "#4f46e5",
    secondaryColor: "#eef2ff",
    accentColor: "#312e81",
    style: "innovation",
  },
  {
    id: 22,
    name: "Leadership",
    category: "Professional",
    description:
      "Confident certificate layout designed for leadership programs.",
    primaryColor: "#0369a1",
    secondaryColor: "#f0f9ff",
    accentColor: "#082f49",
    style: "leadership",
  },
  {
    id: 23,
    name: "Excellence Award",
    category: "Award",
    description:
      "Formal award certificate highlighting exceptional performance.",
    primaryColor: "#ca8a04",
    secondaryColor: "#fefce8",
    accentColor: "#713f12",
    style: "excellence",
  },
  {
    id: 24,
    name: "Digital Academy",
    category: "Technology",
    description:
      "Digital-first certificate design for modern online academies.",
    primaryColor: "#06b6d4",
    secondaryColor: "#ecfeff",
    accentColor: "#164e63",
    style: "digital",
  },
];

export const getTemplateById = (
  id: number
): CertificateTemplate | undefined => {
  return certificateTemplates.find(
    (template) => template.id === id
  );
};