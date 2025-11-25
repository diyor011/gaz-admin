import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import NewsImageSlider from "../../components/Miniswipper";
import AddEventsModal from "../../components/AddEventsModal";
import EditEventsModal from "../../components/EditEventsModal";
import { toast, ToastContainer } from "react-toastify";

const Events = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const [form, setForm] = useState({
    title_uz: "", title_ru: "", title_oz: "",
    description_uz: "", description_ru: "", description_oz: "",
    date: "", time: "",
    location_uz: "", location_ru: "", location_oz: "",
    category_uz: "", category_ru: "", category_oz: "",
    users: "",
    files: [], // modalda ham shu nom ishlatiladi
  });

  // Yangiliklarni olish
  const GetNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://uzneftegaz-backend-production.up.railway.app/api/tadbirlar/all"
      );
      const request = await response.json();

      if (!response.ok) throw new Error("Server xatosi!");
      setData(request.tadbir || []);
    } catch (err) {
      console.error("GetNews error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Forma reset
  const resetForm = () => {
    setForm({
      title_uz: "", title_ru: "", title_oz: "",
      description_uz: "", description_ru: "", description_oz: "",
      date: "", time: "",
      location_uz: "", location_ru: "", location_oz: "",
      category_uz: "", category_ru: "", category_oz: "",
      users: "",
      files: [],
    });
  };

  // CREATE – to‘g‘ri ishlaydi
  const handleSubmit = async () => {
    const fd = new FormData();

    fd.append("title_uz", form.title_uz);
    fd.append("title_ru", form.title_ru);
    fd.append("title_oz", form.title_oz);
    fd.append("description_uz", form.description_uz);
    fd.append("description_ru", form.description_ru);
    fd.append("description_oz", form.description_oz);
    fd.append("date", form.date);
    fd.append("time", form.time);
    fd.append("location_uz", form.location_uz);
    fd.append("location_ru", form.location_ru);
    fd.append("location_oz", form.location_oz);
    fd.append("category_uz", form.category_uz);
    fd.append("category_ru", form.category_ru);
    fd.append("category_oz", form.category_oz);
    fd.append("users", form.users);

    // files to‘g‘ri nom bilan yuboriladi
    form.files.forEach((file) => {
      if (file) fd.append("files", file);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://uzneftegaz-backend-production.up.railway.app/api/tadbirlar/create",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        }
      );

      if (!response.ok) throw new Error("Server xatosi");

      toast.success("Tadbir muvaffaqiyatli qo'shildi!");
      setOpenAddModal(false);
      resetForm();
      GetNews();
    } catch (err) {
      toast.error("Xatolik: Tadbir qo'shib bo'lmadi");
    }
  };

  // EDIT – to‘g‘ri ishlaydi (faqat files ishlatiladi)
  const handleEditSubmit = async () => {
    if (!editingNews) return;

    const fd = new FormData();

    fd.append("title_uz", form.title_uz);
    fd.append("title_ru", form.title_ru);
    fd.append("title_oz", form.title_oz);
    fd.append("description_uz", form.description_uz);
    fd.append("description_ru", form.description_ru);
    fd.append("description_oz", form.description_oz);
    fd.append("date", form.date);
    fd.append("time", form.time);
    fd.append("location_uz", form.location_uz);
    fd.append("location_ru", form.location_ru);
    fd.append("location_oz", form.location_oz);
    fd.append("category_uz", form.category_uz);
    fd.append("category_ru", form.category_ru);
    fd.append("category_oz", form.category_oz);
    fd.append("users", form.users);

    // Faqat yangi yuklangan fayllar yuboriladi
    form.files.forEach((file) => {
      if (file) fd.append("files", file);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://uzneftegaz-backend-production.up.railway.app/api/tadbirlar/${editingNews._id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Yangilab bo'lmadi");
      }

      toast.success("Tadbir muvaffaqiyatli yangilandi!");
      setOpenEditModal(false);
      setEditingNews(null);
      resetForm();
      GetNews();
    } catch (err) {
      console.error(err);
      toast.error("Xatolik: " + (err.message || "Tadbir yangilanmadi"));
    }
  };

  // Edit tugmasi bosilganda – form to‘ldiriladi
  const handleEditClick = (news) => {
    setEditingNews(news);
    setForm({
      title_uz: news.title?.uz || "",
      title_ru: news.title?.ru || "",
      title_oz: news.title?.oz || "",
      description_uz: news.description?.uz || "",
      description_ru: news.description?.ru || "",
      description_oz: news.description?.oz || "",
      date: news.date ? news.date.slice(0, 10) : "",
      time: news.time || "",
      location_uz: news.location?.uz || "",
      location_ru: news.location?.ru || "",
      location_oz: news.location?.oz || "",
      category_uz: news.category?.uz || "",
      category_ru: news.category?.ru || "",
      category_oz: news.category?.oz || "",
      users: news.users || "",
      files: [], // yangi fayllar bo‘sh
    });
    setOpenEditModal(true);
  };

  // DELETE – ishlaydi
  const deleteNews = async (id) => {
    if (!window.confirm("Bu tadbirni o'chirmoqchimisiz?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://uzneftegaz-backend-production.up.railway.app/api/tadbirlar/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Server xatosi!");
      toast.success("Tadbir o'chirildi!");
      GetNews();
    } catch (err) {
      toast.error("Xatolik: o'chirib bo'lmadi!");
    }
  };

  useEffect(() => {
    GetNews();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header – o‘zgarmadi */}
        <div className="bg-base-100 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-base-content">Tadbirlar</h1>
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

        {/* Jadval – butunlay o‘zgarmadi */}
        <div className="bg-base-100 rounded-xl shadow-sm shadow-info overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Rasm</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Nom</th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">Tavsif</th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">Manzil</th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">Vaqt</th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">Sana</th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">Qatnashuvchilar</th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">Turi</th>
                <th className="p-4 text-right text-xs font-semibold text-gray-600 uppercase">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-info">
              {loading ? (
                <tr><td colSpan={9} className="text-center py-6">Yuklanmoqda...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-6">Yangiliklar mavjud emas</td></tr>
              ) : (
                data.map((news) => (
                  <tr key={news._id} className="hover:bg-base-200 transition-colors">
                    <td className="px-4 py-2"><NewsImageSlider news={news} /></td>
                    <td className="px-2 py-2 font-semibold break-words text-xs">
                      {news.title?.uz?.slice(0, 20)}
                    </td>
                    <td className="px-3 py-4 text-xs text-center line-clamp-1">
                      {news.description?.uz?.slice(0, 100)}
                    </td>
                    <td className="px-3 py-4 text-xs text-center break-words">{news.location?.uz}</td>
                    <td className="px-3 py-4 text-xs text-center break-words">{news.time}</td>
                    <td className="px-3 py-4 text-xs text-center break-words">{news.date?.slice(0, 10)}</td>
                    <td className="px-3 py-4 text-xs text-center break-words">{news.users}</td>
                    <td className="px-3 py-4 text-xs text-center line-clamp-1">{news.category?.uz}</td>
                    <td className="px-3 py-4 text-right whitespace-nowrap text-xs">
                      <button onClick={() => handleEditClick(news)} className="p-1 text-blue-500 hover:bg-info rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => deleteNews(news._id)} className="p-1 text-red-600 hover:bg-error rounded-lg ml-2 transition-colors">
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

      {/* Modallar – o‘zgarmadi */}
      <AddEventsModal
        open={openAddModal}
        onClose={() => { setOpenAddModal(false); resetForm(); }}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
      />

      <EditEventsModal
        open={openEditModal}
        onClose={() => { setOpenEditModal(false); setEditingNews(null); resetForm(); }}
        onSubmit={handleEditSubmit}
        form={form}
        setForm={setForm}
        editingNews={editingNews}
      />

      <ToastContainer />
    </div>
  );
};

export default Events;