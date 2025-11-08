import { X, User, Briefcase, Award, FileText, Calendar, Image } from "lucide-react";

export default function AddPlansModal({ open, onClose, onSubmit, form, setForm }) {
    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };


    console.log(form, "form");

    return (
        <div className="fixed inset-0 bg-base-content/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-base-100 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-info px-6 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-base-100/20 backdrop-blur-sm flex items-center justify-center">
                            <User className="text-base-100" size={22} />
                        </div>
                        <h2 className="text-2xl font-bold text-base-100">Hujat qoshish</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-lg bg-base-100/20 backdrop-blur-sm hover:bg-base-100/30 transition-all duration-200 flex items-center justify-center group"
                    >
                        <X className="text-base-100 group-hover:rotate-90 transition-transform duration-200" size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {/* Full Name Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <User size={18} className="text-info" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Oy boshlanishi</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Oy boshlanishi (UZ)"
                                name="startMoth_uz"
                                value={form.startMoth_uz}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Oy boshlanishi (RU)"
                                name="startMoth_ru"
                                value={form.startMoth_ru}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Oy boshlanishi (OZ)"
                                name="startMoth_oz"
                                value={form.startMoth_oz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <User size={18} className="text-info" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Oy Tugashi</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Oy Tugashi (UZ)"
                                name="endMoth_uz"
                                value={form.endMoth_uz}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Oy Tugashi (RU)"
                                name="endMoth_ru"
                                value={form.endMoth_ru}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Oy Tugashi (OZ)"
                                name="endMoth_oz"
                                value={form.endMoth_oz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>




                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Award size={18} className="text-accent" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">   Rejalar kvartol</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Rejalar kvartol (UZ)"
                                name="title_uz"
                                value={form.title_uz}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Rejalar kvartol  (RU)"
                                name="title_ru"
                                value={form.title_ru}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Rejalar kvartol  (OZ)"
                                name="title_oz"
                                value={form.title_oz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Award size={18} className="text-accent" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Rejalar turi</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Rejalar turi (UZ)"
                                name="category_uz"
                                value={form.category_uz}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Rejalar turi  (RU)"
                                name="category_ru"
                                value={form.category_ru}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Rejalar turi (OZ)"
                                name="category_oz"
                                value={form.category_oz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                 

                    <input
                        type="text"
                        className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                        name="participantsCount"
                        value={form.participantsCount}
                        onChange={handleChange}
                        placeholder="Ishtirokchilar soni"
                    />




                    {/* Description Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText size={18} className="text-teal-600" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide"> Oylik Rejalar</h3>
                        </div>
                        <div className="space-y-3">
                            <textarea
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors duration-200 hover:border-base-content resize-none"
                                placeholder=" Oylik Rejalar (UZ)"
                                name="description_uz"
                                value={form.description_uz}
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                            <textarea
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors duration-200 hover:border-base-content resize-none"
                                placeholder=" Oylik Rejalar (RU)"
                                name="description_ru"
                                value={form.description_ru}
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                            <textarea
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors duration-200 hover:border-base-content resize-none"
                                placeholder=" Oylik Rejalar (OZ)"
                                name="description_oz"
                                value={form.description_oz}
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
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
                        Saqlash
                    </button>

                </div>
            </div>
        </div>
    );
}