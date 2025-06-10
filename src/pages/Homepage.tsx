import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MegaMenuPanel from '@/components/layout/MegaMenuPanel';
import AscendionCarousel from '@/components/Carousel'; // Renamed to avoid conflict with shadcn Carousel
import ServiceCard from '@/components/ServiceCard';
import InsightCard from '@/components/InsightCard';
import Footer from '@/components/layout/Footer';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Briefcase, Lightbulb, Users, BarChart, ShieldCheck, TrendingUp } from 'lucide-react'; // Example icons

// Placeholder data for MegaMenuPanel
const megaMenuCategories = [
  {
    title: "What We Do",
    href: "/services",
    items: [
      { title: "AI & Data", href: "/services/ai-data", description: "Unlock insights and automate processes." },
      { title: "Digital Engineering", href: "/services/digital-engineering", description: "Build modern, scalable applications." },
      { title: "Cloud Solutions", href: "/services/cloud", description: "Migrate and manage cloud infrastructure." },
    ],
  },
  {
    title: "Who We Are",
    href: "/about", // Assuming an about page might exist or be added later
    items: [
      { title: "Our Mission", href: "/about#mission", description: "Driving innovation for our clients." },
      { title: "Leadership", href: "/about#leadership", description: "Meet our experienced team." },
      { title: "Culture", href: "/about#culture", description: "Learn about our work environment." },
    ],
  },
];

const carouselSlides = [
  { id: 1, content: <div className="text-center p-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg h-full flex flex-col justify-center"><h1 className="text-4xl md:text-5xl font-bold">Innovate with Ascendion</h1><p className="mt-4 text-lg md:text-xl">Engineering the Future, Today.</p><Button variant="secondary" className="mt-6">Discover More</Button></div>, altText: "Slide 1 - Innovation" },
  { id: 2, content: <div className="text-center p-10 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg h-full flex flex-col justify-center"><h1 className="text-4xl md:text-5xl font-bold">Transform Your Business</h1><p className="mt-4 text-lg md:text-xl">With our cutting-edge AI solutions.</p><Button variant="secondary" className="mt-6">Explore AI Services</Button></div>, altText: "Slide 2 - AI Solutions" },
];

const services = [
  { title: "AI & Data Solutions", description: "Harness the power of AI and data analytics to drive growth and efficiency.", learnMoreLink: "/services/ai-data", icon: <BarChart className="h-8 w-8 text-primary" /> },
  { title: "Digital Product Engineering", description: "Create innovative digital products with our expert engineering teams.", learnMoreLink: "/services/digital-engineering", icon: <TrendingUp className="h-8 w-8 text-primary" /> },
  { title: "Cloud Transformation", description: "Modernize your infrastructure with our comprehensive cloud services.", learnMoreLink: "/services/cloud", icon: <ShieldCheck className="h-8 w-8 text-primary" /> },
];

const insights = [
  { title: "The Future of Generative AI", summary: "Exploring the impact of GenAI across industries and how businesses can leverage it.", imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", category: "AI", date: "July 26, 2024", readMoreLink: "/insights/future-of-gen-ai" },
  { title: "Navigating Digital Transformation", summary: "Key strategies for successful digital transformation in a rapidly evolving landscape.", imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", category: "Strategy", date: "July 15, 2024", readMoreLink: "/insights/navigating-digital-transformation" },
];

const faqs = [
    { id: "faq1", question: "What industries does Ascendion serve?", answer: "Ascendion serves a wide range of industries including finance, healthcare, retail, technology, and more, providing tailored solutions to meet specific industry challenges." },
    { id: "faq2", question: "How does Ascendion ensure project success?", answer: "We combine agile methodologies, experienced talent, and a client-centric approach to ensure projects are delivered on time, within budget, and to the highest quality standards." },
    { id: "faq3", question: "Where are Ascendion's offices located?", answer: "Ascendion has a global presence with multiple offices and delivery centers. Please visit our Contact Us page for specific location details." },
];

const Homepage = () => {
  console.log('Homepage loaded');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">Ascendion</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger onMouseEnter={() => setIsMegaMenuOpen(true)} onMouseLeave={() => setIsMegaMenuOpen(false)}>
                  What We Do
                </NavigationMenuTrigger>
                {/* MegaMenuPanel is positioned absolutely or managed by NavigationMenuContent */}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/insights" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Insights
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/careers" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Careers
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact-us" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {isMegaMenuOpen && (
            <div 
              onMouseEnter={() => setIsMegaMenuOpen(true)} 
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              className="absolute top-full left-0 right-0 z-50 shadow-lg" // Basic positioning
            >
              <MegaMenuPanel categories={megaMenuCategories} />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Input type="search" placeholder="Search..." className="hidden md:block w-48" />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="container">
            <AscendionCarousel slides={carouselSlides} />
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 md:py-20 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-2">Our Core Services</h2>
            <p className="text-muted-foreground text-center mb-10">Driving innovation and transformation across your enterprise.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild size="lg">
                <Link to="/services">Explore All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="py-12 md:py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-2">Latest Insights</h2>
            <p className="text-muted-foreground text-center mb-10">Stay informed with our expert analysis and thought leadership.</p>
            <div className="grid md:grid-cols-2 gap-8">
              {insights.map(insight => (
                <InsightCard key={insight.title} {...insight} />
              ))}
            </div>
             <div className="text-center mt-10">
              <Button asChild size="lg" variant="outline">
                <Link to="/insights">View All Insights</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Client Trust/Logos - Placeholder */}
        <section className="py-12 md:py-20 bg-muted">
            <div className="container">
                <h2 className="text-2xl font-semibold text-center text-muted-foreground mb-8">Trusted by Leading Companies</h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {/* Replace with actual client logos using AspectRatio or img tags */}
                    <img src="https://via.placeholder.com/120x60?text=Client+Logo+1" alt="Client Logo 1" className="h-10 md:h-12" />
                    <img src="https://via.placeholder.com/120x60?text=Client+Logo+2" alt="Client Logo 2" className="h-10 md:h-12" />
                    <img src="https://via.placeholder.com/120x60?text=Client+Logo+3" alt="Client Logo 3" className="h-10 md:h-12" />
                    <img src="https://via.placeholder.com/120x60?text=Client+Logo+4" alt="Client Logo 4" className="h-10 md:h-12" />
                    <img src="https://via.placeholder.com/120x60?text=Client+Logo+5" alt="Client Logo 5" className="h-10 md:h-12" />
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map(faq => (
                <AccordionItem value={faq.id} key={faq.id}>
                  <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;