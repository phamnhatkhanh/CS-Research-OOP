import Main from "@/components/Learn/Layout/Main";
import Navigation from "@/components/Learn/Layout/Navigation";
export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, minmax(0,1fr))",
            md: "320px auto",
          },
        }}
      >
        <Navigation></Navigation>
        <Main>{children}</Main>
      </div>
    </>
  );
}
