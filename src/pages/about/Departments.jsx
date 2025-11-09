import React, { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import AddDepartamentModal from '../../components/addDepartamentModal';
import EditDepartamentModal from '../../components/EditDepartamentModal';

const Departments = () => {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [form, setForm] = useState({
    titleUz: "",
    titleRu: "",
    titleOz: "",
    employeesUz: "",
    employeesRu: "",
    employeesOz: "",
    leaderUz: "",
    leaderRu: "",
    leaderOz: "",
    descriptionUz: "",
    descriptionRu: "",
    descriptionOz: "",
    image: null,
  });

  console.log(form);

  const getDepartments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://uzbekneftegaz-backend-production.up.railway.app/api/bolimlar"
      );
      const data = await response.json();
      setDepartments(data.bolimlar || []);
    } catch (err) {
      console.error("Error fetching departments:", err);
    } finally {
      setLoading(false);
    }
  };



  const handleUpdate = async () => {
    if (!selectedDept) return;

    const fd = new FormData();

    fd.append("title_uz", form.titleUz);
    fd.append("title_ru", form.titleRu);
    fd.append("title_oz", form.titleOz);

    fd.append("employees_uz", form.employeesUz);
    fd.append("employees_ru", form.employeesRu);
    fd.append("employees_oz", form.employeesOz);

    fd.append("leader_uz", form.leaderUz);
    fd.append("leader_ru", form.leaderRu);
    fd.append("leader_oz", form.leaderOz);

    fd.append("desc_uz", form.descriptionUz);
    fd.append("desc_ru", form.descriptionRu);
    fd.append("desc_oz", form.descriptionOz);

    if (form.image) fd.append("image", form.image);

    try {
      await fetch(
        `https://uzbekneftegaz-backend-production.up.railway.app/api/bolimlar/update/${selectedDept._id}`,
        {
          method: "PUT",
          body: fd,
        }
      );

      setOpenEditModal(false);
      getDepartments();
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);




  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://uzbekneftegaz-backend-production.up.railway.app/api/bolimlar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title_uz: form.titleUz,
          title_ru: form.titleRu,
          title_oz: form.titleOz,
          employees_uz: form.employeesUz,
          employees_ru: form.employeesRu,
          employees_oz: form.employeesOz,
          leader_uz: form.leaderUz,
          leader_ru: form.leaderRu,
          leader_oz: form.leaderOz,
          desc_uz: form.descriptionUz,
          desc_ru: form.descriptionRu,
          desc_oz: form.descriptionOz,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Server Error:", errData);
        return;
      }

      setOpenAddModal(false);
      getDepartments();
    } catch (err) {
      console.error("Create Error:", err);
    }
  };
  const handleSubmitEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`https://uzbekneftegaz-backend-production.up.railway.app/api/bolimlar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title_uz: form.titleUz,
          title_ru: form.titleRu,
          title_oz: form.titleOz,
          employees_uz: form.employeesUz,
          employees_ru: form.employeesRu,
          employees_oz: form.employeesOz,
          leader_uz: form.leaderUz,
          leader_ru: form.leaderRu,
          leader_oz: form.leaderOz,
          desc_uz: form.descriptionUz,
          desc_ru: form.descriptionRu,
          desc_oz: form.descriptionOz,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Server Error:", errData);
        return;
      }

      setOpenEditModal(false);
      getDepartments(); // yangilangan ro‘yxatni qayta yuklaydi
    } catch (err) {
      console.error("Update Error:", err);
    } finally {
      setEditOpen(false)
    }
  };
  const deleteDepartment = async (id) => {
    const isConfirm = window.confirm("Rostan ham bu bo‘limni o‘chirmoqchimisiz?");
    if (!isConfirm) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://uzbekneftegaz-backend-production.up.railway.app/api/bolimlar/${id}`,
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

      // 🔹 O‘chirish muvaffaqiyatli bo‘lsa:
      getDepartments(); // jadvalni qayta yuklash
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };


  const handleEditClick = (v) => {
    setSelectedDept(v);
    setForm({
      titleUz: v.title?.uz || "",
      titleRu: v.title?.ru || "",
      titleOz: v.title?.oz || "",

      employeesUz: v.employees?.uz || "",
      employeesRu: v.employees?.ru || "",
      employeesOz: v.employees?.oz || "",

      leaderUz: v.leader?.uz || "",
      leaderRu: v.leader?.ru || "",
      leaderOz: v.leader?.oz || "",

      descriptionUz: v.description?.uz || "",
      descriptionRu: v.description?.ru || "",
      descriptionOz: v.description?.oz || "",

      image: null,
    });
    setEditOpen(true);
  };

  useEffect(() => {
    getDepartments()
  }, [])




  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                Tarkibiy bolimlar
              </h1>



            </div>
            <button
              onClick={() => setOpenAddModal(true)}
              className="btn btn-info text-base-100 gap-2"
            >
              <Plus size={18} /> Yangi qo‘shish
            </button>

          </div>
        </div>

        {/* Table */}
        <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
          {loading && departments.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-info"></div>
              <p className="text-gray-500 mt-4">Yuklanmoqda...</p>
            </div>
          ) : departments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Hozircha ma'lumot yo‘q</p>

            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-base-100">
                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      bolimNomi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      xodimlar soni
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      bolim boshligi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Tavsif
                    </th>

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {departments.map((v) => (
                    <tr
                      key={v._id}
                      className="hover:bg-base-200 transition-colors"
                    >

                      <td className="px-6 py-4 font-semibold whitespace-nowrap">
                        {v.title?.uz}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{v.employees?.uz}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{v.leader?.uz}</td>
                      <td className="px-6 py-4 max-w-xs truncate">{v.description?.uz}</td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleEditClick(v)}
                          className="p-2 text-blue-500 hover:bg-info rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteDepartment(v._id)}
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
          )}

          <AddDepartamentModal open={openAddModal} onClose={() => setOpenAddModal(false)} onSubmit={handleSubmit} form={form} setForm={setForm} />
          <EditDepartamentModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            onSubmit={handleSubmitEdit}
            form={form}
            setForm={setForm}
            departmentId={selectedDept?._id}
          />


        </div>




      </div>
    </div>
  )
}

export default Departments