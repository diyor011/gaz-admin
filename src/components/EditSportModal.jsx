// components/AddPlansModal.jsx
import { X, User, Award, FileText, Calendar } from "lucide-react";

export default function EditSportModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
}) {
  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-base-content/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-base-100 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-info px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-base-100/20 backdrop-blur-sm flex items-center justify-center">
              <User className="text-base-100" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-base-100">
              Yangi Tadbir qo'shish
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-base-100/20 backdrop-blur-sm hover:bg-base-100/30 transition-all duration-200 flex items-center justify-center group"
          >
            <X
              className="text-base-100 group-hover:rotate-90 transition-transform duration-200"
              size={20}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto space-y-6">
          {/* Rejalar kvartali */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                Tadbir Nomi
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(УЗ)"
                name="title_uz"
                value={form.title_uz || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(RU)"
                name="title_ru"
                value={form.title_ru || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(UZ)"
                name="title_oz"
                value={form.title_oz || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Rejalar turi */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                Tadbir turi
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* UZ */}
              <select
                name="category_uz"
                value={form.category_uz || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
              >
                <option value="Маданият">Маданият</option>
                <option value="Спорт">Спорт</option>
              </select>

              {/* RU */}
              <select
                name="category_ru"
                value={form.category_ru || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
              >
                <option value="Культура">Культура</option>
                <option value="Спорт">Спорт</option>
              </select>

              {/* OZ */}
              <select
                name="category_oz"
                value={form.category_oz || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
              >
                <option value="Madaniyat">Madaniyat</option>
                <option value="Sport">Sport</option>
              </select>
            </div>
          </div>

          {/* Oy boshlanishi */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-info" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                Ishtirokchilar soni
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(УЗ)"
                name="athlete_uz"
                value={form.athlete_uz || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className=" px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(RU)"
                name="athlete_ru"
                value={form.athlete_ru || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className=" px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(UZ)"
                name="athlete_oz"
                value={form.athlete_oz || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Oy tugashi */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-info" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                tadbir Joyi (Tashkent)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(УЗ)"
                name="place_uz"
                value={form.place_uz || ""}
                onChange={handleChange}
              />

              <input
                type="text"
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(RU)"
                name="place_ru"
                value={form.place_ru || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(UZ)"
                name="place_oz"
                value={form.place_oz || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Tavsif */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-teal-600" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                batafsil
              </h3>
            </div>
            <div className="space-y-3">
              <textarea
                className="w-full px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(УЗ)"
                name="description_uz"
                value={form.description_uz || ""}
                onChange={handleChange}
                rows="3"
              />
              <textarea
                className="w-full px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(RU)"
                name="description_ru"
                value={form.description_ru || ""}
                onChange={handleChange}
                rows="3"
              />
              <textarea
                className="w-full px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(UZ)"
                name="description_oz"
                value={form.description_oz || ""}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-base-200 px-6 py-4 flex justify-end gap-3 border-t border-base-200">
          <button
            className="px-6 py-2.5 rounded-lg border-2 border-base-300 text-base-content font-medium hover:bg-base-200 transition-all duration-200"
            onClick={onClose}
          >
            Bekor qilish
          </button>
          <button
            className="px-6 py-2.5 rounded-lg bg-info text-base-100 font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            onClick={onSubmit}
          >
            Qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}
