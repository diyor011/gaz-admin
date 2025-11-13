import { X, User, FileText, Image, Plus } from "lucide-react";

export default function AddNewsModal({
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

  const handleImageChange = (e, index) => {
    const files = e.target.files[0];
    setForm((prev) => {
      const updatedImages = [...(prev.images || [])];
      updatedImages[index] = files;
      return { ...prev, images: updatedImages };
    });
  };

  const handleAddImageInput = () => {
    setForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), null],
    }));
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
            <h2 className="text-2xl font-bold text-base-100">
              Yangilik qoshish
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-base-100/20 backdrop-blur-sm hover:bg-base-100/30 transition-all duration-200 flex items-center justify-center group"
          >
            <X
              className="text-base-100 group-hover:rotate-90 transition-transform duration-200"
              size={20}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Title */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-info" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                Yangilik nomi
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                placeholder="Yangilik nomi (UZ)"
                name="titleUz"
                value={form.titleUz}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                placeholder="Yangilik nomi (RU)"
                name="titleRu"
                value={form.titleRu}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2 border-base-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-base-200"
                placeholder="Yangilik nomi (OZ)"
                name="titleOz"
                value={form.titleOz}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-teal-600" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                Tavsif
              </h3>
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

          {/* Images */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Image size={18} className="text-error" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                Rasm Yuklash
              </h3>
            </div>

            <div className="space-y-3">
              {(form.images || [null]).map((img, index) => (
                <div key={index} className="relative">
                  <input
                    type="file"
                    accept="image/* ,video/*"
                    className="hidden"
                    id={`image-upload-${index}`}
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <label
                    htmlFor={`image-upload-${index}`}
                    className="flex items-center justify-center gap-3 px-4 py-4 border-2 border-dashed border-base-300 rounded-lg hover:border-error hover:bg-base-200 transition-all duration-200 cursor-pointer group"
                  >
                    <Image
                      size={20}
                      className="text-base-300 group-hover:text-error transition-colors"
                    />
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
