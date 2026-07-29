import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { updateProfileApi, changePasswordApi } from '../api/users';
import { useResults } from '../hooks/useResults';
import { User, Lock } from 'lucide-react';

const Profile = () => {
    const { user, setUser } = useAuth();
    const { results } = useResults();
    const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '' });
    const [avatarFile, setAvatarFile] = useState(null);
    const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '' });
    const [saving, setSaving] = useState(false);
    const [changingPw, setChangingPw] = useState(false);

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const fd = new FormData();
            fd.append('name', form.name);
            fd.append('bio', form.bio);
            if (avatarFile) fd.append('avatar', avatarFile);
            const { data } = await updateProfileApi(fd);
            setUser((u) => ({ ...u, ...data }));
            toast.success('Profile updated');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (pwForm.newPassword.length < 6) { toast.error('Password too short'); return; }
        setChangingPw(true);
        try {
            await changePasswordApi(pwForm);
            toast.success('Password changed');
            setPwForm({ currentPassword: '', newPassword: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to change password');
        } finally {
            setChangingPw(false);
        }
    };

    const passed = results.filter((r) => r.passed).length;

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
                {[
                    { label: 'Attempts', value: results.length },
                    { label: 'Passed', value: passed },
                    { label: 'Pass Rate', value: results.length ? `${Math.round((passed / results.length) * 100)}%` : '—' },
                ].map(({ label, value }) => (
                    <div key={label} className="card">
                        <p className="text-2xl font-bold text-blue-600">{value}</p>
                        <p className="text-xs text-gray-500 mt-1">{label}</p>
                    </div>
                ))}
            </div>

            {/* Profile form */}
            <form onSubmit={handleProfileSave} className="card space-y-5">
                <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <User size={18} /> Personal Info
                </h2>

                {/* Avatar preview */}
                <div className="flex items-center gap-4">
                    <img
                        src={avatarFile ? URL.createObjectURL(avatarFile) : (user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=3b82f6&color=fff`)}
                        alt="avatar"
                        className="w-16 h-16 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                        <label className="btn-secondary cursor-pointer text-xs">
                            Change Photo
                            <input type="file" accept="image/*" className="sr-only" onChange={(e) => setAvatarFile(e.target.files[0])} />
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input className="input bg-gray-50" value={user?.email || ''} disabled />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                        className="input resize-none" rows={3}
                        placeholder="Tell us a little about yourself…"
                        value={form.bio}
                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    />
                </div>

                <button type="submit" disabled={saving} className="btn-primary">
                    {saving ? 'Saving…' : 'Save Changes'}
                </button>
            </form>

            {/* Password form */}
            <form onSubmit={handlePasswordChange} className="card space-y-5">
                <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <Lock size={18} /> Change Password
                </h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" className="input" value={pwForm.currentPassword}
                        onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" className="input" minLength={6} value={pwForm.newPassword}
                        onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} />
                </div>

                <button type="submit" disabled={changingPw} className="btn-primary">
                    {changingPw ? 'Updating…' : 'Update Password'}
                </button>
            </form>
        </div>
    );
};

export default Profile;
