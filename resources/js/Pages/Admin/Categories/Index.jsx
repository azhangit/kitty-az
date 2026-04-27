import AdminLayout from '@/Layouts/AdminLayout';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function CategoriesIndex({ categories, colorOptions }) {
    const [editingId, setEditingId] = useState(null);

    const form = useForm({
        name: '',
        color: colorOptions[0],
    });

    const editForm = useForm({
        name: '',
        color: colorOptions[0],
    });

    const submitNewCategory = (e) => {
        e.preventDefault();
        form.post(route('admin.categories.store'), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    const startEditing = (category) => {
        setEditingId(category.id);
        editForm.setData('name', category.name);
        editForm.setData('color', category.color);
    };

    const submitEdit = (e, categoryId) => {
        e.preventDefault();
        editForm.put(route('admin.categories.update', categoryId), {
            preserveScroll: true,
            onSuccess: () => {
                setEditingId(null);
                editForm.reset();
            },
        });
    };

    const removeCategory = (categoryId) => {
        router.delete(route('admin.categories.destroy', categoryId), { preserveScroll: true });
    };

    return (
        <AdminLayout
            title="Categories"
            subtitle="Manage filter categories and tags"
        >
            <section className="space-y-4 rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                <h3 className="text-2xl font-semibold">Filter Categories</h3>
                <form onSubmit={submitNewCategory} className="space-y-3 rounded-2xl border border-[#e5d9d2] bg-[#f3ebe6] p-4">
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#6f5449]">Category Name</label>
                        <input
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            placeholder="Playful, etc"
                            className="mt-1 w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#6f5449]">Color</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {colorOptions.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => form.setData('color', color)}
                                    className={`h-7 w-7 rounded-full border-2 ${form.data.color === color ? 'border-[#2f1d15]' : 'border-transparent'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                    <button className="rounded-xl bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] px-5 py-2 text-sm font-semibold text-[#2f1d15]" disabled={form.processing}>
                        Add Category
                    </button>
                </form>

                <div className="space-y-2 rounded-2xl border border-[#e5d9d2] bg-white p-3">
                    {categories.map((category) => (
                        <div key={category.id} className="rounded-xl bg-[#f8f3ef] p-3">
                            {editingId === category.id ? (
                                <form onSubmit={(e) => submitEdit(e, category.id)} className="space-y-2">
                                    <input
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="w-full rounded-lg border border-[#e5d9d2] bg-white px-3 py-2 text-sm"
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {colorOptions.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => editForm.setData('color', color)}
                                                className={`h-6 w-6 rounded-full border-2 ${editForm.data.color === color ? 'border-[#2f1d15]' : 'border-transparent'}`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <button type="button" className="rounded-lg bg-[#e5e5e5] px-3 py-1 text-xs" onClick={() => setEditingId(null)}>Cancel</button>
                                        <button type="submit" className="rounded-lg bg-[#9cd2c8] px-3 py-1 text-xs" disabled={editForm.processing}>Save</button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="h-6 w-6 rounded-full" style={{ backgroundColor: category.color }} />
                                        <p className="text-lg">{category.name}</p>
                                    </div>
                                    <div className="flex gap-2 text-xs">
                                        <button type="button" className="rounded-md bg-[#e9e2dd] px-2 py-1" onClick={() => startEditing(category)}>Edit</button>
                                        <button type="button" className="rounded-md bg-[#f3d6d6] px-2 py-1" onClick={() => removeCategory(category.id)}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </AdminLayout>
    );
}
