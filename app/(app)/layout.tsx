import SiteHeader from "@/components/headers/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <>
          <SiteHeader />
          <main className="container">{children}</main>
      </>
  );
}