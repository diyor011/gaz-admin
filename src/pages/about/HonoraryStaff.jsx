import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import AddVeteranModal from "../../components/AddModalStaff";
import EditVeteranModal from "../../components/EditModalStaff";


export default function AdminVeteranManagement() {
  const [veterans, setVeterans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const [form, setForm] = useState({
    fullNameUz: "",
    fullNameRu: "",
    fullNameOz: "",
    specialistUz: "",
    specialistRu: "",
    specialistOz: "",
    experienceUz: "",
    experienceRu: "",
    experienceOz: "",
    projectUz: "",
    projectRu: "",
    projectOz: "",
    gradeUz: "",
    gradeRu: "",
    gradeOz: "",
    descriptionUz: "",
    descriptionRu: "",
    descriptionOz: "",
    image: null,
  });

  const handleSubmit = () => {
    const fd = new FormData();

    fd.append("fullName_uz", form.fullNameUz);
    fd.append("fullName_ru", form.fullNameRu);
    fd.append("fullName_oz", form.fullNameOz);

    fd.append("specialist_uz", form.specialistUz);
    fd.append("specialist_ru", form.specialistRu);
    fd.append("specialist_oz", form.specialistOz);

    fd.append("experience_uz", form.experienceUz);
    fd.append("experience_ru", form.experienceRu);
    fd.append("experience_oz", form.experienceOz);

    fd.append("project_uz", form.projectUz);
    fd.append("project_ru", form.projectRu);
    fd.append("project_oz", form.projectOz);

    fd.append("grade_uz", form.gradeUz);
    fd.append("grade_ru", form.gradeRu);
    fd.append("grade_oz", form.gradeOz);

    fd.append("description_uz", form.descriptionUz);
    fd.append("description_ru", form.descriptionRu);
    fd.append("description_oz", form.descriptionOz);

    if (form.image) {
      fd.append("image", form.image);
    }

    createVeteran(fd);
  };
  const [editOpen, setEditOpen] = useState(false);
  const [selectedVeteran, setSelectedVeteran] = useState(null);

  const handleEditClick = (v) => {
    setSelectedVeteran(v);
    setEditOpen(true);
  };

  const handleUpdate = (updated) => {
    setVeterans(prev =>
      prev.map(item => (item._id === updated._id ? updated : item))
    );
  };



  // 🔹 Fetch veterans
  const getVeterans = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://uzbekneftegaz-backend-production.up.railway.app/api/honorary/"
      );
      const data = await response.json();
      setVeterans(data.data || []);
    } catch (err) {
      console.error("Error fetching veterans:", err);
    } finally {
      setLoading(false);
    }
  };
  const createVeteran = async (formData) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Yoki redux’dan oling

      const response = await fetch(
        "https://uzbekneftegaz-backend-production.up.railway.app/api/honorary/create",
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

      await getVeterans();
      setOpenAddModal(false); // modal yopiladi

    } catch (err) {
      console.error("Error creating veteran:", err);
    }
  };

  const deleteVeteran = async (id) => {
    try {
      const res = await fetch(`https://uzbekneftegaz-backend-production.up.railway.app/api/honorary/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      // Удаляем локально из стейта после успеха
      setVeterans((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting veteran:", error);
      alert("Удалить не удалось. Проверяем доступы и токен.");
    }
  };




  useEffect(() => {
    getVeterans();
  }, []);


  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                Faxriy Xodimlar
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
          {loading && veterans.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-info"></div>
              <p className="text-gray-500 mt-4">Yuklanmoqda...</p>
            </div>
          ) : veterans.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Hozircha ma'lumot yo‘q</p>

            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-base-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Rasm
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Ism Familya
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Kasbi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Tajribasi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Tavsif
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Loyiha
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Daraja
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {veterans.map((v) => (
                    <tr
                      key={v._id}
                      className="hover:bg-base-200 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={`https://uzbekneftegaz-backend-production.up.railway.app/uploads/honorary/${v.image}`}
                          alt={v.fullName?.uz}
                          className="w-20 h-20 rounded-lg object-cover shadow"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold whitespace-nowrap">
                        {v.fullName?.uz}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{v.specialist?.uz}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{v.experience?.uz}</td>
                      <td className="px-6 py-4 max-w-xs truncate">{v.description?.uz}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{v.project?.uz}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{v.grade?.uz}</td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleEditClick(v)}
                          className="p-2 text-info hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteVeteran(v._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg ml-2 transition-colors"
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
        <AddVeteranModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onSubmit={handleSubmit}
          form={form}
          setForm={setForm}
        />
        <EditVeteranModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          data={selectedVeteran}
          onUpdate={handleUpdate}
        />



      </div>
    </div>
  );
}
