import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import logo from "../../../assets/images/NTF_logo_black.png";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const loadSavedPaper = (storageKey) => {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    if (parsed.some((s) => s.questions)) return parsed;
    if (parsed.length > 0) return [{ id: 1, name: "Section A", questions: parsed }];
    return [];
  } catch {
    return [];
  }
};

const QuestionPaperPreview = ({ level = "L0" }) => {
  const navigate = useNavigate();
  const storageKey = `${level.toLowerCase()}_question_paper`;
  const editorPath = `/lms/${level.toLowerCase()}`;
  const levelLabel = level === "L0" ? "Day 1" : "Day 2";
  const [sections] = useState(() => loadSavedPaper(storageKey));
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [paperMeta] = useState(() => {
    try {
      const raw = localStorage.getItem(`${storageKey}_meta`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const totalQuestions = sections.reduce((acc, s) => acc + (s.questions?.length || 0), 0);
  const totalMarks = sections.reduce(
    (acc, s) => acc + (s.questions?.reduce((qa, q) => qa + (Number(q.marks) || 0), 0) || 0),
    0
  );

  const testTitle = paperMeta.headerTitle || "SKILL EVALUATION TEST PAPER";
  const subTitle = paperMeta.subTitle || `New Manpower for ${levelLabel}`;
  const department = paperMeta.departments || "Production";
  const duration = paperMeta.duration || 60;

  return (
    <div className="min-h-screen bg-[#F5F7FB] print:bg-white">

      {/* ── Sticky Top Toolbar (hidden in print) ── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-xs print:hidden">
        <div className="h-14 px-4 sm:px-8 flex items-center justify-between max-w-5xl mx-auto gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => navigate(editorPath)}
              className="h-9 w-9 rounded-xl bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary transition flex items-center justify-center shrink-0"
              title="Back to editor"
            >
              <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
            </button>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-gray-900 truncate leading-tight">
                Question Paper Preview
              </h1>
              <p className="text-[11px] text-gray-500 truncate">Print-ready examination layout</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className={`h-9 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                showAnswerKey
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
              }`}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: 15 }} />
              <span className="hidden sm:inline">{showAnswerKey ? "Answer Key" : "Student View"}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(editorPath)}
              className="h-9 rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center gap-1.5"
            >
              <EditOutlinedIcon sx={{ fontSize: 15 }} />
              <span className="hidden sm:inline">Edit</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="h-9 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:opacity-95 transition flex items-center gap-1.5"
            >
              <PrintOutlinedIcon sx={{ fontSize: 15 }} />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* ── A4 Paper Sheet ── */}
      <div className="max-w-[760px] mx-auto px-4 py-6 print:p-0 print:max-w-none">
        <div
          className="bg-white shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none"
          style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
        >
          <div className="p-8 sm:p-10 space-y-5 print:p-8">

            {/* ── PAPER HEADER ── */}
            <div className="flex items-start gap-5 pb-3 border-b border-gray-400">
              {/* Logo */}
              <div className="shrink-0">
                <img src={logo} alt="NTF Logo" className="h-12 w-auto object-contain" />
              </div>

              {/* Center Title Block */}
              <div className="flex-1 text-center">
                <h1 className="text-lg font-black text-gray-900 uppercase tracking-wide leading-tight">
                  {testTitle}
                </h1>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">{subTitle}</p>
              </div>
            </div>

            {/* ── METADATA BOX ── */}
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-[11px] text-gray-800">
                {/* Left column */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-22 font-semibold text-gray-700 shrink-0">Test Title</span>
                    <span className="text-gray-500 shrink-0">:</span>
                    <span className="flex-1 border-b border-gray-300 pb-0.5 text-gray-900 truncate font-medium">
                      {testTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-22 font-semibold text-gray-700 shrink-0">Department</span>
                    <span className="text-gray-500 shrink-0">:</span>
                    <span className="flex-1 border-b border-gray-300 pb-0.5 text-gray-900 truncate font-medium">
                      {department}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-22 font-semibold text-gray-700 shrink-0">Total Marks</span>
                    <span className="text-gray-500 shrink-0">:</span>
                    <span className="flex-1 border-b border-gray-300 pb-0.5 text-gray-900 font-medium">
                      {totalMarks}
                    </span>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-20 font-semibold text-gray-700 shrink-0">Duration</span>
                    <span className="text-gray-500 shrink-0">:</span>
                    <span className="flex-1 border-b border-gray-300 pb-0.5 text-gray-900 font-medium">
                      {duration} Min
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 font-semibold text-gray-700 shrink-0">Date</span>
                    <span className="text-gray-500 shrink-0">:</span>
                    <span className="flex-1 border-b border-gray-300 pb-0.5 text-gray-900 font-medium">
                      &nbsp;
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 font-semibold text-gray-700 shrink-0">Instructions</span>
                    <span className="text-gray-500 shrink-0">:</span>
                    <span className="flex-1 border-b border-gray-300 pb-0.5 text-gray-900 font-medium">
                      See below
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── INSTRUCTIONS BOX ── */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 print:bg-white print:border-gray-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-5 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <AssignmentOutlinedIcon sx={{ fontSize: 13, color: "#6F4AE7" }} />
                </div>
                <span className="text-[11px] font-black text-gray-800 uppercase tracking-widest">
                  Instructions
                </span>
              </div>
              <ul className="space-y-1 text-[11px] text-gray-700 pl-1">
                {[
                  "Read all the questions carefully before answering.",
                  "Choose the correct / most appropriate option.",
                  "Each question carries equal marks unless mentioned.",
                  "There is no negative marking.",
                  "Use of calculator or mobile phones is not allowed.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1 h-1 w-1 rounded-full bg-gray-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── SECTIONS ── */}
            {sections.length === 0 || totalQuestions === 0 ? (
              <div className="border-2 border-dashed border-gray-200 rounded-xl py-14 text-center">
                <p className="text-sm font-semibold text-gray-500">No questions added yet.</p>
                <button
                  type="button"
                  onClick={() => navigate(editorPath)}
                  className="mt-4 inline-flex h-10 items-center rounded-xl bg-primary px-5 text-xs font-semibold text-white shadow-sm"
                >
                  Go to Editor &amp; Add Questions
                </button>
              </div>
            ) : (
              sections.map((section, sIdx) => {
                const qs = section.questions || [];
                if (qs.length === 0) return null;

                // compute global start index for this section
                let globalStart = 1;
                for (let i = 0; i < sIdx; i++) {
                  globalStart += sections[i].questions?.length || 0;
                }

                const sectionMarks = qs.reduce((a, q) => a + (Number(q.marks) || 0), 0);

                // split into left and right columns
                const leftQs = qs.filter((_, i) => i % 2 === 0);
                const rightQs = qs.filter((_, i) => i % 2 !== 0);

                const leftGlobalStart = (localIdx) => globalStart + localIdx * 2;
                const rightGlobalStart = (localIdx) => globalStart + localIdx * 2 + 1;

                return (
                  <div key={section.id || sIdx} className="space-y-4 print:break-before-auto">

                    {/* ── Section Divider Banner ── */}
                    <div className="relative flex items-center my-4">
                      <div className="flex-1 h-px bg-gray-300" />
                      <div className="mx-3 px-5 py-1 rounded-full border border-primary/40 bg-primary/5 text-[11px] font-bold text-primary uppercase tracking-widest shrink-0 print:border-gray-400 print:text-gray-800 print:bg-white">
                        {section.name?.toUpperCase() || `SECTION – ${String.fromCharCode(65 + sIdx)}`}
                      </div>
                      <div className="flex-1 h-px bg-gray-300" />
                    </div>

                    {/* ── Two-Column Question Grid with center dashed border ── */}
                    <div className="grid grid-cols-2 gap-0 border-t border-gray-200">
                      {/* Left Column */}
                      <div className="pr-4 border-r border-dashed border-gray-300 space-y-5 pt-4">
                        {leftQs.map((q, li) => {
                          const num = leftGlobalStart(li);
                          return (
                            <div key={q.id || li} className="space-y-1.5 break-inside-avoid">
                              {/* Question text */}
                              <p className="text-[11px] font-semibold text-gray-900 leading-snug">
                                <span className="mr-1">{num}.</span>
                                {q.question || `Question ${num}`}
                              </p>
                              {/* Options in 2×2 grid */}
                              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 pl-3">
                                {q.options?.map((opt, oi) => {
                                  const isCorrect = showAnswerKey && q.correctOption === opt.id;
                                  return (
                                    <div
                                      key={opt.id}
                                      className={`flex items-start gap-1 text-[10.5px] leading-snug ${
                                        isCorrect ? "font-bold text-emerald-700" : "text-gray-700"
                                      }`}
                                    >
                                      <span className="shrink-0 font-medium">
                                        {ALPHABET[oi]})
                                      </span>
                                      <span className="truncate">{opt.value || `Option ${opt.label}`}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right Column */}
                      <div className="pl-4 space-y-5 pt-4">
                        {rightQs.map((q, ri) => {
                          const num = rightGlobalStart(ri);
                          if (num > globalStart + qs.length - 1) return null;
                          return (
                            <div key={q.id || ri} className="space-y-1.5 break-inside-avoid">
                              {/* Question text */}
                              <p className="text-[11px] font-semibold text-gray-900 leading-snug">
                                <span className="mr-1">{num}.</span>
                                {q.question || `Question ${num}`}
                              </p>
                              {/* Options in 2×2 grid */}
                              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 pl-3">
                                {q.options?.map((opt, oi) => {
                                  const isCorrect = showAnswerKey && q.correctOption === opt.id;
                                  return (
                                    <div
                                      key={opt.id}
                                      className={`flex items-start gap-1 text-[10.5px] leading-snug ${
                                        isCorrect ? "font-bold text-emerald-700" : "text-gray-700"
                                      }`}
                                    >
                                      <span className="shrink-0 font-medium">
                                        {ALPHABET[oi]})
                                      </span>
                                      <span className="truncate">{opt.value || `Option ${opt.label}`}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section marks indicator (right-aligned) */}
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-gray-500 italic">
                        ({sectionMarks} {sectionMarks === 1 ? "Mark" : "Marks"})
                      </span>
                    </div>
                  </div>
                );
              })
            )}

            </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default QuestionPaperPreview;
