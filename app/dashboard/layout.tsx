import { DashboardHeader } from "@/components/layout/dashboard-header";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      {children}
    </div>
  );
};

export default DashboardLayout;
