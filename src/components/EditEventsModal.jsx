import { X, User, FileText, Image, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function EditEventsModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingNews
}) {
  useEffect(() => {
    if (editingNews) {
      setForm({
        title_uz: editingNews.title?.uz || "",
        title_ru: editingNews.title?.ru || "",
        title_oz: editingNews.title?.oz || "",
        description_uz: editingNews.description?.uz || "",
        description_ru: editingNews.description?.ru || "",
        description_oz: editingNews.description?.oz || "",
        date: editingNews.date || "",
        time: editingNews.time || "",
        location_uz: editingNews.location?.uz || "",
        location_ru: editingNews.location?.ru || "",
        location_oz: editingNews.location?.oz || "",
        category_uz: editingNews.category?.uz || "",
        category_ru: editingNews.category?.ru || "",
        category_oz: editingNews.category?.oz || "",
        users: editingNews.users || "",
        mediaType: editingNews.files || [],
      });
    }
  }, [editingNews]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  console.log(form);
 
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (!file) return; // Agar hech narsa tanlanmasa — hech narsa qilmasin

    setForm((prev) => {
      const newMedia = [...(prev.mediaType || [])];

      // Agar array hali yaratilmagan bo‘lsa yoki index katta bo‘lsa
      if (newMedia.length === 0) {
        return { ...prev, mediaType: [file] };
      }

      newMedia[index] = file;
      return { ...prev, mediaType: newMedia };
    });
  };

  const handleAddImageInput = () => {
    setForm((prev) => ({
      ...prev,
      mediaType: [...(prev.mediaType || []), null],
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
            <h2 className="text-2xl font-bold text-base-100">Tadbir qoshish</h2>
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
                Tadbir nomi
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(УЗ)"
                name="title_uz"
                value={form.title_uz}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(RU)"
                name="title_ru"
                value={form.title_ru}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(UZ)"
                name="title_oz"
                value={form.title_oz}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-info" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                Tadbir Turi
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(УЗ)"
                name="category_uz"
                value={form.category_uz}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(RU)"
                name="category_ru"
                value={form.category_ru}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(UZ)"
                name="category_oz"
                value={form.category_oz}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-info" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                Tadbir manzili
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder=" (УЗ)"
                name="location_uz"
                value={form.location_uz}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(RU)"
                name="location_ru"
                value={form.location_ru}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(UZ)"
                name="location_oz"
                value={form.location_oz}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-info" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                Tadbir Malumoti
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(УЗ)"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(RU)"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
              />
              <input
                className="px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(UZ)"
                name="users"
                value={form.users}
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
                className="w-full px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(УЗ)"
                name="description_uz"
                value={form.description_uz}
                onChange={handleChange}
                rows="3"
              ></textarea>
              <textarea
                className="w-full px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(RU)"
                name="description_ru"
                value={form.description_ru}
                onChange={handleChange}
                rows="3"
              ></textarea>
              <textarea
                className="w-full px-4 py-3 border-2  text-info border-info hover:border-warning hover:text-warning focus:text-success -200 rounded-lg focus:border-success outline-none transition-colors duration"
                placeholder="(UZ)"
                name="description_oz"
                value={form.description_oz}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Image size={18} className="text-error" />
              <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                Rasm Yuklash
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Image size={18} className="text-error" />
                <h3 className="text-sm font-semibold text-base-content uppercase tracking-wide">
                  Rasm yoki video yuklash
                </h3>
              </div>

              {/* Har doim bitta bo‘sh input + tanlanganlar */}
              <div className="space-y-3">
                {/* Tanlangan fayllar */}
                {form.mediaType?.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="flex items-center justify-between bg-base-200 px-4 py-3 rounded-lg border border-base-300">
                      <div className="flex items-center gap-3">
                        <Image size={20} className="text-success" />
                        <span className="text-sm font-medium truncate max-w-xs">
                          {file.name}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            mediaType: prev.mediaType.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                        className="text-red-500 hover:bg-red-500 hover:text-white p-1 rounded transition-all"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Yangi fayl qo‘shish uchun doimiy input */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    id="add-new-image"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      setForm((prev) => ({
                        ...prev,
                        mediaType: [...(prev.mediaType || []), file],
                      }));

                      // Inputni tozalash (yana tanlash uchun)
                      e.target.value = "";
                    }}
                  />
                  <label
                    htmlFor="add-new-image"
                    className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-base-300 rounded-lg hover:border-primary hover:bg-base-200 transition-all cursor-pointer group"
                  >
                    <Plus
                      size={24}
                      className="text-base-300 group-hover:text-primary"
                    />
                    <span className="font-medium text-base-300 group-hover:text-primary">
                      Yangi rasm yoki video qo‘shish
                    </span>
                  </label>
                </div>
              </div>
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
