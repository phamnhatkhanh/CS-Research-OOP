import Header from "@/components/Home/Header";
import Main from "@/components/Learn/Layout/Main";
export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
