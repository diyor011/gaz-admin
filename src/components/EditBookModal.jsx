import {
    X,
    User,
    FileText,
    Image,
    Trash2
} from "lucide-react";

export default function EditBooksModal({
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

    // --- Rasmlarni almashtirish ---
    const handleImageReplace = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        setForm((prev) => {
            const updated = [...prev.mediaImages];
            updated[index] = file;
            return { ...prev, mediaImages: updated };
        });
    };

    // --- Rasm o‘chirish ---
    const handleDeleteImage = (index) => {
        setForm((prev) => ({
            ...prev,
            mediaImages: prev.mediaImages.filter((_, i) => i !== index),
        }));
    };

    // --- Rasm qo‘shish ---
    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setForm((prev) => ({
            ...prev,
            mediaImages: [...prev.mediaImages, ...files],
        }));
    };

    // --- PDF faylni almashtirish ---
    const handleDocReplace = (e) => {
        const files = Array.from(e.target.files);
        setForm((prev) => ({ ...prev, mediaDocs: files }));
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
                        <h2 className="text-2xl font-bold text-base-100">Kitobni tahrirlash</h2>
                    </div>

                    <button onClick={onClose} className="w-9 h-9 rounded-lg bg-base-100/20 hover:bg-base-100/30 flex items-center justify-center">
                        <X size={20} className="text-base-100" />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">

                    {/* Inputs */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText size={18} className="text-warning" />
                            <h3 className="text-sm font-semibold">Kitob nomlari</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-warning rounded-lg"
                                placeholder="Kitob nomi (Uz)"
                                name="titleUz"
                                value={form.titleUz}
                                onChange={handleChange}
                            />

                            <input
                                className="px-4 py-3 border-2 border-warning rounded-lg"
                                placeholder="Название книги (Ru)"
                                name="titleRu"
                                value={form.titleRu}
                                onChange={handleChange}
                            />

                            <input
                                className="px-4 py-3 border-2 border-warning rounded-lg"
                                placeholder="Kitob nomi (Oz)"
                                name="titleOz"
                                value={form.titleOz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* ===== RASMLAR EDIT ===== */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Image size={18} className="text-warning" />
                            <h3 className="text-sm font-semibold">Rasmlar</h3>
                        </div>

                        {/* Mavjud rasmlar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {form.mediaImages?.map((img, index) => (
                                <div key={index} className="relative border rounded-lg p-2">

                                    <img
                                        src={
                                            typeof img === "string"
                                                ? img
                                                : URL.createObjectURL(img)
                                        }
                                        className="w-full h-32 object-cover rounded-lg"
                                    />

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteImage(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    {/* Replace (input) */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="mt-2 w-full"
                                        onChange={(e) => handleImageReplace(e, index)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Rasm qo'shish */}
                        <label className="btn btn-warning w-full cursor-pointer">
                            Yangi rasm qo‘shish
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleAddImage}
                            />
                        </label>
                    </div>

                    {/* ===== PDF EDIT ===== */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText size={18} className="text-warning" />
                            <h3 className="text-sm font-semibold">PDF fayllar</h3>
                        </div>

                        {form.mediaDocs?.length > 0 && (
                            <div className="border p-3 rounded-lg mb-3">
                                <p className="font-medium">
                                    {form.mediaDocs.length} ta PDF yuklangan
                                </p>
                            </div>
                        )}

                        <input
                            type="file"
                            accept=".pdf"
                            multiple
                            className="file-input file-input-bordered w-full"
                            onChange={handleDocReplace}
                        />
                    </div>

                    <button onClick={onSubmit} className="btn btn-warning w-full text-base-100">
                        Saqlash
                    </button>

                </div>
            </div>
        </div>
    );
}
