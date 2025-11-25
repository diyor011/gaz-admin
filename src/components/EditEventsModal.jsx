import { X, User, FileText, Image, Plus } from "lucide-react";
import { useEffect } from "react";

export default function EditEventsModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingNews,
}) {
  // Modal ochilganda mavjud ma'lumotlarni formga yuklash
  useEffect(() => {
    if (editingNews && open) {
      setForm({
        title_uz: editingNews.title?.uz || "",
        title_ru: editingNews.title?.ru || "",
        title_oz: editingNews.title?.oz || "",
        description_uz: editingNews.description?.uz || "",
        description_ru: editingNews.description?.ru || "",
        description_oz: editingNews.description?.oz || "",
        date: editingNews.date ? editingNews.date.split("T")[0] : "", // ISO formatdan YYYY-MM-DD
        time: editingNews.time || "",
        location_uz: editingNews.location?.uz || "",
        location_ru: editingNews.location?.ru || "",
        location_oz: editingNews.location?.oz || "",
        category_uz: editingNews.category?.uz || "",
        category_ru: editingNews.category?.ru || "",
        category_oz: editingNews.category?.oz || "",
        users: editingNews.users || "",
        files: [], // Yangi yuklangan fayllar (File ob'ektlari)
        existingFiles: editingNews.files || [], // Backenddan kelgan eski rasm URL'lari
      });
    }
  }, [editingNews, open, setForm]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Yangi fayl qo'shish
  const handleFileAdd = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      files: [...(prev.files || []), file],
    }));
    e.target.value = "";
  };

  // Yangi yuklangan faylni o'chirish
  const removeNewFile = (index) => {
    setForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  // Eskisini serverdan o'chirish uchun belgilash (faqat backendga habar berish uchun)
  const removeExistingFile = (index) => {
    setForm((prev) => ({
      ...prev,
      existingFiles: prev.existingFiles.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 bg-base-content/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-info px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-base-100/20 backdrop-blur-sm flex items-center justify-center">
              <User className="text-base-100" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-base-100">
              Tadbir tahrirlash
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-base-100/20 hover:bg-base-100/30 transition-all flex items-center justify-center group"
          >
            <X
              className="text-base-100 group-hover:rotate-90 transition-transform"
              size={20}
            />
          </button>
        </div>

        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto space-y-6">
          {/* Sarlavha */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-info mb-3">
              Tadbir nomi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                placeholder="Sarlavha (UZ)"
                name="title_uz"
                value={form.title_uz || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
              <input
                placeholder="Название (RU)"
                name="title_ru"
                value={form.title_ru || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
              <input
                placeholder="Sarlavha (OZ)"
                name="title_oz"
                value={form.title_oz || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
            </div>
          </div>

          {/* Kategoriya, Manzil, Sana/Vaqt/Users */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-info mb-3">
              Tadbir turi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                placeholder="Kategoriya (UZ)"
                name="category_uz"
                value={form.category_uz || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
              <input
                placeholder="Тип (RU)"
                name="category_ru"
                value={form.category_ru || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
              <input
                placeholder="Kategoriya (OZ)"
                name="category_oz"
                value={form.category_oz || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase text-info mb-3">
              Manzil
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                placeholder="Manzil (UZ)"
                name="location_uz"
                value={form.location_uz || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
              <input
                placeholder="Адрес (RU)"
                name="location_ru"
                value={form.location_ru || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
              <input
                placeholder="Manzil (OZ)"
                name="location_oz"
                value={form.location_oz || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase text-info mb-3">
              Sana va vaqt
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="date"
                name="date"
                value={form.date || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
              <input
                type="time"
                name="time"
                value={form.time || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
              <input
                placeholder="Ishtirokchilar"
                name="users"
                value={form.users || ""}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
            </div>
          </div>

          {/* Tavsif */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-info mb-3 flex items-center gap-2">
              <FileText size={18} /> Tavsif
            </h3>
            <div className="space-y-3">
              <textarea
                placeholder="Tavsif (UZ)"
                name="description_uz"
                value={form.description_uz || ""}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
              <textarea
                placeholder="Описание (RU)"
                name="description_ru"
                value={form.description_ru || ""}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
              <textarea
                placeholder="Tavsif (OZ)"
                name="description_oz"
                value={form.description_oz || ""}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none"
              />
            </div>
          </div>

          {/* Rasmlar */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-info mb-4 flex items-center gap-2">
              <Image size={20} className="text-error" /> Rasmlar va videolar
            </h3>

            {/* Eski rasmlar (serverdan kelgan) */}
            {form.existingFiles?.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">
                  Mavjud rasmlar (o‘chirish uchun bosing):
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {form.existingFiles.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt="event"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeExistingFile(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Yangi yuklangan fayllar */}
            {form.files?.length > 0 && (
              <div className="mb-4 space-y-3">
                <p className="text-sm font-medium">Yangi qo‘shilgan fayllar:</p>
                {form.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-base-200 px-4 py-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <Image size={20} className="text-success" />
                      <span className="text-sm truncate max-w-xs">
                        {file.name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeNewFile(index)}
                      className="text-red-500 hover:bg-red-500 hover:text-white p-1.5 rounded"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Yangi fayl yuklash */}
            <input
              type="file"
              accept="image/*,video/*"
              id="edit-file-upload"
              className="hidden"
              onChange={handleFileAdd}
            />
            <label
              htmlFor="edit-file-upload"
              className="flex items-center justify-center gap-3 px-6 py-8 border-2 border-dashed border-base-300 rounded-lg hover:border-primary hover:bg-base-200 cursor-pointer transition group"
            >
              <Plus
                size={28}
                className="text-base-300 group-hover:text-primary"
              />
              <span className="text-lg font-medium text-base-300 group-hover:text-primary">
                Yangi rasm yoki video qo‘shish
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-base-200 px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border-2 border-base-300 font-medium hover:bg-base-300 transition"
          >
            Bekor qilish
          </button>
          <button
            onClick={onSubmit}
            className="px-8 py-2.5 rounded-lg bg-info text-white font-medium hover:shadow-lg hover:scale-105 transition"
          >
            Yangilash
          </button>
        </div>
      </div>
    </div>
  );
}
