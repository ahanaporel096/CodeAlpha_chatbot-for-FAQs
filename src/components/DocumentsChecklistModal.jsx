import { useState } from 'react'

const INITIAL_DOCS = [
  { id: 1, title: '10th & 12th Mark Sheets and Passing Certificates', category: 'Academic', required: true, checked: false },
  { id: 2, title: 'Transfer Certificate (TC) / College Leaving Certificate', category: 'Academic', required: true, checked: false },
  { id: 3, title: 'Migration Certificate (for other state/boards)', category: 'Academic', required: false, checked: false },
  { id: 4, title: 'Government Photo ID Proof (Aadhaar Card / Passport)', category: 'Identity', required: true, checked: false },
  { id: 5, title: '4 Recent Color Passport-Size Photographs', category: 'Identity', required: true, checked: false },
  { id: 6, title: 'Category / Caste / EWS Certificate (if applicable)', category: 'Category', required: false, checked: false },
  { id: 7, title: 'National/State Entrance Exam Scorecard / Rank Card', category: 'Academic', required: true, checked: false },
  { id: 8, title: 'Medical Fitness Certificate from Registered Doctor', category: 'Medical', required: false, checked: false },
  { id: 9, title: 'Admission Application Fee Payment Receipt', category: 'Finance', required: true, checked: false },
]

export default function DocumentsChecklistModal({ isOpen, onClose }) {
  const [docs, setDocs] = useState(INITIAL_DOCS)

  if (!isOpen) return null

  const toggleCheck = (id) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, checked: !d.checked } : d))
    )
  }

  const completedCount = docs.filter((d) => d.checked).length
  const progressPercent = Math.round((completedCount / docs.length) * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-[fadeInUp_0.2s_ease-out]">
      <div className="theme-panel text-slate-100 w-full max-w-xl rounded-3xl shadow-2xl border border-[var(--theme-border)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[var(--theme-border)] flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl theme-button flex items-center justify-center shadow-lg text-white">
              <span className="material-symbols-outlined text-[22px]">
                checklist
              </span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-white">Admission Documents Checklist</h3>
              <p className="text-[12px] text-slate-400">
                Track and verify all paperwork required for college enrollment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[19px]">close</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center justify-between text-[12px] font-medium text-slate-300 mb-1.5">
            <span>Prepared Documents</span>
            <span className="font-mono text-[var(--theme-accent)]">{completedCount} of {docs.length} ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full theme-button transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Checklist List */}
        <div className="p-6 space-y-2.5 overflow-y-auto flex-1">
          {docs.map((doc) => (
            <label
              key={doc.id}
              className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                doc.checked
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : 'bg-black/20 border-[var(--theme-border)] hover:border-white/20 text-slate-200'
              }`}
            >
              <input
                type="checkbox"
                checked={doc.checked}
                onChange={() => toggleCheck(doc.id)}
                className="mt-0.5 rounded border-gray-600 text-emerald-500 focus:ring-emerald-400 w-4 h-4 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[13.5px] font-semibold leading-snug ${doc.checked ? 'line-through text-slate-400' : ''}`}>
                    {doc.title}
                  </span>
                  {doc.required && (
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-mono uppercase font-bold">
                      Mandatory
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                  Category: {doc.category}
                </span>
              </div>
            </label>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[var(--theme-border)] flex items-center justify-between bg-black/20">
          <button
            type="button"
            onClick={() => setDocs(INITIAL_DOCS)}
            className="text-[12px] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Reset Checklist
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl theme-button text-white text-[13px] font-bold shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  )
}
