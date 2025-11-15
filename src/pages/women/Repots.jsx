import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import AddReportsModal from "../../components/addReportsModal";
import EditPlansModal from "../../components/EditPlansModal";
import EditRepotsModal from "../../components/EditModalReports";

const Reports = () => {
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
    plan_uz: "Режалаштирилган",
    plan_ru: "Запланировано",
    plan_oz: "Rejalashtirilgan",
  });

  const API_URL = "https://uzneftegaz-backend-production.up.railway.app/api/hisobot";

  const GetPlans = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Server xatosi");

      setData(result.reports || []);
    } catch (err) {
      alert("Yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
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
      plan_uz: "Режалаштирилган",
      plan_ru: "Запланировано",
      plan_oz: "Rejalashtirilgan",
    });
    setEditingId(null);
  };

  // 🔥 POST (ADD) — to‘g‘ri strukturaga o‘tkazdim
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    // 🔥 TO‘G‘RI — Backend aynan shu formatni kutmoqda
    const payload = {
      startMonth_uz: form.startMonth_uz?.trim() || "",
      startMonth_oz: form.startMonth_oz?.trim() || "",
      startMonth_ru: form.startMonth_ru?.trim() || "",

      endMonth_uz: form.endMonth_uz?.trim() || "",
      endMonth_oz: form.endMonth_oz?.trim() || "",
      endMonth_ru: form.endMonth_ru?.trim() || "",

      title_uz: form.title_uz?.trim() || "",
      title_oz: form.title_oz?.trim() || "",
      title_ru: form.title_ru?.trim() || "",

      description_uz: form.description_uz?.trim() || "",
      description_oz: form.description_oz?.trim() || "",
      description_ru: form.description_ru?.trim() || "",

      participantsCount: Number(form.participantsCount) || 0,

      plan_uz: form.plan_uz || "Режалаштирилган",
      plan_oz: form.plan_oz || "Rejalashtirilgan",
      plan_ru: form.plan_ru || "Запланировано",
    };


    console.log(payload, "payload");


    try {
      const response = await fetch(`https://uzneftegaz-backend-production.up.railway.app/api/hisobot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      alert("Hisobot qo‘shildi!");
      GetPlans();
      setOpenAddModal(false);
      resetForm();
    } catch (error) {
      alert("Xatolik: " + error.message);
    }
  };

  // 🔥 EDIT CLICK
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
      participantsCount: plan.participantsCount || 0,
      plan_uz: plan.plan?.uz || "Режалаштирилган",
      plan_ru: plan.plan?.ru || "Запланировано",
      plan_oz: plan.plan?.oz || "Rejalashtirilgan",
    });

    setEditingId(plan._id);
    setOpenEditModal(true);
  };

  // 🔥 PUT — TO‘G‘RI QILINDI
  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");

    // handleSubmit va handleEditSubmit ichida
    const payload = {
      startMonth_uz: form.startMonth_uz?.trim(),
      startMonth_oz: form.startMonth_oz?.trim(),
      startMonth_ru: form.startMonth_ru?.trim(),
      endMonth_uz: form.endMonth_uz?.trim(),
      endMonth_oz: form.endMonth_oz?.trim(),
      endMonth_ru: form.endMonth_ru?.trim(),
      title_uz: form.title_uz?.trim(),
      title_oz: form.title_oz?.trim(),
      title_ru: form.title_ru?.trim(),
      description_uz: form.description_uz?.trim(),
      description_oz: form.description_oz?.trim(),
      description_ru: form.description_ru?.trim(),
      participantsCount: Number(form.participantsCount) || 0,
      plan_uz: form.plan_uz || "Режалаштирилган",
      plan_oz: form.plan_oz || "Rejalashtirilgan",
      plan_ru: form.plan_ru || "Запланировано",
    };

    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Tahrirlandi!");
      GetPlans();
      setOpenEditModal(false);
      resetForm();
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  };

  const deletePlan = async (id) => {
    if (!confirm("O'chirmoqchimisiz?")) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Agar server 204 qaytarsa, response.ok = true, lekin json yo'q
      if (response.ok || response.status === 204) {
        alert("Muvaffaqiyatli o'chirildi!");
        await GetPlans(); // await qo'shing, to'liq yuklanishini kutamiz
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "O'chirishda xatolik");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("O'chirishda xatolik: " + (err.message || "Server bilan aloqa yo'q"));
    }
  };

  useEffect(() => {
    GetPlans();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow-sm p-6 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Hisobot</h1>

          <button
            className="btn btn-info text-white gap-2"
            onClick={() => {
              resetForm();
              setOpenAddModal(true);
            }}
          >
            <Plus size={18} /> Yangi qo‘shish
          </button>
        </div>

        {/* LIST */}
        <div className="bg-base-100 rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-base-200">
              <tr>
                <th className="p-4">Oy bosh</th>
                <th className="p-4">Oy tugash</th>
                <th className="p-4">Reja</th>
                <th className="p-4">Izoh</th>
                <th className="p-4 text-center">Ishtirokchilar</th>
                <th className="p-4 text-center">Holati</th>
                <th className="p-4 text-center">Amallar</th>
              </tr>
            </thead>

            <tbody>
              {data.map((plan) => (
                <tr key={plan._id} className="hover:bg-base-200">
                  <td className="p-4">{plan.startMonth?.uz}</td>
                  <td className="p-4">{plan.endMonth?.uz}</td>
                  <td className="p-4">{plan.title?.uz}</td>
                  <td className="p-4">{plan.description?.uz}</td>
                  <td className="p-4 text-center">{plan.participantsCount}</td>

                  {/* 🔥 TO‘G‘RI QILINDI */}
                  <td className="p-4 text-center">{plan.plan?.uz}</td>

                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => handleEditClick(plan)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                    >
                      <Edit2 size={18} />
                    </button>

                    <button
                      onClick={() => deletePlan(plan._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
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

      {/* MODALS */}
      <AddReportsModal
        open={openAddModal}
        onClose={() => { setOpenAddModal(false); resetForm(); }}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
      />

      <EditRepotsModal
        open={openEditModal}
        onClose={() => { setOpenEditModal(false); resetForm(); }}
        onSubmit={handleEditSubmit}
        form={form}
        setForm={setForm}
      />
    </div>
  );
};

export default Reports;
