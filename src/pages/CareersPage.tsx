import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MegaMenuPanel from '@/components/layout/MegaMenuPanel';
import CareerCard from '@/components/CareerCard';
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
import { Search, MapPin, Briefcase } from 'lucide-react';

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

const allJobOpenings = [
  { id: 1, title: "Senior Frontend Engineer", location: "New York, NY", department: "Engineering", summary: "Join our dynamic team to build cutting-edge user interfaces with React and TypeScript.", applyLink: "/careers/apply/senior-frontend-engineer" },
  { id: 2, title: "Data Scientist", location: "Remote", department: "AI & Data", summary: "Develop and deploy machine learning models to solve complex business problems.", applyLink: "/careers/apply/data-scientist" },
  { id: 3, title: "Cloud Solutions Architect", location: "Austin, TX", department: "Cloud", summary: "Design and implement scalable cloud solutions for enterprise clients on AWS and Azure.", applyLink: "/careers/apply/cloud-architect" },
  { id: 4, title: "UX/UI Designer", location: "San Francisco, CA", department: "Design", summary: "Create intuitive and visually appealing user experiences for web and mobile applications.", applyLink: "/careers/apply/ux-ui-designer" },
  { id: 5, title: "Backend Developer (Python)", location: "Remote", department: "Engineering", summary: "Build robust and scalable backend systems using Python, Django, and microservices.", applyLink: "/careers/apply/backend-developer-python" },
  { id: 6, title: "Product Manager", location: "New York, NY", department: "Product", summary: "Define product vision, strategy, and roadmap for innovative tech solutions.", applyLink: "/careers/apply/product-manager" },
];

const ITEMS_PER_PAGE = 4;
const jobLocations = ["All", "New York, NY", "Remote", "Austin, TX", "San Francisco, CA"];
const jobDepartments = ["All", "Engineering", "AI & Data", "Cloud", "Design", "Product"];

const CareersPage = () => {
  console.log('CareersPage loaded');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredJobs = useMemo(() => {
    return allJobOpenings
      .filter(job => 
        (selectedLocation === "All" || job.location === selectedLocation) &&
        (selectedDepartment === "All" || job.department === selectedDepartment) &&
        (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }, [searchTerm, selectedLocation, selectedDepartment]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0,200); // Scroll to top of job list
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
            <BreadcrumbItem><BreadcrumbPage>Careers</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We're looking for passionate and talented individuals to help us shape the future of technology. Discover your next opportunity at Ascendion.
          </p>
        </section>
        
        {/* Filters */}
        <section className="mb-8 p-6 bg-muted rounded-lg shadow">
            <div className="grid md:grid-cols-3 gap-4 items-end">
                <div>
                    <label htmlFor="search-jobs" className="block text-sm font-medium text-foreground mb-1">Search Jobs</label>
                    <div className="relative">
                        <Input 
                            id="search-jobs"
                            type="text" 
                            placeholder="Job title, keyword..." 
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                </div>
                <div>
                    <label htmlFor="location-filter" className="block text-sm font-medium text-foreground mb-1">Location</label>
                    <Select value={selectedLocation} onValueChange={(value) => { setSelectedLocation(value); setCurrentPage(1); }}>
                        <SelectTrigger id="location-filter" className="w-full">
                            <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                            {jobLocations.map(loc => ( <SelectItem key={loc} value={loc}>{loc}</SelectItem> ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor="department-filter" className="block text-sm font-medium text-foreground mb-1">Department</label>
                    <Select value={selectedDepartment} onValueChange={(value) => { setSelectedDepartment(value); setCurrentPage(1); }}>
                        <SelectTrigger id="department-filter" className="w-full">
                            <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                            {jobDepartments.map(dept => ( <SelectItem key={dept} value={dept}>{dept}</SelectItem> ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>

        {/* Job Listings */}
        {paginatedJobs.length > 0 ? (
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            {paginatedJobs.map(job => (
              <CareerCard key={job.id} {...job} />
            ))}
          </section>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No job openings found matching your criteria.</p>
            <p className="mt-2">Try broadening your search or check back later!</p>
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

export default CareersPage;