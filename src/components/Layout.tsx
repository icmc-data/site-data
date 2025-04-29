import { Header } from "./Header";
import { Footer } from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const noFooterPaths = [
    "/events/log/register",
    "/events/log/submit-flash-talk",
    "/events/log/submit-poster"
  ];
  const showFooter = !noFooterPaths.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">{children}</div>
      {showFooter && <Footer />}
    </div>
  );
}
