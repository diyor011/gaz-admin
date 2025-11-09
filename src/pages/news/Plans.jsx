import React, { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2 } from "lucide-react";
import EditDocumentModal from '../../components/EditDocumentModal';
import AddVacansiyaModal from '../../components/AddVacansiyaModal';
import EditVacansiyaModal from '../../components/EditVacansiyaModal';
import AddPlansModal from '../../components/AddPlansModal';

const Plans = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false) // Edit modal state
  const [editingId, setEditingId] = useState(null) // Tahrirlash ID
  const [form, setForm] = useState({
    startMoth_uz: "",
    startMoth_ru: "",
    startMoth_oz: "",
    endMoth_uz: "",
    endMoth_ru: "",
    endMoth_oz: "",
    title_uz: "",
    title_ru: "",
    title_oz: "",
    description_uz: "",
    description_ru: "",
    description_oz: "",
    participantsCount: "",
    category_uz: "",
    category_ru: "",
    category_oz: "",


  });

  const GetPlans = async () => {
    try {
      const response = await fetch('https://uzbekneftegaz-backend-production.up.railway.app/api/plans-reports')
      const request = await response.json()

      if (!response.ok) {
        throw new Error(response.status())
      }
      setData(request.plans)
      setLoading(true)
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      startMoth_uz: "",
      startMoth_ru: "",
      startMoth_oz: "",
      endMoth_uz: "",
      endMoth_ru: "",
      endMoth_oz: "",
      title_uz: "",
      title_ru: "",
      title_oz: "",
      description_uz: "",
      description_ru: "",
      description_oz: "",
      participantsCount: "",
      category_uz: "",
      category_ru: "",
      category_oz: "",
    });
    setEditingId(null);
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const body = {
  startMoth_uz: "Январ",
  startMoth_ru: "Январь",
  startMoth_oz: "Yanvar",
  endMoth_uz: "Март",
  endMoth_ru: "Март",
  endMoth_oz: "Mart",
  title_uz: "I chorak reja",
  title_ru: "План на 1 квартал",
  title_oz: "I chorak reja",
  description_uz: "Январ-март ойлари учун режа",
  description_ru: "План на январь-март",
  description_oz: "Yanvar-mart oylari uchun reja",
  participantsCount: 25,
  category_uz: "Режа",
  category_ru: "План",
  category_oz: "Reja"
}

    try {
      const response = await fetch(
        "https://uzbekneftegaz-backend-production.up.railway.app/api/plans-reports",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      console.log("📤 Yuborilayotgan body:", body);

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Server error:", data);
        alert("Xatolik: " + (data.message || "Server xatosi"));
        return;
      }

      alert("✅ Reja muvaffaqiyatli qo‘shildi!");
      await GetPlans();
      setOpenAddModal(false);
      resetForm();
    } catch (error) {
      console.error("❌ Xatolik:", error);
      alert("Server bilan bog‘lanishda xatolik yuz berdi!");
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
  // Edit modal ochish
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
      const response = await fetch(`https://uzbekneftegaz-backend-production.up.railway.app/api/vacancies/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("❌ Server error:", data);
        alert("Xatolik: " + (data.message || "Server xatosi"));
        return;
      }

      alert("✅ Vakansiya muvaffaqiyatli tahrirlandi!");
      await GetPlans();
      setOpenEditModal(false);
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Server bilan bog‘lanishda xatolik yuz berdi!");
    }
  };




  const deleteDocuments = async (id) => {
    const isConfirm = window.confirm("Rostan ham bu rahbarni o'chirmoqchimisiz?");
    if (!isConfirm) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://uzbekneftegaz-backend-production.up.railway.app/api/normative/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        console.error("Server Error:", errData);
        return;
      }

      GetPlans();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  useEffect(() => {
    GetPlans()
  }, [])

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                Hisobot va rejalar
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
          <table className="w-full">
            <thead className="bg-base-100">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Oy boshlanishi
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Oy tugashi
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Rejalar kvartol
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Oylik Rejalar
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Ishtriokchilar soni
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Rejalar turi
                </th>

              </tr>
            </thead>
            <tbody className="divide-y divide-info  ">
              {data.map((plan) => (
                <tr
                  key={plan._id}
                  className="hover:bg-base-200 transition-colors"
                >


                  <td className="whitespace-nowrap pl-4 text-center">{plan.startMonth?.uz}</td>
                  <td className="whitespace-nowrap text-center">{plan.endMonth?.uz}</td>
                  <td className="whitespace-nowrap text-center">{plan.title?.uz}</td>
                  <td className="whitespace-nowrap text-center">{plan.description?.uz}</td>
                  <td className="whitespace-nowrap text-center">{plan.participantsCount}</td>
                  <td className="whitespace-nowrap text-center">{plan.category?.uz}</td>

                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(plan)}
                      className="p-2 text-blue-500 hover:bg-info rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteDocuments(plan._id)}
                      className="p-2 text-red-600 hover:bg-error rounded-lg ml-2 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddPlansModal
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
    </div>
  )
}

export default Plans