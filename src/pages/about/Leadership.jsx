import React, { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2 } from "lucide-react";
import AddLeaderModal from '../../components/addModalLeader';
import EditLeaderModal from '../../components/EditLeadershipModal'; // Yangi import

const Leadership = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false) // Edit modal state
  const [editingId, setEditingId] = useState(null) // Tahrirlash ID
  const [form, setForm] = useState({
    fullNameUz: "",
    fullNameRu: "",
    fullNameOz: "",
    gradeUz: "",
    gradeRu: "",
    gradeOz: "",
    phone: "",
    email: "",
    workDaysUz: "",
    workDaysOz: "",
    workDaysRu: "",
    workHoursStart: "",
    workHoursEnd: "",
    descriptionUz: "",
    descriptionRu: "",
    descriptionOz: "",
    avatar: null,
  });

  const GetLeadership = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://uzbekneftegaz-backend.onrender.com/api/leader')
      const request = await response.json()

      if (!response.ok) {
        throw new Error(response.status())
      }
      setData(request.leaders)
      setLoading(true)
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  // Form reset
  const resetForm = () => {
    setForm({
      fullNameUz: "",
      fullNameRu: "",
      fullNameOz: "",
      gradeUz: "",
      gradeRu: "",
      gradeOz: "",
      phone: "",
      email: "",
      workDaysUz: "",
      workDaysOz: "",
      workDaysRu: "",
      workHoursStart: "",
      workHoursEnd: "",
      descriptionUz: "",
      descriptionRu: "",
      descriptionOz: "",
      avatar: null,
    });
    setEditingId(null);
  }

  // Create yangi rahbar
  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("fullName_uz", form.fullNameUz);
    fd.append("fullName_ru", form.fullNameRu);
    fd.append("fullName_oz", form.fullNameOz);
    fd.append("grade_uz", form.gradeUz);
    fd.append("grade_ru", form.gradeRu);
    fd.append("grade_oz", form.gradeOz);
    fd.append("phone", form.phone)
    fd.append("email", form.email)
    fd.append("workDays_uz", form.workDaysUz)
    fd.append("workDays_oz", form.workDaysOz)
    fd.append("workDays_ru", form.workDaysRu)
    fd.append("workHours_start", form.workHoursStart)
    fd.append("workHours_end", form.workHoursEnd)
    fd.append("description_uz", form.descriptionUz);
    fd.append("description_ru", form.descriptionRu);
    fd.append("description_oz", form.descriptionOz);

    if (form.avatar) {
      fd.append("avatar", form.avatar);
    }

    createLeadership(fd);
  };

  const createLeadership = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://uzbekneftegaz-backend.onrender.com/api/leader/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      await GetLeadership();
      setOpenAddModal(false);
      resetForm();
    } catch (err) {
      console.error("Error creating leader:", err);
    }
  };

  // Edit modal ochish
  const handleEditClick = (leader) => {
    setForm({
      fullNameUz: leader.fullName?.uz || "",
      fullNameRu: leader.fullName?.ru || "",
      fullNameOz: leader.fullName?.oz || "",
      gradeUz: leader.grade?.uz || "",
      gradeRu: leader.grade?.ru || "",
      gradeOz: leader.grade?.oz || "",
      phone: leader.phone || "",
      email: leader.email || "",
      workDaysUz: leader.workDays?.uz || "",
      workDaysOz: leader.workDays?.oz || "",
      workDaysRu: leader.workDays?.ru || "",
      workHoursStart: leader.workHours?.start || "",
      workHoursEnd: leader.workHours?.end || "",
      descriptionUz: leader.description?.uz || "",
      descriptionRu: leader.description?.ru || "",
      descriptionOz: leader.description?.oz || "",
      avatar: leader.avatar || null,
    });
    setEditingId(leader._id);
    setOpenEditModal(true);
  };

  // Update rahbar
  const handleEditSubmit = () => {
    const fd = new FormData();
    fd.append("fullName_uz", form.fullNameUz);
    fd.append("fullName_ru", form.fullNameRu);
    fd.append("fullName_oz", form.fullNameOz);
    fd.append("grade_uz", form.gradeUz);
    fd.append("grade_ru", form.gradeRu);
    fd.append("grade_oz", form.gradeOz);
    fd.append("phone", form.phone)
    fd.append("email", form.email)
    fd.append("workDays_uz", form.workDaysUz)
    fd.append("workDays_oz", form.workDaysOz)
    fd.append("workDays_ru", form.workDaysRu)
    fd.append("workHours_start", form.workHoursStart)
    fd.append("workHours_end", form.workHoursEnd)
    fd.append("description_uz", form.descriptionUz);
    fd.append("description_ru", form.descriptionRu);
    fd.append("description_oz", form.descriptionOz);

    // Faqat yangi rasm tanlangan bo'lsa qo'shamiz
    if (form.avatar && typeof form.avatar !== 'string') {
      fd.append("avatar", form.avatar);
    }

    updateLeadership(editingId, fd);
  };

  const updateLeadership = async (id, formData) => {
    try {
      const token = localStorage.getItem("token");

      // Turli endpoint variantlarini sinab ko'ramiz
      const endpoints = [
        { url: `https://uzbekneftegaz-backend.onrender.com/api/leader/${id}`, method: "PUT" },
        { url: `https://uzbekneftegaz-backend.onrender.com/api/leader/${id}`, method: "PATCH" },
        { url: `https://uzbekneftegaz-backend.onrender.com/api/leader/update/${id}`, method: "PUT" },
        { url: `https://uzbekneftegaz-backend.onrender.com/api/leader/edit/${id}`, method: "PUT" },
      ];

      let success = false;

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint.url, {
            method: endpoint.method,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          if (response.ok) {
            success = true;
            console.log(`✅ Ishladi: ${endpoint.method} ${endpoint.url}`);
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!success) {
        throw new Error("Hech qanday endpoint ishlamadi. Backend'ni tekshiring!");
      }

      await GetLeadership();
      setOpenEditModal(false);
      resetForm();
      alert("Rahbar muvaffaqiyatli tahrirlandi!");
    } catch (err) {
      console.error("Error updating leader:", err);
      alert(`Xatolik: ${err.message}\n\nBackend API dokumentatsiyasini tekshiring yoki backend dasturchiga murojaat qiling.`);
    }
  };

  // Delete
  const deleteLeadership = async (id) => {
    const isConfirm = window.confirm("Rostan ham bu rahbarni o'chirmoqchimisiz?");
    if (!isConfirm) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://uzbekneftegaz-backend.onrender.com/api/leader/${id}`,
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

      GetLeadership();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  useEffect(() => {
    GetLeadership()
  }, [])

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                Rahbarlar
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

        <div className="bg-base-100 rounded-xl shadow-sm shadow-info overflow-hidden ">
          {loading && data.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-info"></div>
              <p className="text-gray-500 mt-4">Yuklanmoqda...</p>
            </div>
          ) : (<table className="min-w-full  ">
            <thead className="bg-base-100">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Rasim
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Ism Familya
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Lavozimi
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Email
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Raqami
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Ish tartibi
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Tajriba
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-info ">
              {data.map((leader) => (
                <tr
                  key={leader._id}
                  className="hover:bg-base-200 transition-colors "
                >
                  <td className="px-4 py-2">
                    <img
                      src={`https://uzbekneftegaz-backend.onrender.com/uploads/leaders/${leader.avatar}`}
                      alt={leader.fullName?.uz}
                      className="w-20 h-20 rounded-lg object-cover shadow"
                    />
                  </td>
                  <td className="px-2 py-2 font-semibold break-word  whitespace-nowrap text-xs">
                    {leader.fullName?.uz}
                  </td>
                  <td className="whitespace-nowrap text-xs break-word text-center">{leader.grade?.uz}</td>
                  <td className="px-3 py-4 whitespace-nowrap  break-word text-xs">
                    {leader.email || "Email kiritilmagan"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap break-word text-xs">
                    {leader.phone || "Raqam kiritilmagan"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap break-word text-xs flex flex-col">
                    <span>{leader.workDays?.uz} </span>
                    <span>{leader.workHours?.start}-{leader.workHours?.end}</span>
                  </td>
                  <td className="px-3 py-4 max-w-xs  break-words text-xs text-center ">
                    {leader.description?.uz}
                  </td>
                  <td className="px-3 py-4 text-right whitespace-nowrap text-xs">
                    <button
                      onClick={() => handleEditClick(leader)}
                      className="p-1 text-blue-500 hover:bg-info rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteLeadership(leader._id)}
                      className="p-1 text-red-600 hover:bg-error rounded-lg ml-2 transition-colors"
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
      <AddLeaderModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          resetForm();
        }}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
      />

      <EditLeaderModal
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

export default Leadership