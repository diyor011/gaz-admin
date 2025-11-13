import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import PlansModal from "../../components/AddPlansModal"; // Yangi nom
import AddPlansModal from "../../components/AddPlansModal";
import AddGenderModal from "../../components/AddGenderModal";
import EditPlansModal from "../../components/EditPlansModal";

const Plans = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    startMonth_uz: "",
    startMonth_ru: "",
    startMonth_oz: "",
    endMonth_uz: "",
    endMonth_ru: "",
    endMonth_oz: "",
    title_uz: "",
    title_ru: "",
    title_oz: "",
    description_uz: "",
    description_ru: "",
    description_oz: "",
    participantsCount: "",
    category_uz: "Режа",
    category_ru: "План",
    category_oz: "Reja",
  });

  const API_URL = "https://uzneftegaz-backend-production.up.railway.app/api/plansReports";

  const GetPlans = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store", // Bu muhim!
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Server error");
      setData(result.reports || []);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setForm({
      startMonth_uz: "", startMonth_ru: "", startMonth_oz: "",
      endMonth_uz: "", endMonth_ru: "", endMonth_oz: "",
      title_uz: "", title_ru: "", title_oz: "",
      description_uz: "", description_ru: "", description_oz: "",
      participantsCount: "",
      category_uz: "Режа", category_ru: "План", category_oz: "Reja",
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      startMonth_uz: form.startMonth_uz || "",
      startMonth_ru: form.startMonth_ru || "",
      startMonth_oz: form.startMonth_oz || "",
      endMonth_uz: form.endMonth_uz || "",
      endMonth_ru: form.endMonth_ru || "",
      endMonth_oz: form.endMonth_oz || "",
      title_uz: form.title_uz || "",
      title_ru: form.title_ru || "",
      title_oz: form.title_oz || "",
      description_uz: form.description_uz || "",
      description_ru: form.description_ru || "",
      description_oz: form.description_oz || "",
      participantsCount: Number(form.participantsCount) || 0,
      category_uz: form.category_uz || "Reja",
      category_ru: form.category_ru || "План",
      category_oz: form.category_oz || "Reja",
    };

    console.log("Yuborilayotgan ma'lumot:", payload); // DEBUG

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Server javobi:", data); // DEBUG

      if (!response.ok) {
        throw new Error(data.message || `Server xatosi: ${response.status}`);
      }

      alert("Reja muvaffaqiyatli qo'shildi!");
      await GetPlans();
      setOpenAddModal(false);
      resetForm();
    } catch (error) {
      console.error("POST xatosi:", error);
      alert("Xatolik: " + error.message);
    }
  };
  const handleEditClick = (plan) => {
    setForm({
      startMonth_uz: plan.startMonth?.uz || "",
      startMonth_ru: plan.startMonth?.ru || "",
      startMonth_oz: plan.startMonth?.oz || "",
      endMonth_uz: plan.endMonth?.uz || "",
      endMonth_ru: plan.endMonth?.ru || "",
      endMonth_oz: plan.endMonth?.oz || "",
      title_uz: plan.title?.uz || "",
      title_ru: plan.title?.ru || "",
      title_oz: plan.title?.oz || "",
      description_uz: plan.description?.uz || "",
      description_ru: plan.description?.ru || "",
      description_oz: plan.description?.oz || "",
      participantsCount: Number(plan.participantsCount) || 0, // ✅ Boshidanoq raqam
      category_uz: plan.category?.uz || "Режа",
      category_ru: plan.category?.ru || "План",
      category_oz: plan.category?.oz || "Reja",
    });
    setEditingId(plan._id);
    setOpenEditModal(true);
  };
  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      startMonth_uz: form.startMonth_uz || "",
      startMonth_ru: form.startMonth_ru || "",
      startMonth_oz: form.startMonth_oz || "",
      endMonth_uz: form.endMonth_uz || "",
      endMonth_ru: form.endMonth_ru || "",
      endMonth_oz: form.endMonth_oz || "",
      category_uz: form.category_uz || "Режа",
      category_ru: form.category_ru || "План",
      category_oz: form.category_oz || "Reja",
      title_uz: form.title_uz || "",
      title_ru: form.title_ru || "",
      title_oz: form.title_oz || "",
      description_uz: form.description_uz || "",
      description_ru: form.description_ru || "",
      description_oz: form.description_oz || "",
      participantsCount: Number(form.participantsCount) || 0,
    };

    // ✅ JSON stringni ko'ramiz
    const jsonString = JSON.stringify(payload);
    console.log("JSON STRING:", jsonString);
    console.log("JSON parsed back:", JSON.parse(jsonString));

    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: jsonString, // Aynan shu string ketadi
      });

      const data = await response.json();
      console.log("PUT javobi:", data);

      if (!response.ok) {
        throw new Error(data.message || `Server xatosi: ${response.status}`);
      }

      alert("Reja muvaffaqiyatli tahrirlandi!");
      await GetPlans();
      setOpenEditModal(false);
      resetForm();
    } catch (error) {
      console.error("PUT xatosi:", error);
      alert("Xatolik: " + error.message);
    }
  };
  const deletePlan = async (id) => {
    if (!window.confirm("Rostan o'chirmoqchimisiz?")) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("O'chirishda xatolik");
      await GetPlans();
    } catch (err) {
      alert("O'chirishda xatolik");
    }
  };

  useEffect(() => {
    GetPlans();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-base-content">Oylik Rejalar</h1>
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

        {loading ? (
          <p className="text-center py-10">Yuklanmoqda...</p>
        ) : (
          <div className="bg-base-100 rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-base-200">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold text-base-content uppercase">Oy boshlanishi</th>
                  <th className="p-4 text-left text-xs font-semibold text-base-content uppercase">Oy tugashi</th>
                  <th className="p-4 text-left text-xs font-semibold text-base-content uppercase">Kvartal</th>
                  <th className="p-4 text-left text-xs font-semibold text-base-content uppercase">Reja</th>
                  <th className="p-4 text-center text-xs font-semibold text-base-content uppercase">Ishtirokchilar</th>
                  <th className="p-4 text-center text-xs font-semibold text-base-content uppercase">Turi</th>
                  <th className="p-4 text-center text-xs font-semibold text-base-content uppercase">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {data.map((plan) => (
                  <tr key={plan._id} className="hover:bg-base-200 transition-colors">
                    <td className="p-4">{plan.startMonth?.uz}</td>
                    <td className="p-4">{plan.endMonth?.uz}</td>
                    <td className="p-4">{plan.title?.uz}</td>
                    <td className="p-4 max-w-xs truncate">{plan.description?.uz}</td>
                    <td className="p-4 text-center">{plan.participantsCount}</td>
                    <td className="p-4 text-center">{plan.category?.uz}</td>
                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={() => handleEditClick(plan)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deletePlan(plan._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
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

      <AddPlansModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
      />
      <EditPlansModal
        open={openEditModal}
        onClose={() => { setOpenEditModal(false); resetForm(); }}
        onSubmit={handleEditSubmit} // PUT so‘rovni yuboradi
        form={form}
        setForm={setForm}
      />
    </div>
  );
};

export default Plans;