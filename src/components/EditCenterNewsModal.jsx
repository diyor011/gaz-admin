// EditCenterNewsModal.jsx
import { X, User, FileText, Image, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

export default function EditCenterNewsModal({
    open,
    onClose,
    onSubmit,
    form,
    setForm,
    newsData, // faqat debug uchun
}) {
    // Har safar modal ochilganda formani to'ldirish (agar kerak bo'lsa)
    useEffect(() => {
        if (open && newsData) {
            setForm(prev => ({
                ...prev,
                titleUz: newsData.title?.uz || "",
                titleRu: newsData.title?.ru || "",
                titleOz: newsData.title?.oz || "",
                descriptionUz: newsData.description?.uz || "",
                descriptionRu: newsData.description?.ru || "",
                descriptionOz: newsData.description?.oz || "",
                existingMedia: newsData.media || [],
            }));
        }
    }, [open, newsData, setForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            setForm(prev => {
                const updated = [...(prev.mediaType || [])];
                updated[index] = file;
                return { ...prev, mediaType: updated };
            });
        }
    };

    const handleAddImageInput = () => {
        setForm(prev => ({
            ...prev,
            mediaType: [...(prev.mediaType || []), null],
        }));
    };

    const removeExisting = (index) => {
        setForm(prev => ({
            ...prev,
            existingMedia: prev.existingMedia.filter((_, i) => i !== index),
        }));
    };

    const removeNew = (index) => {
        setForm(prev => ({
            ...prev,
            mediaType: prev.mediaType.filter((_, i) => i !== index),
        }));
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-base-content/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-base-100 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-info px-6 py-5 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-base-100">Yangilikni tahrirlash</h2>
                    <button onClick={onClose} className="w-9 h-9 rounded-lg bg-base-100/20 hover:bg-base-100/30 flex items-center justify-center">
                        <X className="text-base-100" size={20} />
                    </button>
                </div>

                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto space-y-6">

                    {/* Title */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-sm font-semibold uppercase">
                            <User size={18} /> Yangilik nomi
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input name="titleUz" value={form.titleUz || ""} onChange={handleChange} placeholder="UZ" className="input" />
                            <input name="titleRu" value={form.titleRu || ""} onChange={handleChange} placeholder="RU" className="input" />
                            <input name="titleOz" value={form.titleOz || ""} onChange={handleChange} placeholder="OZ" className="input" />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-sm font-semibold uppercase">
                            <FileText size={18} /> Tavsif
                        </label>
                        <div className="space-y-3">
                            <textarea name="descriptionUz" value={form.descriptionUz || ""} onChange={handleChange} rows="3" placeholder="UZ" className="textarea w-full" />
                            <textarea name="descriptionRu" value={form.descriptionRu || ""} onChange={handleChange} rows="3" placeholder="RU" className="textarea w-full" />
                            <textarea name="descriptionOz" value={form.descriptionOz || ""} onChange={handleChange} rows="3" placeholder="OZ" className="textarea w-full" />
                        </div>
                    </div>

                    {/* Mavjud rasmlar */}
                    {form.existingMedia?.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold uppercase mb-3">Mavjud rasmlar</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {form.existingMedia.map((url, i) => (
                                    <div key={i} className="relative group">
                                        <img src={url} alt="" className="w-full h-28 object-cover rounded-lg border" />
                                        <button onClick={() => removeExisting(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Yangi rasmlar */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-sm font-semibold uppercase">
                            <Image size={18} /> Yangi rasm yuklash
                        </label>
                        <div className="space-y-3">
                            {(form.mediaType || [null]).map((file, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*,video/*"
                                            className="hidden"
                                            id={`edit-img-${i}`}
                                            onChange={(e) => handleImageChange(e, i)}
                                        />
                                        <label htmlFor={`edit-img-${i}`} className="block p-3 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-error">
                                            {file ? file.name : "Rasm tanlash"}
                                        </label>
                                    </div>
                                    <button onClick={() => removeNew(i)} className="text-red-600 p-2 hover:bg-red-100 rounded">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleAddImageInput} className="btn btn-sm btn-info mt-2 gap-1">
                            <Plus size={16} /> Yana qo'shish
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-base-200 px-6 py-4 flex justify-end gap-3 border-t">
                    <button onClick={onClose} className="btn">Bekor qilish</button>
                    <button onClick={onSubmit} className="btn btn-info">Saqlash</button>
                </div>
            </div>
        </div>
    );
}