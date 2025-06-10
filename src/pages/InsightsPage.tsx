import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MegaMenuPanel from '@/components/layout/MegaMenuPanel';
import InsightCard from '@/components/InsightCard';
import Footer from '@/components/layout/Footer';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const megaMenuCategories = [ /* Same as Homepage */
  {
    title: "What We Do", href: "/services",
    items: [
      { title: "AI & Data", href: "/services/ai-data", description: "Unlock insights and automate processes." },
      { title: "Digital Engineering", href: "/services/digital-engineering", description: "Build modern, scalable applications." },
      { title: "Cloud Solutions", href: "/services/cloud", description: "Migrate and manage cloud infrastructure." },
    ],
  },
  {
    title: "Who We Are", href: "/about",
    items: [
      { title: "Our Mission", href: "/about#mission", description: "Driving innovation for our clients." },
      { title: "Leadership", href: "/about#leadership", description: "Meet our experienced team." },
      { title: "Culture", href: "/about#culture", description: "Learn about our work environment." },
    ],
  },
];

const allInsights = [
  { id:1, title: "The Future of Generative AI", summary: "Exploring the impact of GenAI across industries and how businesses can leverage it.", imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", category: "AI", date: "July 26, 2024", readMoreLink: "/insights/future-of-gen-ai" },
  { id:2, title: "Navigating Digital Transformation", summary: "Key strategies for successful digital transformation in a rapidly evolving landscape.", imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", category: "Strategy", date: "July 15, 2024", readMoreLink: "/insights/navigating-digital-transformation" },
  { id:3, title: "Cloud Cost Optimization Techniques", summary: "Practical tips for reducing your cloud spend without sacrificing performance.", imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", category: "Cloud", date: "July 5, 2024", readMoreLink: "/insights/cloud-cost-optimization" },
  { id:4, title: "Building Resilient Microservices", summary: "Architectural patterns and best practices for robust microservice-based applications.", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", category: "Engineering", date: "June 28, 2024", readMoreLink: "/insights/resilient-microservices" },
  { id:5, title: "The Role of Data Ethics in AI", summary: "Addressing the ethical considerations and biases in artificial intelligence systems.", imageUrl: "https://images.unsplash.com/photo-1593349480500-7055575b8767?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", category: "AI", date: "June 20, 2024", readMoreLink: "/insights/data-ethics-ai" },
  { id:6, title: "Maximizing ROI with Agile Development", summary: "How agile methodologies can lead to better project outcomes and higher returns.", imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", category: "Strategy", date: "June 10, 2024", readMoreLink: "/insights/agile-roi" },
];

const ITEMS_PER_PAGE = 4;
const insightCategories = ["All", "AI", "Strategy", "Cloud", "Engineering"];

const InsightsPage = () => {
  console.log('InsightsPage loaded');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredInsights = useMemo(() => {
    return allInsights
      .filter(insight => 
        (selectedCategory === "All" || insight.category === selectedCategory) &&
        (insight.title.toLowerCase().includes(searchTerm.toLowerCase()) || insight.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredInsights.length / ITEMS_PER_PAGE);
  const paginatedInsights = filteredInsights.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0,0); // Scroll to top on page change
    }
  };

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
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger onMouseEnter={() => setIsMegaMenuOpen(true)} onMouseLeave={() => setIsMegaMenuOpen(false)}>What We Do</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/insights" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Insights</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/careers" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Careers</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact-us" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact Us</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {isMegaMenuOpen && (
            <div 
              onMouseEnter={() => setIsMegaMenuOpen(true)} 
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              className="absolute top-full left-0 right-0 z-50 shadow-lg"
            >
              <MegaMenuPanel categories={megaMenuCategories} />
            </div>
          )}
          <Button>Get Started</Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Insights</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Insights</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our latest articles, case studies, and thought leadership pieces on technology and innovation.
          </p>
        </section>

        {/* Filters */}
        <section className="mb-8 p-6 bg-muted rounded-lg shadow">
            <div className="grid md:grid-cols-2 gap-4 items-end">
                <div>
                    <label htmlFor="search-insights" className="block text-sm font-medium text-foreground mb-1">Search Insights</label>
                    <div className="relative">
                        <Input 
                            id="search-insights"
                            type="text" 
                            placeholder="Search by keyword..." 
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                </div>
                <div>
                    <label htmlFor="category-filter" className="block text-sm font-medium text-foreground mb-1">Filter by Category</label>
                    <Select value={selectedCategory} onValueChange={(value) => { setSelectedCategory(value); setCurrentPage(1); }}>
                        <SelectTrigger id="category-filter">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {insightCategories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>

        {/* Insights Grid */}
        {paginatedInsights.length > 0 ? (
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            {paginatedInsights.map(insight => (
              <InsightCard key={insight.id} {...insight} />
            ))}
          </section>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No insights found matching your criteria.</p>
          </div>
        )}
        

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => {
                 const pageNum = i + 1;
                 // Basic pagination logic: show first, last, current, and neighbors
                 if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                    return (
                        <PaginationItem key={i}>
                        <PaginationLink 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); handlePageChange(pageNum); }}
                            isActive={currentPage === pageNum}
                        >
                            {pageNum}
                        </PaginationLink>
                        </PaginationItem>
                    );
                 } else if ( (pageNum === currentPage - 2 && pageNum > 1) || (pageNum === currentPage + 2 && pageNum < totalPages)) {
                    return <PaginationEllipsis key={i} />;
                 }
                 return null;
              })}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default InsightsPage;