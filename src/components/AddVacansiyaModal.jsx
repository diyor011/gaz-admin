import { X, User, Briefcase, Award, FileText, Calendar, Image } from "lucide-react";

export default function AddVacansiyaModal({ open, onClose, onSubmit, form, setForm }) {
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
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Vacansiya  nomi</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Vacansiya nomi (UZ)"
                                name="titleUz"
                                value={form.titleUz}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Vacansiya nomi (RU)"
                                name="titleRu"
                                value={form.titleRu}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                                placeholder="Vacansiya nomi (OZ)"
                                name="titleOz"
                                value={form.titleOz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>




                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Award size={18} className="text-accent" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Oylik</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Oylik (UZ)"
                                name="salaryUz"
                                value={form.salaryUz}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Oylik  (RU)"
                                name="salaryRu"
                                value={form.salaryRu}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Oylik  (OZ)"
                                name="salaryOz"
                                value={form.salaryOz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Award size={18} className="text-accent" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Tajriba talabi</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Tajriba talabi (UZ)"
                                name="requirementsUz"
                                value={form.requirementsUz}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Tajriba talabi  (RU)"
                                name="requirementsRu"
                                value={form.requirementsRu}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                                placeholder="Tajriba talabi  (OZ)"
                                name="requirementsOz"
                                value={form.requirementsOz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Award size={18} className="text-accent" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">Stavka talabi</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {/* UZ */}
                            <select
                                name="salaryTypeUz"
                                value={form.salaryTypeUz}
                                onChange={handleChange}
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                            >
                                <option value="">Tanlang</option>
                                <option value="To'liq stavka">To'liq stavka</option>
                                <option value="Yarim stavka">Yarim stavka</option>
                            </select>

                            {/* RU */}
                            <select
                                name="salaryTypeRu"
                                value={form.salaryTypeRu}
                                onChange={handleChange}
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                            >
                                <option value="">Выберите</option>
                                <option value="Полная ставка">Полная ставка</option>
                                <option value="Половина ставки">Половина ставки</option>
                            </select>

                            {/* OZ */}
                            <select
                                name="salaryTypeOz"
                                value={form.salaryTypeOz}
                                onChange={handleChange}
                                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                            >
                                <option value="">Танланг</option>
                                <option value="Тўлиқ ставка">Тўлиқ ставка</option>
                                <option value="Ярим ставка">Ярим ставка</option>
                            </select>
                        </div>
                    </div>

                    <input
                        type="date"
                        className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-base-content"
                        name="deadline"
                        value={form.deadline}
                        onChange={handleChange}
                    />




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