// components/AddPlansModal.jsx
import { X, User, Award, FileText, Calendar } from "lucide-react";

export default function AddReportsModal({ open, onClose, onSubmit, form, setForm }) {
    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    console.log(form);
    

    return (
        <div className="fixed inset-0 bg-base-content/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-base-100 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-info px-6 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-base-100/20 backdrop-blur-sm flex items-center justify-center">
                            <User className="text-base-100" size={22} />
                        </div>
                        <h2 className="text-2xl font-bold text-base-100">Yangi reja qo'shish</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-lg bg-base-100/20 backdrop-blur-sm hover:bg-base-100/30 transition-all duration-200 flex items-center justify-center group"
                    >
                        <X className="text-base-100 group-hover:rotate-90 transition-transform duration-200" size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto space-y-6">
                    {/* Oy boshlanishi */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar size={18} className="text-info" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Oy boshlanishi</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                type="text"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="Oy boshlanishi (UZ)"
                                name="startMonth_uz"
                                value={form.startMonth_uz || ""}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="Oy boshlanishi (RU)"
                                name="startMonth_ru"
                                value={form.startMonth_ru || ""}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="Oy boshlanishi (OZ)"
                                name="startMonth_oz"
                                value={form.startMonth_oz || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Oy tugashi */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar size={18} className="text-info" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Oy tugashi</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                type="text"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="Oy tugashi (UZ)"
                                name="endMonth_uz"
                                value={form.endMonth_uz || ""}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="Oy tugashi (RU)"
                                name="endMonth_ru"
                                value={form.endMonth_ru || ""}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="Oy tugashi (OZ)"
                                name="endMonth_oz"
                                value={form.endMonth_oz || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Rejalar kvartali */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Award size={18} className="text-accent" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Rejalar kvartali</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                type="text"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                                placeholder="Rejalar kvartali (UZ)"
                                name="title_uz"
                                value={form.title_uz || ""}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                                placeholder="Rejalar kvartali (RU)"
                                name="title_ru"
                                value={form.title_ru || ""}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                                placeholder="Rejalar kvartali (OZ)"
                                name="title_oz"
                                value={form.title_oz || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                  
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Award size={18} className="text-accent" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                                Rejalar turi
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                            {/* UZ */}
                            <select
                                name="plan_uz"
                                value={form.plan_uz}
                                onChange={handleChange}
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                            >
                                <option value="Режалаштирилган">Режалаштирилган</option>
                                <option value="Бажарилмоқда">Бажарилмоқда</option>
                                <option value="Бажарилди">Бажарилди</option>
                                <option value="Бажарилмади">Бажарилмади</option>
                            </select>

                            {/* RU */}
                            <select
                                name="plan_ru"
                                value={form.plan_ru}
                                onChange={handleChange}
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                            >
                                <option value="Запланировано">Запланировано</option>
                                <option value="Выполняется">Выполняется</option>
                                <option value="Выполнено">Выполнено</option>
                                <option value="Не выполнено">Не выполнено</option>
                            </select>

                            {/* OZ */}
                            <select
                                name="plan_oz"
                                value={form.plan_oz}
                                onChange={handleChange}
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                            >
                                <option value="Rejalashtirilgan">Rejalashtirilgan</option>
                                <option value="Bajarilmoqda">Bajarilmoqda</option>
                                <option value="Bajarildi">Bajarildi</option>
                                <option value="Bajarilmadi">Bajarilmadi</option>
                            </select>

                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-base-content mb-2">Ishtirokchilar soni</label>
                        <input
                            type="number"
                            className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                            placeholder="Ishtirokchilar soni"
                            name="participantsCount"
                            value={form.participantsCount || ""}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Tavsif */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <FileText size={18} className="text-teal-600" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Oylik Rejalar</h3>
                        </div>
                        <div className="space-y-3">
                            <textarea
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors resize-none"
                                placeholder="Oylik Rejalar (UZ)"
                                name="description_uz"
                                value={form.description_uz || ""}
                                onChange={handleChange}
                                rows="3"
                            />
                            <textarea
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors resize-none"
                                placeholder="Oylik Rejalar (RU)"
                                name="description_ru"
                                value={form.description_ru || ""}
                                onChange={handleChange}
                                rows="3"
                            />
                            <textarea
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors resize-none"
                                placeholder="Oylik Rejalar (OZ)"
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