import {
    X,
    User,
    FileText,
    Image,
    Plus
} from "lucide-react";

export default function AddBooksModal({
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

    // Rasmlar (bir nechta)
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        setForm((prev) => {
            const updatedImages = [...(prev.mediaImages || [])];
            updatedImages[index] = file;
            return { ...prev, mediaImages: updatedImages };
        });
    };

    const handleAddImageInput = () => {
        setForm((prev) => ({
            ...prev,
            mediaImages: [...(prev.mediaImages || []), null],
        }));
    };

    // PDF (bir nechta)
    const handleDocsChange = (e) => {
        const files = Array.from(e.target.files);
        setForm((prev) => ({ ...prev, mediaDocs: files }));
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
                        <h2 className="text-2xl font-bold text-base-100">Kitob qo‘shish</h2>
                    </div>
                    <button onClick={onClose} className="w-9 h-9 rounded-lg bg-base-100/20 hover:bg-base-100/30 flex items-center justify-center">
                        <X size={20} className="text-base-100" />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {/* Nomi */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText size={18} className="text-info" />
                            <h3 className="text-sm font-semibold">Kitob nomi</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-info rounded-lg"
                                placeholder="Китоб номи (УЗ)"
                                name="titleUz"
                                value={form.titleUz || ""}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-info rounded-lg"
                                placeholder="Название книги (Ru)"
                                name="titleRu"
                                value={form.titleRu}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-info rounded-lg"
                                placeholder="Kitob nomi (Uz) "
                                name="titleOz"
                                value={form.titleOz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Muallif */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <User size={18} className="text-info" />
                            <h3 className="text-sm font-semibold">Muallif</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                className="px-4 py-3 border-2 border-info rounded-lg"
                                placeholder=" Муалиф (УЗ)"
                                name="avtorUz"
                                value={form.avtorUz || ""}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-info rounded-lg"
                                placeholder="Автор (Ru)"
                                name="avtorRu"
                                value={form.avtorRu}
                                onChange={handleChange}
                            />
                            <input
                                className="px-4 py-3 border-2 border-info rounded-lg"
                                placeholder="Muallif (Uz)"
                                name="avtorOz"
                                value={form.avtorOz}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Tavsif */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText size={18} className="text-info" />
                            <h3 className="text-sm font-semibold">Tavsif</h3>
                        </div>
                        <textarea
                            className="w-full px-4 py-3 border-2 border-info rounded-lg"
                            placeholder=" Тавсиф (УЗ)"
                            name="descriptionUz"
                            value={form.descriptionUz || ""}
                            onChange={handleChange}
                        />
                        <textarea
                            className="w-full px-4 py-3 border-2 border-info rounded-lg"
                            placeholder="Описание (Ru)"
                            name="descriptionRu"
                            value={form.descriptionRu}
                            onChange={handleChange}
                        />
                        <textarea
                            className="w-full px-4 py-3 border-2 border-info rounded-lg"
                            placeholder="Tavsif (Uz)"
                            name="descriptionOz"
                            value={form.descriptionOz}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Sahifalar va yil */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <input
                            className="px-4 py-3 border-2 border-info rounded-lg"
                            placeholder="Sahifa soni"
                            name="pages"
                            value={form.pages}
                            onChange={handleChange}
                            type="number"
                        />
                        <input
                            className="px-4 py-3 border-2 border-info rounded-lg"
                            placeholder="Yil"
                            name="year"
                            value={form.year}
                            onChange={handleChange}
                            type="number"
                        />
                    </div>

                    {/* Rasm yuklash */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Image size={18} className="text-error" />
                            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                                Rasm Yuklash
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {(form.mediaImages || [null]).map((img, index) => (
                                <div key={index} className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id={`image-upload-${index}`}
                                        onChange={(e) => handleImageChange(e, index)}
                                    />
                                    <label
                                        htmlFor={`image-upload-${index}`}
                                        className="flex items-center justify-center gap-3 px-4 py-4 border-2 border-dashed border-base-300 rounded-lg hover:border-error hover:bg-base-200 transition-all duration-200 cursor-pointer group"
                                    >
                                        <Image size={20} className="text-base-300 group-hover:text-error transition-colors" />
                                        <span className="text-base-300 group-hover:text-error font-medium">
                                            {img ? img.name : "Rasm tanlash uchun bosing"}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleAddImageInput}
                            className="flex items-center gap-2 text-info hover:text-blue-600 font-medium mt-3"
                        >
                            <Plus size={18} /> Yana rasm qo‘shish
                        </button>
                    </div>

                    {/* PDF yuklash */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText size={18} className="text-info" />
                            <h3 className="text-sm font-semibold">PDF fayllar</h3>
                        </div>
                        <input
                            type="file"
                            multiple
                            accept=".pdf"
                            onChange={handleDocsChange}
                            className="file-input file-input-bordered w-full"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={onSubmit}
                        className="btn btn-info w-full text-base-100"
                    >
                        Saqlash
                    </button>
                </div>
            </div>
        </div>
    );
}
