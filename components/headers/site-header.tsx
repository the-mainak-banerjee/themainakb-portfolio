import MainLogo from "../global/main-logo";
import { RevealHeader } from "../global/reveal";
import SiteNavDesktop from "./site-nav-desktop";
import SiteNavMobile from "./site-nav-mobile";
import ThemeSwitcher from "./theme-switcher";

function SiteHeader() {
  return (
    <>
      <RevealHeader>
        <div className="container flex items-center justify-between py-2">
          <MainLogo />
          <div className="divide-border flex items-center gap-4 divide-x-2">
            <SiteNavDesktop />
            <ThemeSwitcher />
          </div>
        </div>
      </RevealHeader>
      <SiteNavMobile />
    </>
  );
}

export default SiteHeader;
