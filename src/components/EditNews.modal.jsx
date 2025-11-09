import { X, User, FileText, Image, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function EditNewsModal({ open, onClose, onSubmit, newsData }) {
  const [localForm, setLocalForm] = useState({
    titleUz: "",
    titleRu: "",
    titleOz: "",
    descriptionUz: "",
    descriptionRu: "",
    descriptionOz: "",
    images: [],
  });

  useEffect(() => {
    if (open && newsData) {
      setLocalForm({
        titleUz: newsData.title?.uz || "",
        titleRu: newsData.title?.ru || "",
        titleOz: newsData.title?.oz || "",
        descriptionUz: newsData.description?.uz || "",
        descriptionRu: newsData.description?.ru || "",
        descriptionOz: newsData.description?.oz || "",
        images: newsData.images || [],
      });
    }
  }, [open, newsData]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setLocalForm((prev) => {
      const updated = [...(prev.images || [])];
      updated[index] = file;
      return { ...prev, images: updated };
    });
  };

  const handleAddImageInput = () => {
    setLocalForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), null],
    }));
  };

  const getImagePreview = (img) => {
    if (!img) return null;
    if (typeof img === "string") {
      return `${img}`;
    }
    return URL.createObjectURL(img);
  };

  const handleSubmit = () => {
    onSubmit(localForm);
  };

  return (
    <div className="fixed inset-0 bg-base-content/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-info px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-base-100/20 flex items-center justify-center">
              <User className="text-base-100" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-base-100">Yangilikni tahrirlash</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-base-100/20 hover:bg-base-100/30 flex items-center justify-center transition-all"
          >
            <X className="text-base-100" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Title */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-info" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Yangilik nomi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500"
                placeholder="Yangilik nomi (UZ)"
                name="titleUz"
                value={localForm.titleUz}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500"
                placeholder="Yangilik nomi (RU)"
                name="titleRu"
                value={localForm.titleRu}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500"
                placeholder="Yangilik nomi (OZ)"
                name="titleOz"
                value={localForm.titleOz}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-teal-600" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Tavsif</h3>
            </div>
            <div className="space-y-3">
              <textarea
                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg"
                placeholder="Tavsif (UZ)"
                name="descriptionUz"
                value={localForm.descriptionUz}
                onChange={handleChange}
                rows="3"
              ></textarea>
              <textarea
                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg"
                placeholder="Описание (RU)"
                name="descriptionRu"
                value={localForm.descriptionRu}
                onChange={handleChange}
                rows="3"
              ></textarea>
              <textarea
                className="w-full px-4 py-3 border-2 border-base-200 rounded-lg"
                placeholder="Description (OZ)"
                name="descriptionOz"
                value={localForm.descriptionOz}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Images */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Image size={18} className="text-error" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Rasmlar</h3>
            </div>

            <div className="space-y-4">
              {(localForm.images || []).map((img, index) => (
                <div key={index}>
                  {getImagePreview(img) && (
                    <img
                      src={getImagePreview(img)}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded-lg mb-2 border shadow"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id={`image-${index}`}
                    className="hidden"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <label
                    htmlFor={`image-${index}`}
                    className="flex items-center justify-center gap-3 px-4 py-3 border-2 border-dashed border-base-300 rounded-lg hover:border-error cursor-pointer transition"
                  >
                    <Image size={20} className="text-base-300" />
                    <span className="text-base-300 font-medium">
                      {typeof img === "string" ? img : img?.name || "Rasmni tanlang"}
                    </span>
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddImageInput}
              className="flex items-center gap-2 text-info hover:text-blue-600 font-medium mt-3"
            >
              <Plus size={18} /> Yana rasm qo'shish
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-base-200 px-6 py-4 flex justify-end gap-3 border-t">
          <button
            className="px-6 py-2.5 rounded-lg border-2 border-base-300 text-base-content font-medium hover:bg-base-200"
            onClick={onClose}
          >
            Bekor qilish
          </button>
          <button
            className="px-6 py-2.5 rounded-lg bg-info text-base-100 font-medium hover:shadow-lg hover:scale-105"
            onClick={handleSubmit}
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}