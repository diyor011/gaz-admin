import React, { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, File } from "lucide-react";
import AddDocumentModal from '../components/AddDocumetModal';
import EditDocumentModal from '../components/EditDocumentModal';
import { toast, ToastContainer } from 'react-toastify';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AddBooksModal from '../components/AddBookModal';
import EditBooksModal from '../components/EditBookModal';

const Book = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState({
        titleUz: "",
        titleRu: "",
        titleOz: "",
        avtorUz: "",
        avtorRu: "",
        avtorOz: "",
        descriptionUz: "",
        descriptionRu: "",
        descriptionOz: "",
        pages: "",
        year: "",
        mediaImages: [],
        mediaDocs: null, // null yoki bitta file
    });

    const GetDocuments = async () => {
        setLoading(true)
        try {
            const response = await fetch('https://uzneftegaz-backend-production.up.railway.app/api/books')
            const request = await response.json()

            if (!response.ok) {
                toast.error(response.status)
                throw new Error(response.status())
            }
            setData(request.book)
            setLoading(true)
        }
        catch (err) {
            toast.error(err)
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
            avtorUz: "",
            avtorRu: "",
            avtorOz: "",
            descriptionUz: "",
            descriptionRu: "",
            descriptionOz: "",
            pages: "",
            year: "",
            mediaImages: [],
            mediaDocs: null,
        });
        setEditingId(null);
    }

    const handleSubmit = () => {
        const fd = new FormData();

        fd.append("title_uz", form.titleUz);
        fd.append("title_ru", form.titleRu);
        fd.append("title_oz", form.titleOz);

        fd.append("avtor_uz", form.avtorUz);
        fd.append("avtor_ru", form.avtorRu);
        fd.append("avtor_oz", form.avtorOz);

        fd.append("description_uz", form.descriptionUz);
        fd.append("description_ru", form.descriptionRu);
        fd.append("description_oz", form.descriptionOz);

        fd.append("pages", form.pages);
        fd.append("year", form.year);

        form.mediaImages.forEach((file) => {
            fd.append("mediaType", file);
        });

        // Faqat bitta PDF fayl
        if (form.mediaDocs) {
            fd.append("mediaDocs", form.mediaDocs);
        }

        createDocuments(fd);
    };

    const createDocuments = async (formData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                "https://uzneftegaz-backend-production.up.railway.app/api/books/create",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                toast.error("Xatolik: " + response.status);
                throw new Error();
            }

            toast.success("Kitob muvaffaqiyatli yaratildi!");
            await GetDocuments();
            setOpenAddModal(false);
            resetForm();

        } catch (error) {
            toast.error("Yaratishda xatolik yuz berdi");
        }
    };

    // Edit modal ochish
    const handleEditClick = (book) => {
        console.log("Book data:", book);

        setForm({
            titleUz: book.title?.uz || "",
            titleRu: book.title?.ru || "",
            titleOz: book.title?.oz || "",

            avtorUz: book.avtor?.uz || "",
            avtorRu: book.avtor?.ru || "",
            avtorOz: book.avtor?.oz || "",

            descriptionUz: book.description?.uz || "",
            descriptionRu: book.description?.ru || "",
            descriptionOz: book.description?.oz || "",

            pages: book.pages || "",
            year: book.year || "",

            // mediaType endi object
            mediaImages: book.mediaType ? [book.mediaType.url] : [],

            // mediaDocs endi object yoki null
            mediaDocs: book.mediaDocs ? book.mediaDocs.url : null,
        });

        setEditingId(book._id);
        setOpenEditModal(true);
    };

    // File tekshirish funksiyasi
    const isFile = (item) => {
        return item && typeof item === 'object' && item.constructor && item.constructor.name === 'File';
    };

    const handleEditSubmit = () => {
        const fd = new FormData();

        fd.append("title_uz", form.titleUz);
        fd.append("title_ru", form.titleRu);
        fd.append("title_oz", form.titleOz);

        fd.append("avtor_uz", form.avtorUz);
        fd.append("avtor_ru", form.avtorRu);
        fd.append("avtor_oz", form.avtorOz);

        fd.append("description_uz", form.descriptionUz);
        fd.append("description_ru", form.descriptionRu);
        fd.append("description_oz", form.descriptionOz);

        fd.append("pages", Number(form.pages));
        fd.append("year", Number(form.year));

        // Faqat yangi yuklangan FILE larni yuboramiz
        form.mediaImages.forEach((item) => {
            if (isFile(item)) {
                fd.append("mediaType", item);
            }
        });

        // Faqat yangi yuklangan PDF (File)
        if (form.mediaDocs && isFile(form.mediaDocs)) {
            fd.append("mediaDocs", form.mediaDocs);
        }

        updateDocuments(editingId, fd);
    };

    const updateDocuments = async (id, formData) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `https://uzneftegaz-backend-production.up.railway.app/api/books/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                toast.error("Xatolik: " + response.status);
                throw new Error();
            }

            toast.success("Kitob muvaffaqiyatli tahrirlandi!");

            await GetDocuments();
            setOpenEditModal(false);
            resetForm();
        } catch (err) {
            toast.error("Error updating book");
        }
    };

    // Delete
    const deleteDocuments = async (id) => {
        const isConfirm = window.confirm("Rostan ham bu Hujat o'chirmoqchimisiz?");
        if (!isConfirm) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `https://uzneftegaz-backend-production.up.railway.app/api/books/${id}`,
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
                toast.success("Hujat muvaffaqiyatli ochirildi")
            }

            GetDocuments();
        } catch (err) {
            toast.error("Delete Error:", err);
        }
    };

    const handleDownload = async (fileUrl) => {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                toast.error("Fayl topilmadi: " + response.status)
                throw new Error("Fayl topilmadi");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Fayl nomini URL dan olish
            const fileName = fileUrl.split('/').pop();

            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            a.click();

            window.URL.revokeObjectURL(url);
            toast.success("Fayl yuklab olindi!");
        } catch (err) {
            toast.error("Yuklab olishda xatolik: " + err.message);
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
                                Kitoblar
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
                    {loading && data.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-info"></div>
                            <p className="text-gray-500 mt-4">Yuklanmoqda...</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-base-100">
                                <tr>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Rasim
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Pdf
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Nomi
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Mualif
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Saxifalar soni
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Kitob yozilgan yili
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
                                        <td className="py-2 px-4">
                                            {document.mediaType ? (
                                                <img
                                                    src={document.mediaType.url}
                                                    alt="media"
                                                    className="w-20 h-20 object-cover rounded-2xl shadow-xl"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center shadow-xl">
                                                    <p className="text-gray-400 text-xs">Rasm yo'q</p>
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-4 py-2">
                                            {document.mediaDocs ? (
                                                <button onClick={() => handleDownload(document.mediaDocs.url)}>
                                                    <File />
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 text-xs">PDF yo'q</span>
                                            )}
                                        </td>
                                        <td className="px-2 py-2 font-semibold whitespace-nowrap text-sm">
                                            {document.title?.uz}
                                        </td>
                                        <td className="px-2 py-2 font-semibold whitespace-nowrap text-sm">
                                            {document.avtor?.uz}
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-2">{document.pages}</td>
                                        <td className="whitespace-nowrap px-12 py-2">{document.year}</td>
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
                    )}
                </div>
            </div>

            {/* Modals */}
            <AddBooksModal
                open={openAddModal}
                onClose={() => {
                    setOpenAddModal(false);
                    resetForm();
                }}
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit}
            />

            <EditBooksModal
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

export default Book