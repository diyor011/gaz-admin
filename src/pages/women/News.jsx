import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import AddNewsModal from "../../components/AddNewsModal";
import EditNewsModal from "../../components/EditNews.modal";
import NewsImageSlider from "../../components/Miniswipper";

const News = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const [form, setForm] = useState({
    titleUz: "",
    titleRu: "",
    titleOz: "",
    descriptionUz: "",
    descriptionRu: "",
    descriptionOz: "",
    images: [],
  });

  // 📥 Yangiliklarni olish
  const GetNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://uzbekneftegaz-backend-production.up.railway.app/api/localNews"
      );
      const request = await response.json();

      if (!response.ok) throw new Error("Server xatosi!");
      setData(request.news || []);
    } catch (err) {
      console.error("GetNews error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Forma reset
  const resetForm = () => {
    setForm({
      titleUz: "",
      titleRu: "",
      titleOz: "",
      descriptionUz: "",
      descriptionRu: "",
      descriptionOz: "",
      images: [],
    });
  };

  // ➕ Yangilik qo'shish
  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("title_uz", form.titleUz);
    fd.append("title_ru", form.titleRu);
    fd.append("title_oz", form.titleOz);
    fd.append("desc_uz", form.descriptionUz);
    fd.append("desc_ru", form.descriptionRu);
    fd.append("desc_oz", form.descriptionOz);

    if (form.images?.length > 0) {
      form.images.forEach((img) => {
        if (img) fd.append("images", img);
      });
    }

    createNews(fd);
  };

  // 🟢 Create API
  const createNews = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://uzbekneftegaz-backend-production.up.railway.app/api/localNews",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!response.ok) throw new Error(`Xato: ${response.status}`);

      await GetNews();
      setOpenAddModal(false);
      resetForm();
      alert("✅ Yangilik muvaffaqiyatli qo'shildi!");
    } catch (err) {
      console.error("Create news error:", err);
      alert("Xatolik: Yangilikni yaratib bo'lmadi!");
    }
  };

  // ✏️ Edit tugmasi bosilganda
  const handleEditClick = (news) => {
    setEditingNews(news);
    setOpenEditModal(true);
  };

  // 📝 Yangilikni tahrirlashni yuborish
  const handleEditSubmit = (editedForm) => {
    const fd = new FormData();
    fd.append("title_uz", editedForm.titleUz);
    fd.append("title_ru", editedForm.titleRu);
    fd.append("title_oz", editedForm.titleOz);
    fd.append("desc_uz", editedForm.descriptionUz);
    fd.append("desc_ru", editedForm.descriptionRu);
    fd.append("desc_oz", editedForm.descriptionOz);

    if (editedForm.images?.length > 0) {
      editedForm.images.forEach((img) => {
        if (img && typeof img !== "string") {
          fd.append("images", img);
        }
      });
    }

    updateNews(editingNews._id, fd);
  };

  // 🟡 PUT API (yangilash)
  const updateNews = async (id, formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://uzbekneftegaz-backend-production.up.railway.app/api/localNews/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!response.ok) {
        const err = await response.json();
        console.error("Update Error:", err);
        alert("Xatolik: yangilikni tahrirlab bo'lmadi!");
        return;
      }

      await GetNews();
      setOpenEditModal(false);
      setEditingNews(null);
      alert("✅ Yangilik muvaffaqiyatli yangilandi!");
    } catch (err) {
      console.error("Update News Error:", err);
      alert("Server bilan bog'lanishda xatolik!");
    }
  };

  // 🗑️ Delete API
  const deleteNews = async (id) => {
    if (!window.confirm("Bu yangilikni o'chirmoqchimisiz?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://uzbekneftegaz-backend-production.up.railway.app/api/localNews/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Server xatosi!");
      await GetNews();
      alert("🗑️ Yangilik o'chirildi!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Xatolik: o'chirib bo'lmadi!");
    }
  };

  useEffect(() => {
    GetNews();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-base-100 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-base-content">Yangiliklar</h1>
            <button
              onClick={() => {
                resetForm();
                setOpenAddModal(true);
              }}
              className="btn btn-info text-base-100 gap-2"
            >
              <Plus size={18} /> Yangi qo'shish
            </button>
          </div>
        </div>

        {/* Jadval */}
        <div className="bg-base-100 rounded-xl shadow-sm shadow-info overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Rasm
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Nom
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Tavsif
                </th>
                <th className="p-4 text-right text-xs font-semibold text-gray-600 uppercase">
                  Amal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-info">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-6">
                    Yuklanmoqda...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6">
                    Yangiliklar mavjud emas
                  </td>
                </tr>
              ) : (
                data.map((news) => (
                  <tr
                    key={news._id}
                    className="hover:bg-base-200 transition-colors"
                  >
                    <td className="px-4 py-2">
                      <NewsImageSlider news={news} />
                    </td>
                    <td className="px-2 py-2 font-semibold whitespace-nowrap text-xs">
                      {news.title?.uz}
                    </td>
                    <td className="px-3 py-4 text-xs text-center break-words">
                      {news.description?.uz}
                    </td>
                    <td className="px-3 py-4 text-right whitespace-nowrap text-xs">
                      <button
                        onClick={() => handleEditClick(news)}
                        className="p-1 text-blue-500 hover:bg-info rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteNews(news._id)}
                        className="p-1 text-red-600 hover:bg-error rounded-lg ml-2 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modallar */}
      <AddNewsModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          resetForm();
        }}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
      />

      <EditNewsModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setEditingNews(null);
        }}
        newsData={editingNews}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default News;