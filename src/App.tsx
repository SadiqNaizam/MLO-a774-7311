import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // shadcn Sonner if used
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import generated pages
import Homepage from "./pages/Homepage";
import ServicesPage from "./pages/ServicesPage";
import InsightsPage from "./pages/InsightsPage";
import CareersPage from "./pages/CareersPage";
import ContactUsPage from "./pages/ContactUsPage";
import NotFound from "./pages/NotFound"; // Assumed to exist

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* For shadcn Toasts */}
      <Sonner /> {/* For shadcn Sonner toasts if preferred */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<ServicesPage />} />
          {/* Example detail route, actual implementation would require a specific component */}
          <Route path="/services/:serviceId" element={<ServicesPage />} /> 
          <Route path="/services/:serviceId/:subServiceId" element={<ServicesPage />} /> 
          
          <Route path="/insights" element={<InsightsPage />} />
          {/* Example detail route for an insight */}
          <Route path="/insights/:insightSlug" element={<InsightsPage />} /> 
          
          <Route path="/careers" element={<CareersPage />} />
          {/* Example detail route for a career */}
          <Route path="/careers/apply/:jobId" element={<CareersPage />} /> 

          <Route path="/contact-us" element={<ContactUsPage />} />
          
          {/* Placeholder routes for footer/other links if not covered by main pages */}
          <Route path="/about" element={<NotFound />} /> {/* Assuming AboutPage is not yet built */}
          <Route path="/privacy-policy" element={<NotFound />} />
          <Route path="/terms-of-service" element={<NotFound />} />
          <Route path="/faq" element={<NotFound />} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;