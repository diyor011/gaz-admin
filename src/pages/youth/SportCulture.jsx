import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import AddSportModal from "../../components/AddSportModal";
import EditSportModal from "../../components/EditSportModal";
import { toast, ToastContainer } from "react-toastify";

const Sport = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    athlete_uz: "",
    athlete_ru: "",
    athlete_oz: "",
    place_uz: "",
    place_ru: "",
    place_oz: "",
    title_uz: "",
    title_ru: "",
    title_oz: "",
    description_uz: "",
    description_ru: "",
    description_oz: "",
    category_uz: "Спорт",
    category_ru: "Спорт",
    category_oz: "Sport",
  });

  const API_URL =
    "https://uzneftegaz-backend-production.up.railway.app/api/sport";

  const GetPlans = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://uzneftegaz-backend-production.up.railway.app/api/sport/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Server error");
      setData(result.sports || []);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setForm({
      athlete_uz: "",
      athlete_ru: "",
      athlete_oz: "",
      place_uz: "",
      place_ru: "",
      place_oz: "",
      title_uz: "",
      title_ru: "",
      title_oz: "",
      description_uz: "",
      description_ru: "",
      description_oz: "",
      category_uz: "Спорт",
      category_ru: "Спорт",
      category_oz: "Sport",
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      athlete_uz: form.athlete_uz || "",
      athlete_ru: form.athlete_ru || "",
      athlete_oz: form.athlete_oz || "",
      place_uz: form.place_uz || "",
      place_ru: form.place_ru || "",
      place_oz: form.place_oz || "",
      title_uz: form.title_uz || "",
      title_ru: form.title_ru || "",
      title_oz: form.title_oz || "",
      description_uz: form.description_uz || "",
      description_ru: form.description_ru || "",
      description_oz: form.description_oz || "",
      category_uz: form.category_uz || "Спорт",
      category_ru: form.category_ru || "Спорт",
      category_oz: form.category_oz || "Sport",
    };

    console.log("Yuborilayotgan ma'lumot:", payload); // DEBUG

    try {
      const response = await fetch(
        `https://uzneftegaz-backend-production.up.railway.app/api/sport/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Server javobi:", data); // DEBUG

      if (!response.ok) {
        throw new Error(data.message || `Server xatosi: ${response.status}`);
      }

      toast.success("Tadbir muvaffaqiyatli qo'shildi!");
      await GetPlans();
      setOpenAddModal(false);
      resetForm();
    } catch (error) {
      console.error("POST xatosi:", error);
      toast.error("Xatolik: " + error.message);
    }
  };
  const handleEditClick = (plan) => {
    setForm({
      athlete_uz: plan.athlete?.uz || "",
      athlete_ru: plan.athlete?.ru || "",
      athlete_oz: plan.athlete?.oz || "",

      place_uz: plan.place?.uz || "",
      place_ru: plan.place?.ru || "",
      place_oz: plan.place?.oz || "",

      title_uz: plan.title?.uz || "",
      title_ru: plan.title?.ru || "",
      title_oz: plan.title?.oz || "",

      description_uz: plan.description?.uz || "",
      description_ru: plan.description?.ru || "",
      description_oz: plan.description?.oz || "",

      category_uz: plan.category?.uz || "Спорт",
      category_ru: plan.category?.ru || "Спорт",
      category_oz: plan.category?.oz || "Sport",
    });

    setEditingId(plan._id);
    setOpenEditModal(true);
  };
  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      athlete_uz: form.athlete_uz || "",
      athlete_ru: form.athlete_ru || "",
      athlete_oz: form.athlete_oz || "",
      place_uz: form.place_uz || "",
      place_ru: form.place_ru || "",
      place_oz: form.place_oz || "",
      title_uz: form.title_uz || "",
      title_ru: form.title_ru || "",
      title_oz: form.title_oz || "",
      description_uz: form.description_uz || "",
      description_ru: form.description_ru || "",
      description_oz: form.description_oz || "",
      category_uz: form.category_uz || "Спорт",
      category_ru: form.category_ru || "Спорт",
      category_oz: form.category_oz || "Sport",
    };
    // ✅ JSON stringni ko'ramiz
    const jsonString = JSON.stringify(payload);
    console.log("JSON STRING:", jsonString);
    console.log("JSON parsed back:", JSON.parse(jsonString));

    try {
      const response = await fetch(
        `https://uzneftegaz-backend-production.up.railway.app/api/sport/update/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: jsonString, // Aynan shu string ketadi
        }
      );

      const data = await response.json();
      console.log("PUT javobi:", data);

      if (!response.ok) {
        throw new Error(data.message || `Server xatosi: ${response.status}`);
      }

      toast.success("Tadbir muvaffaqiyatli tahrirlandi!");
      await GetPlans();
      setOpenEditModal(false);
      resetForm();
    } catch (error) {
      console.error("PUT xatosi:", error);
      toast.error("Xatolik: " + error.message);
    }
  };
  const deletePlan = async (id) => {
    if (!window.confirm("Rostan o'chirmoqchimisiz?")) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("O'chirishda xatolik");
      await GetPlans();
    } catch (err) {
      toast.error("O'chirishda xatolik");
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
            <h1 className="text-3xl font-bold text-base-content">
              Sport va madaniyat
            </h1>
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
                  <th className="p-4 text-left text-xs font-semibold text-base-content uppercase">
                    Nomi
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-base-content uppercase">
                    batafsil
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-base-content uppercase">
                    Ishtirokchilar soni
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-base-content uppercase">
                    Joyi
                  </th>

                  <th className="p-4 text-center text-xs font-semibold text-base-content uppercase">
                    Turi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {data.map((plan) => (
                  <tr
                    key={plan._id}
                    className="hover:bg-base-200 transition-colors"
                  >
                    <td className="p-4">{plan.title?.uz}</td>
                    <td className="p-4">{plan.description?.uz}</td>
                    <td className="p-4">{plan.athlete?.uz}</td>
                    <td className="p-4">{plan.place?.uz}</td>

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

      <AddSportModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
      />
      <EditSportModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          resetForm();
        }}
        onSubmit={handleEditSubmit} // PUT so‘rovni yuboradi
        form={form}
        setForm={setForm}
      />
          <ToastContainer />
    </div>
  );
};

export default Sport;
