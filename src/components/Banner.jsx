import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

export default function AdminBannerManagement() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        titleUz: '',
        titleRu: '',
        titleOz: '',
        descriptionUz: '',
        descriptionRu: '',
        descriptionOz: '',
        file: null,
        mediaType: 'image'
    });
    const [editingId, setEditingId] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    // Fetch banners from backend
    const getBanners = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://uzneftegaz-backend-production.up.railway.app/api/banner');
            const data = await response.json();
            setBanners(data.banners || []);
        } catch (err) {
            console.error('Error fetching banners:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBanners();
    }, []);

    const openCreateModal = () => {
        setFormData({
            titleUz: '',
            titleRu: '',
            titleOz: '',
            descriptionUz: '',
            descriptionRu: '',
            descriptionOz: '',
            file: null,
            mediaType: 'image'
        });
        setEditingId(null);
        setPreviewUrl('');
        document.getElementById('banner_modal').showModal();
    };

    const openEditModal = (banner) => {
        setFormData({
            titleUz: banner.title?.uz || '',
            titleRu: banner.title?.ru || '',
            titleOz: banner.title?.oz || '',
            descriptionUz: banner.description?.uz || '',
            descriptionRu: banner.description?.ru || '',
            descriptionOz: banner.description?.oz || '',
            file: null,
            mediaType: banner.mediaType || 'image'
        });
        setEditingId(banner._id);
        setPreviewUrl(banner.file ? `${banner.file}` : '');
        document.getElementById('banner_modal').showModal();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);

            // Auto-detect media type
            if (file.type.startsWith('video/')) {
                setFormData(prev => ({ ...prev, mediaType: 'video' }));
            } else {
                setFormData(prev => ({ ...prev, mediaType: 'image' }));
            }
        }
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) return toast.error("Avval tizimga kiring!");

        if (!formData.titleUz) {
            toast.error("Sarlavha (Uz) mavburiy maydon");
            return;
        }

        const data = new FormData();
        if (formData.file) data.append("file", formData.file);

        // 🔹 Backend kutayotgan nomlar bilan
        data.append("title_uz", formData.titleUz);
        data.append("title_ru", formData.titleRu);
        data.append("title_oz", formData.titleOz);

        data.append("desc_uz", formData.descriptionUz);
        data.append("desc_ru", formData.descriptionRu);
        data.append("desc_oz", formData.descriptionOz);

        try {
            setLoading(true);

            const url = editingId
                ? `https://uzneftegaz-backend-production.up.railway.app/api/banner/update/${editingId}`
                : "https://uzneftegaz-backend-production.up.railway.app/api/banner/upload";

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText);
            }

            await getBanners();
            document.getElementById("banner_modal").close();
            setEditingId(null);
            toast.success(editingId ? "Banner yangilandi ✅" : "Banner yaratildi ✅");
        } catch (err) {
            console.error("Server error:", err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };



    // 🔹 Banner o‘chirish
    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) return toast.error("Avval tizimga kiring!");

        if (!confirm("Rostdan ham ushbu banner o‘chiriladimi?")) return;

        try {
            const response = await fetch(
                `https://uzneftegaz-backend-production.up.railway.app/api/banner/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                await getBanners();
                toast.success("Banner muvaffaqiyatli o‘chirildi ✅");
            } else {
                toast.error("Banner o‘chirishda xatolik!");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Server bilan aloqa yo‘q!");
        }
    };


    return (
        <div className="min-h-screen  p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-base-100 rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-base-content">Banner Boshqaruvi</h1>
                            <p className="text-base-content mt-1">Barcha bannerlarni boshqaring va tahrirlang</p>
                        </div>
                        <button
                            onClick={openCreateModal}
                            className="flex items-center gap-2 bg-info hover:to-indigo-700 text-base-100 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            <Plus size={20} />
                            Yangi Banner
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-info rounded-xl shadow-lg p-6 text-base-100">
                        <p className="text-base-100 text-sm font-medium mb-1">Jami Bannerlar</p>
                        <p className="text-4xl font-bold">{banners.length}</p>
                    </div>
                    <div className="bg-orange-400 rounded-xl shadow-lg p-6 text-base-100">
                        <p className="text-base-100 text-sm font-medium mb-1">Rasm Bannerlari</p>
                        <p className="text-4xl font-bold text-base-100">
                            {banners.filter(b => b.mediaType === 'image').length}
                        </p>
                    </div>
                    <div className="bg-info rounded-xl shadow-lg p-6 text-base-100">
                        <p className="text-base-100 text-sm font-medium mb-1">Video Bannerlari</p>
                        <p className="text-4xl font-bold">
                            {banners.filter(b => b.mediaType === 'video').length}
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                    {loading && banners.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-info"></div>
                            <p className="text-gray-500 mt-4">Yuklanmoqda...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-base-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Media
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Sarlavha
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Tavsif
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Turi
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Amallar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {banners.map((banner) => (
                                        <tr key={banner._id} className=" shadow shadow-info hover:bg-base-200  transition-colors ">
                                            <td className="px-6 py-4">
                                                <div className="w-24 h-16 rounded-lg overflow-hidden shadow-md">
                                                    {banner.mediaType === 'image' ? (
                                                        <img
                                                            src={`${banner.file}`}
                                                            alt={banner.title?.['uz']}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <video
                                                            src={`${banner.file}`}
                                                            muted
                                                            loop
                                                            autoPlay
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <p className="font-semibold text-base-content">{banner.title?.uz}</p>
                                                    <p className="text-xs text-base-content">{banner.title?.ru}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-gray-600 text-sm max-w-xs truncate">
                                                    {banner.description?.uz}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${banner.mediaType === 'image'
                                                    ? 'bg-blue-100 text-info'
                                                    : 'bg-purple-100 text-purple-700'
                                                    }`}>
                                                    {banner.mediaType === 'image' ? 'Rasm' : 'Video'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(banner)}
                                                        className="p-2 text-info hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Tahrirlash"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(banner._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="O'chirish"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {!loading && banners.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-300 mb-4">📊</div>
                            <p className="text-gray-500 text-lg">Hozircha bannerlar yo'q</p>
                            <button
                                onClick={openCreateModal}
                                className="mt-4 text-info hover:text-accent font-semibold"
                            >
                                Birinchi bannerni yarating
                            </button>
                        </div>
                    )}
                </div>

                {/* Modal */}
                <dialog id="banner_modal" className="modal backdrop-blur-sm">
                    <div className="modal-box max-w-4xl bg-base-100 rounded-2xl shadow-2xl p-0 overflow-hidden max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="bg-info p-6 text-base-100 relative">
                            <button
                                className="absolute top-4 right-4 hover:bg-base-100/20 rounded-full p-1 transition-colors"
                                onClick={() => document.getElementById('banner_modal').close()}
                            >
                                <X size={24} />
                            </button>
                            <h3 className="font-bold text-2xl mb-2">
                                {editingId ? 'Bannerni Tahrirlash' : 'Yangi Banner Yaratish'}
                            </h3>
                            <p className="text-blue-50 text-sm">3 tilda ma'lumot kiriting</p>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Media Fayl (Rasm yoki Video) *
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-info transition-colors">
                                    <input
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-input"
                                    />
                                    <label
                                        htmlFor="file-input"
                                        className="flex flex-col items-center cursor-pointer"
                                    >
                                        {previewUrl ? (
                                            <div className="w-full">
                                                {formData.mediaType === 'image' ? (
                                                    <img
                                                        src={previewUrl}
                                                        alt="Preview"
                                                        className="w-full h-48 object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <video
                                                        src={previewUrl}
                                                        controls
                                                        className="w-full h-48 rounded-lg"
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="text-gray-400 mb-2" size={40} />
                                                <p className="text-sm font-medium text-gray-600">
                                                    Fayl tanlash uchun bosing
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Rasm yoki Video
                                                </p>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Titles in 3 languages */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Sarlavha (O'zbekcha) *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="O'zbek tilida"
                                        value={formData.titleUz}
                                        onChange={(e) => setFormData({ ...formData, titleUz: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-info focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Sarlavha (Русский)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="На русском"
                                        value={formData.titleRu}
                                        onChange={(e) => setFormData({ ...formData, titleRu: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-info focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Sarlavha (Ўзбекча)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ўзбек тилида"
                                        value={formData.titleOz}
                                        onChange={(e) => setFormData({ ...formData, titleOz: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-info focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Descriptions in 3 languages */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tavsif (O'zbekcha) *
                                    </label>
                                    <textarea
                                        placeholder="O'zbek tilida"
                                        value={formData.descriptionUz}
                                        onChange={(e) => setFormData({ ...formData, descriptionUz: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-info focus:outline-none transition-colors resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tavsif (Русский)
                                    </label>
                                    <textarea
                                        placeholder="На русском"
                                        value={formData.descriptionRu}
                                        onChange={(e) => setFormData({ ...formData, descriptionRu: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-info focus:outline-none transition-colors resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tavsif (Ўзбекча)
                                    </label>
                                    <textarea
                                        placeholder="Ўзбек тилида"
                                        value={formData.descriptionOz}
                                        onChange={(e) => setFormData({ ...formData, descriptionOz: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-info focus:outline-none transition-colors resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-gray-50 flex gap-3 border-t">
                            <button
                                onClick={() => document.getElementById('banner_modal').close()}
                                disabled={loading}
                                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-1 px-4 py-3 bg-info text-base-100 font-semibold rounded-lg hover:from-info hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                                {loading ? 'Saqlanmoqda...' : editingId ? 'Saqlash' : 'Yaratish'}
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
            <ToastContainer />
        </div>
    );
}