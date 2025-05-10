import { DashboardHeader } from "@/components/shared/dashboard-header";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      {children}
    </div>
  );
};

export default DashboardLayout;
