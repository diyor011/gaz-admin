// components/AddGenderModal.jsx
import { X, User, FileText, Image } from "lucide-react";

export default function AddGenderModal({ open, onClose, onSubmit, form, setForm }) {
    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, file }));
        }
    };

    return (
        <div className="fixed inset-0 bg-base-content/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-base-100 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-info px-6 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-base-100/20 flex items-center justify-center">
                            <User className="text-base-100" size={22} />
                        </div>
                        <h2 className="text-2xl font-bold text-base-100">Gender tengligi hujjati qo'shish</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-lg bg-base-100/20 hover:bg-base-100/30 flex items-center justify-center group"
                    >
                        <X className="text-base-100 group-hover:rotate-90 transition-transform" size={20} />
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto space-y-6">
                    {/* Sarlavha */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <User size={18} className="text-info" />
                            <h3 className="text-sm font-semibold uppercase tracking-wide">Hujjat nomi</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                name="title_uz"
                                value={form.title_uz || ""}
                                onChange={handleChange}
                                placeholder="Nomi (UZ)"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                            <input
                                name="title_ru"
                                value={form.title_ru || ""}
                                onChange={handleChange}
                                placeholder="Nomi (RU)"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                            <input
                                name="title_oz"
                                value={form.title_oz || ""}
                                onChange={handleChange}
                                placeholder="Nomi (OZ)"
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                        </div>
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
                                placeholder="Tavsif (UZ)"
                                rows="3"
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
                            />
                            <textarea
                                name="description_ru"
                                value={form.description_ru || ""}
                                onChange={handleChange}
                                placeholder="Tavsif (RU)"
                                rows="3"
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
                            />
                            <textarea
                                name="description_oz"
                                value={form.description_oz || ""}
                                onChange={handleChange}
                                placeholder="Tavsif (OZ)"
                                rows="3"
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* Fayl yuklash */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Image size={18} className="text-error" />
                            <h3 className="text-sm font-semibold uppercase tracking-wide">Fayl yuklash</h3>
                        </div>
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*,video/*"
                                id="file-upload"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="file-upload"
                                className="flex items-center justify-center gap-3 px-4 py-4 border-2 border-dashed border-base-300 rounded-lg hover:border-error hover:bg-base-200 transition-all cursor-pointer group"
                            >
                                <Image size={20} className="text-base-300 group-hover:text-error transition-colors" />
                                <span className="text-base-300 group-hover:text-error font-medium">
                                    {form.file ? form.file.name : "Fayl tanlash"}
                                </span>
                            </label>
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
                        className="px-6 py-2.5 rounded-lg bg-info text-base-100 hover:shadow-lg hover:scale-105"
                    >
                        Saqlash
                    </button>
                </div>
            </div>
        </div>
    );
}