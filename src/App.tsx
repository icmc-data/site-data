
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Fronts from "./pages/Fronts";
import Events from "./pages/Events";
import EventsLOG from "./pages/EventsLOG";
import EventsLOGSpeakers from "./pages/EventsLOGSpeakers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Learn from "./pages/Learn";
import MembersHistory from "./pages/MembersHistory";

// i18n
import "./i18n";

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  // Set up language resource loading
  useEffect(() => {
    const loadResources = async () => {
      setIsLoading(true);
      const namespaces = ["common", "home", "about", "fronts", "contact", "events", "learn", "membershistory"];
      
      try {
        await Promise.all(
          namespaces.map(async (ns) => {
            if (!i18n.hasResourceBundle(i18n.language, ns)) {
              try {
                const response = await fetch(`/locales/${i18n.language}/${ns}.json`);
                if (!response.ok) throw new Error(`Failed to fetch ${ns}`);
                const data = await response.json();
                i18n.addResourceBundle(i18n.language, ns, data, true, true);
              } catch (error) {
                console.error(`Failed to load namespace ${ns} for language ${i18n.language}`, error);
              }
            }
          })
        );
      } finally {
        setIsLoading(false);
      }
    };
    
    loadResources();
  }, [i18n, i18n.language]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/fronts" element={<Fronts />} />
                <Route path="/events" element={<Events />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/events/log" element={<EventsLOG />} />
                <Route path="/events/log/speakers" element={<EventsLOGSpeakers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/membershistory" element={<MembersHistory />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
