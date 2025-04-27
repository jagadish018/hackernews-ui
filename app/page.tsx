// app/page.tsx
import { Navbar } from "@/components/navigation-bar/Navbar";
import DashboardPage from "./dashboard/page";
export default function Home() {
  return (
    <div className="container mx-auto p-4">
      {/* Pass required props to your DashboardPage */}
      <Navbar />
      <div className="mb-10"></div>
      <DashboardPage />

      {/* You can add other content here if needed */}
    </div>
  );
}
