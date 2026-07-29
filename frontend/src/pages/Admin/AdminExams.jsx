import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import { Trash2, Edit } from 'lucide-react';

const EMPTY_EXAM = {
    title: '', slug: '', description: '', category: 'docker',
    difficulty: 'intermediate', durationMinutes: 30, passingScore: 70,
};

const AdminExams = () => {
    const [exams, setExams] = useState([]);
    const [form, setForm] = useState(EMPTY_EXAM);
    const [editing, setEditing] = useState(null); // exam id being edited
    const [saving, setSaving] = useState(false);

    const fetchExams = () => api.get('/exams').then(({ data }) => setExams(data));

    useEffect(() => { fetchExams(); }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editing) {
                await api.put(`/admin/exams/${editing}`, form);
                toast.success('Exam updated');
            } else {
                await api.post('/admin/exams', form);
                toast.success('Exam created');
            }
            setForm(EMPTY_EXAM);
            setEditing(null);
            fetchExams();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (exam) => {
        setEditing(exam.id);
        setForm({
            title: exam.title, slug: exam.slug, description: exam.description || '',
            category: exam.category, difficulty: exam.difficulty,
            durationMinutes: exam.durationMinutes, passingScore: exam.passingScore,
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this exam and all its questions?')) return;
        try {
            await api.delete(`/admin/exams/${id}`);
            toast.success('Exam deleted');
            fetchExams();
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Exams</h1>

            {/* Form */}
            <form onSubmit={handleSave} className="card space-y-4">
                <h2 className="font-semibold text-gray-800">{editing ? 'Edit Exam' : 'Create New Exam'}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {[
                        { name: 'title', label: 'Title', type: 'text' },
                        { name: 'slug', label: 'Slug', type: 'text' },
                    ].map(({ name, label, type }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                            <input className="input" type={type} name={name} value={form[name]} onChange={handleChange} required />
                        </div>
                    ))}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea className="input resize-none" rows={2} name="description" value={form.description} onChange={handleChange} />
                </div>
                <div className="grid sm:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className="input" name="category" value={form.category} onChange={handleChange}>
                            {['docker', 'kubernetes', 'terraform', 'aws', 'linux', 'jenkins', 'git', 'devops'].map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                        <select className="input" name="difficulty" value={form.difficulty} onChange={handleChange}>
                            {['beginner', 'intermediate', 'advanced'].map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                        <input className="input" type="number" name="durationMinutes" value={form.durationMinutes} onChange={handleChange} min={5} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pass Score (%)</label>
                        <input className="input" type="number" name="passingScore" value={form.passingScore} onChange={handleChange} min={1} max={100} />
                    </div>
                </div>
                <div className="flex gap-3">
                    <button type="submit" disabled={saving} className="btn-primary">
                        {saving ? 'Saving…' : editing ? 'Update Exam' : 'Create Exam'}
                    </button>
                    {editing && (
                        <button type="button" className="btn-secondary" onClick={() => { setEditing(null); setForm(EMPTY_EXAM); }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Table */}
            <div className="card p-0 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                        <tr>
                            {['Title', 'Slug', 'Category', 'Difficulty', 'Duration', 'Pass', ''].map((h) => (
                                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {exams.map((e) => (
                            <tr key={e.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{e.title}</td>
                                <td className="px-4 py-3 text-gray-500">{e.slug}</td>
                                <td className="px-4 py-3 capitalize">{e.category}</td>
                                <td className="px-4 py-3 capitalize">{e.difficulty}</td>
                                <td className="px-4 py-3">{e.durationMinutes}m</td>
                                <td className="px-4 py-3">{e.passingScore}%</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <button onClick={() => handleEdit(e)} className="text-blue-600 hover:text-blue-800"><Edit size={15} /></button>
                                    <button onClick={() => handleDelete(e.id)} className="text-red-500 hover:text-red-700"><Trash2 size={15} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminExams;
