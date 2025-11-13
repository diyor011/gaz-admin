import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, File } from "lucide-react";
import AddGenderModal from '../../components/AddGenderModal';
import { toast, ToastContainer } from 'react-toastify';
import EditDocumentModal from '../../components/EditDocumentModal';
import EditGenderModal from '../../components/EditGenderModal';

const GenderEquality = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title_uz: "", title_ru: "", title_oz: "",
    description_uz: "", description_ru: "", description_oz: "",
    file: null,
  });

  const API_URL = "https://uzneftegaz-backend-production.up.railway.app/api/gender";

  const GetDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL); // `/` olib tashlandi
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setData(result.gender || []);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title_uz: "", title_ru: "", title_oz: "",
      description_uz: "", description_ru: "", description_oz: "",
      file: null,
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title_uz", form.title_uz);
    formData.append("title_ru", form.title_ru);
    formData.append("title_oz", form.title_oz);
    formData.append("description_uz", form.description_uz);
    formData.append("description_ru", form.description_ru);
    formData.append("description_oz", form.description_oz);
    if (form.file) formData.append("file", form.file);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Server xatosi");

      alert("Hujjat qo'shildi!");
      await GetDocuments();
      setOpenAddModal(false);
      resetForm();
    } catch (error) {
      alert("Xatolik: " + error.message);
    }
  };
  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title_uz", form.title_uz);
    formData.append("title_ru", form.title_ru);
    formData.append("title_oz", form.title_oz);
    formData.append("description_uz", form.description_uz);
    formData.append("description_ru", form.description_ru);
    formData.append("description_oz", form.description_oz);
    if (form.file) formData.append("file", form.file);

    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Tahrirlashda xatolik!");

      toast.success("Hujjat yangilandi!");
      await GetDocuments();
      setOpenEditModal(false);
      resetForm();
    } catch (error) {
      toast.error("Xatolik: " + error.message);
    }
  };

  const handleEditClick = (doc) => {
    setForm({
      title_uz: doc.title?.uz || "",
      title_ru: doc.title?.ru || "",
      title_oz: doc.title?.oz || "",
      description_uz: doc.description?.uz || "",
      description_ru: doc.description?.ru || "",
      description_oz: doc.description?.oz || "",
      file: null,
    });
    setEditingId(doc._id);
    setOpenEditModal(true);
  };


  const deleteDocuments = async (id) => {
    const isConfirm = window.confirm("Rostan ham bu malumotni o'chirmoqchimisiz?");
    if (!isConfirm) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://uzneftegaz-backend-production.up.railway.app/api/gender/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error(response.status)
        const errData = await response.json();
        toast.error("Server Error:", errData);
        return;
      } else {
        toast.success("Malumot muvaffaqiyatli ochirildi")
      }

      GetDocuments();
    } catch (err) {
      toast.error("Delete Error:", err);
    }
  };




  useEffect(() => {
    GetDocuments();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-base-content">Gender tengligi</h1>
            <button onClick={() => { resetForm(); setOpenAddModal(true); }} className="btn btn-info text-base-100 gap-2">
              <Plus size={18} /> Yangi qo'shish
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-10">Yuklanmoqda...</p>
        ) : (
          <div className="bg-base-100 rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-base-200">
                <tr>
                  <th className="p-4 text-left">rasim</th>
                  <th className="p-4 text-left">Sarlavha</th>
                  <th className="p-4 text-left">Tavsif</th>
                  <th className="p-4 text-center">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {data.map((doc) => (
                  <tr key={doc._id} className="hover:bg-base-200">
                    <td className="p-4 w-24 h-24">
                      <img
                        src={doc.file}
                        alt="Hujjat rasmi"
                        className="w-full h-full object-cover rounded-lg shadow-md border"
                      />
                    </td>
                    <td className="p-4">{doc.title?.uz}</td>
                    <td className="p-4 max-w-xs truncate">{doc.description?.uz}</td>
                    <td className="p-4 text-center space-x-2">
                      <button onClick={() => handleEditClick(doc)} className="text-blue-600 hover:bg-blue-100 p-2 rounded">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => deleteDocuments(doc._id)} className="text-red-600 hover:bg-red-100 p-2 rounded">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD MODAL */}
      <AddGenderModal
        open={openAddModal}
        onClose={() => { setOpenAddModal(false); resetForm(); }}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
      />
      <EditGenderModal
        open={openEditModal}
        onClose={() => { setOpenEditModal(false); resetForm(); }}
        onSubmit={handleEditSubmit} // ✅ endi to‘g‘ri funksiya
        form={form}
        setForm={setForm}
      />


      <ToastContainer />
    </div>
  );
};

export default GenderEquality;