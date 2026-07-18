import { Footer } from "@/components/footer/footer";
import SiteHeader from "@/components/headers/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <>
          <SiteHeader />
          {children}
          <Footer />
      </>
  );
}