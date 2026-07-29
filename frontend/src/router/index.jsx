import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../auth/ProtectedRoute';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Result from '../pages/Result';
import Profile from '../pages/Profile';
import AuthCallback from '../pages/AuthCallback';

// Exam pages
import Docker from '../pages/Exams/Docker';
import Kubernetes from '../pages/Exams/Kubernetes';
import Terraform from '../pages/Exams/Terraform';
import AWS from '../pages/Exams/AWS';
import Linux from '../pages/Exams/Linux';
import Jenkins from '../pages/Exams/Jenkins';
import Git from '../pages/Exams/Git';
import DevOps from '../pages/Exams/DevOps';

// Admin pages
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminUsers from '../pages/Admin/AdminUsers';
import AdminExams from '../pages/Admin/AdminExams';

const AppRouter = () => (
    <Routes>
        {/* Public auth routes */}
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Route>

        {/* OAuth callback */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Protected user routes */}
        <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/result/:id" element={<Result />} />
                {/* Exams */}
                <Route path="/exam/docker" element={<Docker />} />
                <Route path="/exam/kubernetes" element={<Kubernetes />} />
                <Route path="/exam/terraform" element={<Terraform />} />
                <Route path="/exam/aws" element={<AWS />} />
                <Route path="/exam/linux" element={<Linux />} />
                <Route path="/exam/jenkins" element={<Jenkins />} />
                <Route path="/exam/git" element={<Git />} />
                <Route path="/exam/devops" element={<DevOps />} />
            </Route>
        </Route>

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute role="admin" />}>
            <Route element={<MainLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/exams" element={<AdminExams />} />
            </Route>
        </Route>

        {/* Fallback */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
);

export default AppRouter;
