import NavBar from "@/components/widgets/navbar";

const FlashcardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="text-slate-500">
      <NavBar />
      <div className="flex justify-center px-14 md:px-28 md:py-4 lg:px-48">
        {children}
      </div>
    </div>
  );
};

export default FlashcardLayout;
