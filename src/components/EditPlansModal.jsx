// components/EditPlansModal.jsx
import { X, User, Award, FileText, Calendar } from "lucide-react";

export default function EditPlansModal({ open, onClose, onSubmit, form, setForm }) {
  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-base-content/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-warning px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-base-100/20 flex items-center justify-center">
              <User className="text-base-100" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-base-100">Rejani tahrirlash</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-base-100/20 hover:bg-base-100/30 flex items-center justify-center group"
          >
            <X className="text-base-100 group-hover:rotate-90 transition-transform" size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto space-y-6">
          {/* Oy boshlanishi */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-warning" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Oy boshlanishi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                name="startMonth_uz"
                value={form.startMonth_uz || ""}
                onChange={handleChange}
                placeholder="UZ"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-warning focus:outline-none"
              />
              <input
                name="startMonth_ru"
                value={form.startMonth_ru || ""}
                onChange={handleChange}
                placeholder="RU"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-warning focus:outline-none"
              />
              <input
                name="startMonth_oz"
                value={form.startMonth_oz || ""}
                onChange={handleChange}
                placeholder="OZ"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-warning focus:outline-none"
              />
            </div>
          </div>

          {/* Oy tugashi */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-warning" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Oy tugashi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                name="endMonth_uz"
                value={form.endMonth_uz || ""}
                onChange={handleChange}
                placeholder="UZ"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-warning focus:outline-none"
              />
              <input
                name="endMonth_ru"
                value={form.endMonth_ru || ""}
                onChange={handleChange}
                placeholder="RU"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-warning focus:outline-none"
              />
              <input
                name="endMonth_oz"
                value={form.endMonth_oz || ""}
                onChange={handleChange}
                placeholder="OZ"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-warning focus:outline-none"
              />
            </div>
          </div>

          {/* Kvartal */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award size={18} className="text-accent" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Kvartal</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                name="title_uz"
                value={form.title_uz || ""}
                onChange={handleChange}
                placeholder="UZ"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-accent focus:outline-none"
              />
              <input
                name="title_ru"
                value={form.title_ru || ""}
                onChange={handleChange}
                placeholder="RU"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-accent focus:outline-none"
              />
              <input
                name="title_oz"
                value={form.title_oz || ""}
                onChange={handleChange}
                placeholder="OZ"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          {/* Reja turi */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award size={18} className="text-accent" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Reja turi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                name="category_uz"
                value={form.category_uz || ""}
                onChange={handleChange}
                placeholder="UZ"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-accent focus:outline-none"
              />
              <input
                name="category_ru"
                value={form.category_ru || ""}
                onChange={handleChange}
                placeholder="RU"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-accent focus:outline-none"
              />
              <input
                name="category_oz"
                value={form.category_oz || ""}
                onChange={handleChange}
                placeholder="OZ"
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          {/* Ishtirokchilar soni - ✅ ALOHIDA HANDLER */}
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">Ishtirokchilar soni</label>
            <input
              type="number"
              name="participantsCount"
              value={form.participantsCount}
              onChange={(e) => setForm({ ...form, participantsCount: Number(e.target.value) || 0 })}
              placeholder="0"
              className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Tavsif */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-teal-600" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Tavsif</h3>
            </div>
            <div className="space-y-3">
              <textarea
                name="description_uz"
                value={form.description_uz || ""}
                onChange={handleChange}
                placeholder="UZ"
                rows="3"
                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
              />
              <textarea
                name="description_ru"
                value={form.description_ru || ""}
                onChange={handleChange}
                placeholder="RU"
                rows="3"
                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
              />
              <textarea
                name="description_oz"
                value={form.description_oz || ""}
                onChange={handleChange}
                placeholder="OZ"
                rows="3"
                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-base-200 px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border-2 border-base-300 text-base-content hover:bg-base-200"
          >
            Bekor qilish
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2.5 rounded-lg bg-warning text-base-100 hover:shadow-lg hover:scale-105"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}