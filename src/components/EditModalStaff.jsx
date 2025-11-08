import { useEffect, useState } from "react";
import { X, User, Briefcase, Award, FileText, Calendar, Image } from "lucide-react";

export default function EditVeteranModal({ open, onClose, data, onUpdate }) {
    const empty = {
        _id: null,
        fullName_uz: "",
        fullName_ru: "",
        fullName_oz: "",
        specialist_uz: "",
        specialist_ru: "",
        specialist_oz: "",
        experience_uz: "",
        experience_ru: "",
        experience_oz: "",
        project_uz: "",
        project_ru: "",
        project_oz: "",
        grade_uz: "",
        grade_ru: "",
        grade_oz: "",
        description_uz: "",
        description_ru: "",
        description_oz: "",
        image: null,
    };

    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (data) {
            setForm({
                _id: data._id,
                fullName_uz: data.fullName?.uz || "",
                fullName_ru: data.fullName?.ru || "",
                fullName_oz: data.fullName?.oz || "",
                specialist_uz: data.specialist?.uz || "",
                specialist_ru: data.specialist?.ru || "",
                specialist_oz: data.specialist?.oz || "",
                experience_uz: data.experience?.uz || "",
                experience_ru: data.experience?.ru || "",
                experience_oz: data.experience?.oz || "",
                project_uz: data.project?.uz || "",
                project_ru: data.project?.ru || "",
                project_oz: data.project?.oz || "",
                grade_uz: data.grade?.uz || "",
                grade_ru: data.grade?.ru || "",
                grade_oz: data.grade?.oz || "",
                description_uz: data.description?.uz || "",
                description_ru: data.description?.ru || "",
                description_oz: data.description?.oz || "",
                image: null,
            });
        } else {
            setForm(empty);
        }
    }, [data, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleFile = (e) => {
        const file = e.target.files?.[0] ?? null;
        setForm((p) => ({ ...p, image: file }));
    };

    const handleSave = async () => {
        if (!form._id) {
            alert("No veteran selected for update.");
            return;
        }

        setSaving(true);
        try {
            const token = localStorage.getItem("token");

            if (form.image) {
                const fd = new FormData();
                fd.append("fullName_uz", form.fullName_uz);
                fd.append("fullName_ru", form.fullName_ru);
                fd.append("fullName_oz", form.fullName_oz);
                fd.append("specialist_uz", form.specialist_uz);
                fd.append("specialist_ru", form.specialist_ru);
                fd.append("specialist_oz", form.specialist_oz);
                fd.append("experience_uz", form.experience_uz);
                fd.append("experience_ru", form.experience_ru);
                fd.append("experience_oz", form.experience_oz);
                fd.append("project_uz", form.project_uz);
                fd.append("project_ru", form.project_ru);
                fd.append("project_oz", form.project_oz);
                fd.append("grade_uz", form.grade_uz);
                fd.append("grade_ru", form.grade_ru);
                fd.append("grade_oz", form.grade_oz);
                fd.append("description_uz", form.description_uz);
                fd.append("description_ru", form.description_ru);
                fd.append("description_oz", form.description_oz);
                fd.append("image", form.image);

                const res = await fetch(
                    `https://uzbekneftegaz-backend.onrender.com/api/honorary/update/${form._id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: fd,
                    }
                );

                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const payload = await res.json();
                onUpdate(payload.data ?? payload);
                onClose();
            } else {
                const body = {
                    fullName_uz: form.fullName_uz,
                    fullName_ru: form.fullName_ru,
                    fullName_oz: form.fullName_oz,
                    specialist_uz: form.specialist_uz,
                    specialist_ru: form.specialist_ru,
                    specialist_oz: form.specialist_oz,
                    experience_uz: form.experience_uz,
                    experience_ru: form.experience_ru,
                    experience_oz: form.experience_oz,
                    project_uz: form.project_uz,
                    project_ru: form.project_ru,
                    project_oz: form.project_oz,
                    grade_uz: form.grade_uz,
                    grade_ru: form.grade_ru,
                    grade_oz: form.grade_oz,
                    description_uz: form.description_uz,
                    description_ru: form.description_ru,
                    description_oz: form.description_oz,
                };

                const res = await fetch(
                    `https://uzbekneftegaz-backend.onrender.com/api/honorary/update/${form._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(body),
                    }
                );

                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const payload = await res.json();
                onUpdate(payload.data ?? payload);
                onClose();
            }
        } catch (err) {
            console.error("Update error:", err);
            alert("Saqlashda xatolik yuz berdi. Konsolni tekshiring.");
        } finally {
            setSaving(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-base-100 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="bg-info px-6 py-5 flex justify-between items-center flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-base/20 backdrop-blur-sm flex items-center justify-center">
                            <User className="text-white" size={22} />
                        </div>
                        <h2 className="text-2xl font-bold text-base-100">Faxriy Xodimni Tahrirlash</h2>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="w-9 h-9 rounded-lg bg-base/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 flex items-center justify-center group"
                    >
                        <X className="text-base-100 group-hover:rotate-90 transition-transform duration-200" size={20} />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="p-6 overflow-y-auto flex-1">
                    {/* Full Name Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <User size={18} className="text-blue-600" />
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">To'liq Ism</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Ism Familya (UZ)" 
                                name="fullName_uz" 
                                value={form.fullName_uz} 
                                onChange={handleChange} 
                            />
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Имя Фамилия (RU)" 
                                name="fullName_ru" 
                                value={form.fullName_ru} 
                                onChange={handleChange} 
                            />
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Name (OZ)" 
                                name="fullName_oz" 
                                value={form.fullName_oz} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>

                    {/* Specialist Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Briefcase size={18} className="text-indigo-600" />
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Mutaxassislik</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-indigo-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Kasb (UZ)" 
                                name="specialist_uz" 
                                value={form.specialist_uz} 
                                onChange={handleChange} 
                            />
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-indigo-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Профессия (RU)" 
                                name="specialist_ru" 
                                value={form.specialist_ru} 
                                onChange={handleChange} 
                            />
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-indigo-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Profession (OZ)" 
                                name="specialist_oz" 
                                value={form.specialist_oz} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar size={18} className="text-purple-600" />
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Tajriba</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Tajriba (UZ)" 
                                name="experience_uz" 
                                value={form.experience_uz} 
                                onChange={handleChange} 
                            />
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Стаж (RU)" 
                                name="experience_ru" 
                                value={form.experience_ru} 
                                onChange={handleChange} 
                            />
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Experience (OZ)" 
                                name="experience_oz" 
                                value={form.experience_oz} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>

                    {/* Project Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText size={18} className="text-green-600" />
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Loyiha</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Loyiha (UZ)" 
                                name="project_uz" 
                                value={form.project_uz} 
                                onChange={handleChange} 
                            />
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Проект (RU)" 
                                name="project_ru" 
                                value={form.project_ru} 
                                onChange={handleChange} 
                            />
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Project (OZ)" 
                                name="project_oz" 
                                value={form.project_oz} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>

                    {/* Grade Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Award size={18} className="text-amber-600" />
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Daraja</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Daraja (UZ)" 
                                name="grade_uz" 
                                value={form.grade_uz} 
                                onChange={handleChange} 
                            />
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Степень (RU)" 
                                name="grade_ru" 
                                value={form.grade_ru} 
                                onChange={handleChange} 
                            />
                            <input 
                                className="px-4 py-3 border-2 border-base-content rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 hover:border-gray-300" 
                                placeholder="Grade (OZ)" 
                                name="grade_oz" 
                                value={form.grade_oz} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText size={18} className="text-teal-600" />
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Tavsif</h3>
                        </div>
                        <div className="space-y-3">
                            <textarea 
                                className="w-full px-4 py-3 border-2 border-base-content rounded-lg focus:border-teal-500 focus:outline-none transition-colors duration-200 hover:border-gray-300 resize-none" 
                                placeholder="Tavsif (UZ)" 
                                name="description_uz" 
                                value={form.description_uz} 
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                            <textarea 
                                className="w-full px-4 py-3 border-2 border-base-content rounded-lg focus:border-teal-500 focus:outline-none transition-colors duration-200 hover:border-gray-300 resize-none" 
                                placeholder="Описание (RU)" 
                                name="description_ru" 
                                value={form.description_ru} 
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                            <textarea 
                                className="w-full px-4 py-3 border-2 border-base-content rounded-lg focus:border-teal-500 focus:outline-none transition-colors duration-200 hover:border-gray-300 resize-none" 
                                placeholder="Description (OZ)" 
                                name="description_oz" 
                                value={form.description_oz} 
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Image size={18} className="text-rose-600" />
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Yangi Rasm (ixtiyoriy)</h3>
                        </div>
                        <div className="relative">
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                id="image-upload"
                                onChange={handleFile} 
                            />
                            <label 
                                htmlFor="image-upload"
                                className="flex items-center justify-center gap-3 px-4 py-4 border-2 border-dashed border-base-content rounded-lg hover:border-rose-500 hover:bg-rose-50 transition-all duration-200 cursor-pointer group"
                            >
                                <Image size={20} className="text-gray-400 group-hover:text-error transition-colors" />
                                <span className="text-gray-600 group-hover:text-error font-medium">
                                    {form.image ? form.image.name : "Yangi rasm tanlash uchun bosing"}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-base-100 px-6 py-4 flex justify-end gap-3 border-t border-base-content flex-shrink-0">
                    <button 
                        className="px-6 py-2.5 rounded-lg border-2 border-base-300 text-base-content font-medium hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                        onClick={onClose}
                        disabled={saving}
                    >
                        Bekor qilish
                    </button>
                    <button 
                        className="px-6 py-2.5 rounded-lg bg-info text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Saqlanmoqda..." : "Saqlash"}
                    </button>
                </div>
            </div>
        </div>
    );
}