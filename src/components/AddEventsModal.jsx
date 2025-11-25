import { X, User, FileText, Image, Plus } from "lucide-react";

export default function AddEventsModal({
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

  // Fayl qo‘shish (yangi fayl tanlanganda)
  const handleFileAdd = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      files: [...(prev.files || []), file],
    }));

    // Inputni tozalash (yana tanlash uchun)
    e.target.value = "";
  };

  // Fayl o‘chirish
  const removeFile = (index) => {
    setForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
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
            <h2 className="text-2xl font-bold text-base-100">Tadbir qo'shish</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-base-100/20 backdrop-blur-sm hover:bg-base-100/30 transition-all duration-200 flex items-center justify-center group"
          >
            <X className="text-base-100 group-hover:rotate-90 transition-transform duration-200" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto space-y-6">
          {/* Tadbir nomi */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-info" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Tadbir nomi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input placeholder="Tadbir nomi (UZ)" name="title_uz" value={form.title_uz || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
              <input placeholder="Название события (RU)" name="title_ru" value={form.title_ru || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
              <input placeholder="Tadbir nomi (OZ)" name="title_oz" value={form.title_oz || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
            </div>
          </div>

          {/* Kategoriya */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-info" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Tadbir turi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input placeholder="Tadbir turi (UZ)" name="category_uz" value={form.category_uz || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
              <input placeholder="Тип события (RU)" name="category_ru" value={form.category_ru || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
              <input placeholder="Tadbir turi (OZ)" name="category_oz" value={form.category_oz || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
            </div>
          </div>

          {/* Manzil */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-info" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Manzil</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input placeholder="Manzil (UZ)" name="location_uz" value={form.location_uz || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
              <input placeholder="Адрес (RU)" name="location_ru" value={form.location_ru || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
              <input placeholder="Manzil (OZ)" name="location_oz" value={form.location_oz || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
            </div>
          </div>

          {/* Sana, vaqt, ishtirokchilar */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-info" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Qo'shimcha ma'lumot</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="date" name="date" value={form.date || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
              <input type="time" name="time" value={form.time || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
              <input placeholder="Ishtirokchilar (id yoki son)" name="users" value={form.users || ""} onChange={handleChange}
                className="px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
            </div>
          </div>

          {/* Tavsif */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-info" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Tavsif</h3>
            </div>
            <div className="space-y-3">
              <textarea placeholder="Tavsif (UZ)" name="description_uz" value={form.description_uz || ""} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
              <textarea placeholder="Описание (RU)" name="description_ru" value={form.description_ru || ""} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
              <textarea placeholder="Tavsif (OZ)" name="description_oz" value={form.description_oz || ""} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 border-2 border-info rounded-lg focus:border-success outline-none transition" />
            </div>
          </div>

          {/* Rasmlar yuklash */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image size={20} className="text-error" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Rasmlar va videolar</h3>
            </div>

            {/* Tanlangan fayllar */}
            <div className="space-y-3 mb-4">
              {form.files?.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-base-200 px-4 py-3 rounded-lg border border-base-300">
                  <div className="flex items-center gap-3">
                    <Image size={20} className="text-success" />
                    <span className="text-sm font-medium truncate max-w-md">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:bg-red-500 hover:text-white p-1.5 rounded transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Yangi fayl qo'shish */}
            <input
              type="file"
              accept="image/*,video/*"
              id="file-upload"
              className="hidden"
              onChange={handleFileAdd}
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-3 px-6 py-8 border-2 border-dashed border-base-300 rounded-lg hover:border-primary hover:bg-base-200 cursor-pointer transition group"
            >
              <Plus size={28} className="text-base-300 group-hover:text-primary" />
              <span className="text-lg font-medium text-base-300 group-hover:text-primary">
                Yangi rasm yoki video qo'shish
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
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}