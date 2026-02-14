import React from "react";
import { Navigate, Route, Routes } from "react-router";

import { DashboardLayout } from "../components/DashboardLayout";
import { Login } from "./routes/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PurchaseOrders } from "./routes/PurchaseOrders";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<PurchaseOrders />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
        </Route>
      </Route>

      {/* Public routes */}
      <Route path="login" element={<Login />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
