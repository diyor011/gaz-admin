import { X, User, Briefcase, Award, FileText, Calendar, Image } from "lucide-react";

export default function AddDepartamentModal({ open, onClose, onSubmit, form, setForm }) {
    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setForm((prev) => ({ ...prev, image: e.target.files[0] }));
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
                        <h2 className="text-2xl font-bold text-base-100">Tarkibiy Bo'limlar Qo'shish</h2>
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
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">To'liq Ism</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Bolim nomi (UZ)"
                                name="titleUz"
                                value={form.titleUz}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Bolim nomi (RU)"
                                name="titleRu"
                                value={form.titleRu}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Bolim nomi (OZ)"
                                name="titleOz"
                                value={form.titleOz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Specialist Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Briefcase size={18} className="text-indigo-600" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Mutaxassislik</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Xodimlar soni (UZ)"
                                name="employeesUz"
                                value={form.employeesUz}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Xodimlar soni (RU)"
                                name="employeesRu"
                                value={form.employeesRu}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Xodimlar soni (OZ)"
                                name="employeesOz"
                                value={form.employeesOz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar size={18} className="text-purple-600" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Tajriba</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Rahbari (UZ)"
                                name="leaderUz"
                                value={form.leaderUz}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Rahbari (RU)"
                                name="leaderRu"
                                value={form.leaderRu}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Rahbari (OZ)"
                                name="leaderOz"
                                value={form.leaderOz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>



                    {/* Description Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText size={18} className="text-teal-600" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Tavsif</h3>
                        </div>
                        <div className="space-y-3">
                            <textarea
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors duration-200 hover:border-base-content resize-none"
                                placeholder="Tavsif (UZ)"
                                name="descriptionUz"
                                value={form.descriptionUz}
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                            <textarea
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors duration-200 hover:border-base-content resize-none"
                                placeholder="Описание (RU)"
                                name="descriptionRu"
                                value={form.descriptionRu}
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                            <textarea
                                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors duration-200 hover:border-base-content resize-none"
                                placeholder="Description (OZ)"
                                name="descriptionOz"
                                value={form.descriptionOz}
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