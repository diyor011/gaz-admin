import React, { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, File } from "lucide-react";
import AddDocumentModal from '../../components/AddDocumetModal';
import EditDocumentModal from '../../components/EditDocumentModal';

const Documents = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false) // Edit modal state
  const [editingId, setEditingId] = useState(null) // Tahrirlash ID
  const [form, setForm] = useState({
    titleUz: "",
    titleRu: "",
    titleOz: "",
    decreeUz: "",
    decreeRu: "",
    decreeOz: "",
    descriptionUz: "",
    descriptionRu: "",
    descriptionOz: "",
    file: null,
  });

  const GetDocuments = async () => {
    try {
      const response = await fetch('https://uzbekneftegaz-backend.onrender.com/api/normative/all')
      const request = await response.json()

      if (!response.ok) {
        throw new Error(response.status())
      }
      setData(request.data)
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
      titleUz: "",
      titleRu: "",
      titleOz: "",
      decreeUz: "",
      decreeRu: "",
      decreeOz: "",
      descriptionUz: "",
      descriptionRu: "",
      descriptionOz: "",
      file: null,
    });
    setEditingId(null);
  }

  const handleSubmit = () => {
    const fd = new FormData();

    fd.append("title_uz", form.titleUz);
    fd.append("title_ru", form.titleRu);
    fd.append("title_oz", form.titleOz);
    fd.append("decree_uz", form.decreeUz);
    fd.append("decree_ru", form.decreeRu);
    fd.append("decree_oz", form.decreeOz);
    fd.append("description_uz", form.descriptionUz);
    fd.append("description_ru", form.descriptionRu);
    fd.append("description_oz", form.descriptionOz);

    if (form.file) {
      fd.append("file", form.file);
    }

    createDocuments(fd);
  };

  const createDocuments = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://uzbekneftegaz-backend.onrender.com/api/normative/create",
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

      await GetDocuments();
      setOpenAddModal(false);
      resetForm();
    } catch (err) {
      console.error("Error creating leader:", err);
    }
  };

  // Edit modal ochish
  const handleEditClick = (document) => {
    setForm({
      titleUz: document.title?.uz || "",
      titleRu: document.title?.ru || "",
      titleOz: document.title?.oz || "",
      decreeUz: document.decree?.uz || "",
      decreeRu: document.decree?.ru || "",
      decreeOz: document.decree?.oz || "",
      descriptionUz: document.description?.uz || "",
      descriptionRu: document.description?.ru || "",
      descriptionOz: document.description?.oz || "",
      file: document.file || null,
    });
    setEditingId(document._id);
    setOpenEditModal(true);
  };

  const handleEditSubmit = () => {
    const fd = new FormData();

    fd.append("title_uz", form.titleUz);
    fd.append("title_ru", form.titleRu);
    fd.append("title_oz", form.titleOz);
    fd.append("decree_uz", form.decreeUz);
    fd.append("decree_ru", form.decreeRu);
    fd.append("decree_oz", form.decreeOz);
    fd.append("description_uz", form.descriptionUz);
    fd.append("description_ru", form.descriptionRu);
    fd.append("description_oz", form.descriptionOz);

    if (form.file) {
      fd.append("file", form.file);
    }


    updateDocuments(editingId, fd);
  };

  const updateDocuments = async (id, formData) => {
    try {
      const token = localStorage.getItem("token");


      let success = false;

      try {
        const response = await fetch(`https://uzbekneftegaz-backend.onrender.com/api/normative/update/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          success = true;
          console.log(`✅ Ishladi: `);
        }
      } catch (e) {
        console.error(e)
      }


      if (!success) {
        throw new Error("Hech qanday endpoint ishlamadi. Backend'ni tekshiring!");
      }

      await GetDocuments();
      setOpenEditModal(false);
      resetForm();
      alert("Hujat muvaffaqiyatli tahrirlandi!");
    } catch (err) {
      console.error("Error updating leader:", err);
      alert(`Xatolik: ${err.message}\n\nBackend API dokumentatsiyasini tekshiring yoki backend dasturchiga murojaat qiling.`);
    }
  };

  // Delete
  const deleteDocuments = async (id) => {
    const isConfirm = window.confirm("Rostan ham bu Hujat o'chirmoqchimisiz?");
    if (!isConfirm) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://uzbekneftegaz-backend.onrender.com/api/normative/delete/${id}`,
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

      GetDocuments();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };


  const handleDownload = async (file) => {
    try {
      const response = await fetch(`https://uzbekneftegaz-backend.onrender.com/uploads/files/${file}`);
      if (!response.ok) throw new Error("Файл недоступен");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log("Download failed:", err);
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
                Meyoriy Hujatlar
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
                  Pdf
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Qaror
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Qaror Raqami
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Batafsil
                </th>

              </tr>
            </thead>
            <tbody className="divide-y divide-info">
              {data.map((document) => (
                <tr
                  key={document._id}
                  className="hover:bg-base-200 transition-colors"
                >
                  <td className="px-4 py-2">
                    <button onClick={() => handleDownload(document.file)}>

                      <File />
                    </button>
                  </td>
                  <td className="px-2 py-2 font-semibold whitespace-nowrap text-sm">
                    {document.title?.uz}
                  </td>
                  <td className="whitespace-nowrap">{document.decree?.uz}</td>

                  <td className="px-4 py-4 max-w-xs truncate">
                    {document.description?.uz}
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(document)}
                      className="p-2 text-blue-500 hover:bg-info rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteDocuments(document._id)}
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
      <AddDocumentModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          resetForm();
        }}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
      />

      <EditDocumentModal
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

export default Documents