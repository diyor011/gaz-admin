import React, { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2 } from "lucide-react";
import EditDocumentModal from '../../components/EditDocumentModal';
import AddVacansiyaModal from '../../components/AddVacansiyaModal';
import EditVacansiyaModal from '../../components/EditVacansiyaModal';
import { toast, ToastContainer } from 'react-toastify';

const Vacancies = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false) // Edit modal state
  const [editingId, setEditingId] = useState(null) // Tahrirlash ID
  const [form, setForm] = useState({
    titleUz: "",
    titleRu: "",
    titleOz: "",
    salaryUz: "",
    salaryRu: "",
    salaryOz: "",
    requirementsUz: "",
    requirementsRu: "",
    requirementsOz: "",
    descriptionUz: "",
    descriptionRu: "",
    descriptionOz: "",
    salaryTypeUz: "",
    salaryTypeRu: "",
    salaryTypeOz: "",
    deadline: ""
  });

  const GetDocuments = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://uzneftegaz-backend-production.up.railway.app/api/vacancies')
      const request = await response.json()

      if (!response.ok) {
        throw new Error(response.status())
      }
      setData(request.vacancies)
      setLoading(true)
    }
    catch (err) {
      toast.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      titleUz: "",
      titleRu: "",
      titleOz: "",
      salaryUz: "",
      salaryRu: "",
      salaryOz: "",
      requirementsUz: "",
      requirementsRu: "",
      requirementsOz: "",
      descriptionUz: "",
      descriptionRu: "",
      descriptionOz: "",
      salaryTypeUz: "",
      salaryTypeRu: "",
      salaryTypeOz: "",
      deadline: ""
    });
    setEditingId(null);
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const body = {
      title: {
        uz: form.titleUz,
        ru: form.titleRu,
        oz: form.titleOz,
      },
      description: {
        uz: form.descriptionUz,
        ru: form.descriptionRu,
        oz: form.descriptionOz,
      },
      salary: {
        uz: form.salaryUz,
        ru: form.salaryRu,
        oz: form.salaryOz,
      },
      requirements: {
        uz: form.requirementsUz,
        ru: form.requirementsRu,
        oz: form.requirementsOz,
      },
      salaryType: {
        uz: form.salaryTypeUz,
        ru: form.salaryTypeRu,
        oz: form.salaryTypeOz,
      },
      deadline: form.deadline,
    };

    try {
      const response = await fetch(
        "https://uzneftegaz-backend-production.up.railway.app/api/vacancies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error("Xatolik: " + (data.message || "Server xatosi"));
        return;
      }else{
        toast.success("Vacanciya muvaffaqiyatli qoshildi")
      }

      toast.success("✅ Vakansiya muvaffaqiyatli qo‘shildi!");
      await GetDocuments();
      setOpenAddModal(false);
      resetForm();
    } catch (error) {
      console.error("❌ Xatolik:", error);
      toast.error("Server bilan bog‘lanishda xatolik yuz berdi!");
    }
  };


  const createVacansiya = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://uzneftegaz-backend-production.up.railway.app/api/vacancies",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error(response.status)

        throw new Error(`Server error: ${response.status}`);
      }

      await GetDocuments();
      setOpenAddModal(false);
      resetForm();
    } catch (err) {
      toast.error("Error creating leader:", err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const handleEditClick = (document) => {
    setForm({
      titleUz: document.title?.uz || "",
      titleRu: document.title?.ru || "",
      titleOz: document.title?.oz || "",
      descriptionUz: document.description?.uz || "",
      descriptionRu: document.description?.ru || "",
      descriptionOz: document.description?.oz || "",
      salaryUz: document.salary?.uz || "",
      salaryRu: document.salary?.ru || "",
      salaryOz: document.salary?.oz || "",
      requirementsUz: document.requirements?.uz || "",
      requirementsRu: document.requirements?.ru || "",
      requirementsOz: document.requirements?.oz || "",
      salaryTypeUz: document.salaryType?.uz || "",
      salaryTypeRu: document.salaryType?.ru || "",
      salaryTypeOz: document.salaryType?.oz || "",
      deadline: formatDate(document.deadline),
    });
    setEditingId(document._id);
    setOpenEditModal(true);
  };
  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");

    const body = {
      title: { uz: form.titleUz, ru: form.titleRu, oz: form.titleOz },
      description: { uz: form.descriptionUz, ru: form.descriptionRu, oz: form.descriptionOz },
      salary: { uz: form.salaryUz, ru: form.salaryRu, oz: form.salaryOz },
      requirements: { uz: form.requirementsUz, ru: form.requirementsRu, oz: form.requirementsOz },
      salaryType: { uz: form.salaryTypeUz, ru: form.salaryTypeRu, oz: form.salaryTypeOz },
      deadline: form.deadline,
    };

    try {
      const response = await fetch(`https://uzneftegaz-backend-production.up.railway.app/api/vacancies/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error("Xatolik: " + (data.message || "Server xatosi"));
        return;
      }

      toast.success("✅ Vakansiya muvaffaqiyatli tahrirlandi!");
      await GetDocuments();
      setOpenEditModal(false);
      resetForm();
    } catch (err) {
      toast.error(err);
      toast.error("Server bilan bog‘lanishda xatolik yuz berdi!");
    }
  };




  const deleteDocuments = async (id) => {
    const isConfirm = window.confirm("Rostan ham bu Vacansiya o'chirmoqchimisiz?");
    if (!isConfirm) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://uzneftegaz-backend-production.up.railway.app/api/vacancies/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        toast.error("Server Error:", errData);
        return;
      }else{
        toast.success("Vacanciya muvaffaqiyatli Ochirildi")
      }

      GetDocuments();
    } catch (err) {
      toast.error("Delete Error:", err);
    }
  };

  useEffect(() => {
    GetDocuments()
  }, [])

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                Vakansiyalar
              </h1>
            </div>
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

        <div className="bg-base-100 rounded-xl shadow-sm shadow-info overflow-hidden w-full">
          {loading && data.length === 0 ? (<div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-info"></div>
            <p className="text-gray-500 mt-4">Yuklanmoqda...</p>
          </div>) : (<table className="w-full">
            <thead className="bg-base-100">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Nomi
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Malumot
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Oylik
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Stavkasi
                </th>

              </tr>
            </thead>
            <tbody className="divide-y divide-info">
              {data.map((vakansiya) => (
                <tr
                  key={vakansiya._id}
                  className="hover:bg-base-200 transition-colors"
                >

                  <td className="px-2 py-2 font-semibold whitespace-nowrap text-sm">
                    {vakansiya.title?.uz}
                  </td>
                  <td className="px-4 py-4 max-w-xs truncate">
                    {vakansiya.description?.uz}
                  </td>
                  <td className="whitespace-nowrap">{vakansiya.salary?.uz}</td>
                  <td className="whitespace-nowrap">{vakansiya.salaryType?.uz}</td>

                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(vakansiya)}
                      className="p-2 text-blue-500 hover:bg-info rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteDocuments(vakansiya._id)}
                      className="p-2 text-red-600 hover:bg-error rounded-lg ml-2 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>)}
        </div>
      </div>

      {/* Modals */}
      <AddVacansiyaModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          resetForm();
        }}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
      />

      <EditVacansiyaModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          resetForm();
        }}
        form={form}
        setForm={setForm}
        onSubmit={handleEditSubmit}
      />
      <ToastContainer />
    </div>
  )
}

export default Vacancies