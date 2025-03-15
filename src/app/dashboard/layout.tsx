import NavBar from "@/components/widgets/navbar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="text-slate-500">
      <NavBar />
      <div className="px-14 md:px-28 md:py-4 lg:px-48">{children}</div>
    </div>
  );
};

export default DashboardLayout;
