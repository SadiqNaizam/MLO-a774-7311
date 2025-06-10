import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MegaMenuPanel from '@/components/layout/MegaMenuPanel';
import ServiceCard from '@/components/ServiceCard';
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BarChart, Code, Cloud, Users, Zap, Database } from 'lucide-react'; // Example icons

const megaMenuCategories = [ /* Same as Homepage for consistency */
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

const serviceCategories = [
  {
    id: "ai-data",
    title: "AI & Data",
    description: "Leverage artificial intelligence and data analytics to transform your business operations, gain actionable insights, and drive innovation.",
    icon: <BarChart className="h-10 w-10 text-primary" />,
    services: [
      { title: "Machine Learning Solutions", description: "Custom ML models for prediction, classification, and automation.", learnMoreLink: "/services/ai-data/machine-learning", icon: <Zap className="h-8 w-8 text-primary" /> },
      { title: "Data Analytics Platforms", description: "Build robust platforms for data collection, processing, and visualization.", learnMoreLink: "/services/ai-data/analytics-platforms", icon: <Database className="h-8 w-8 text-primary" /> },
      { title: "Natural Language Processing", description: "Develop applications that understand and process human language.", learnMoreLink: "/services/ai-data/nlp", icon: <Users className="h-8 w-8 text-primary" /> },
    ],
    faqs: [
        { id: "ai-faq1", question: "What types of AI models can you build?", answer: "We specialize in a variety of models including predictive analytics, computer vision, NLP, and recommendation systems, tailored to your specific business needs." },
        { id: "ai-faq2", question: "How do you ensure data security in AI projects?", answer: "Data security and privacy are paramount. We adhere to strict data governance protocols and implement robust security measures throughout the project lifecycle." },
    ]
  },
  {
    id: "digital-engineering",
    title: "Digital Engineering",
    description: "Design, develop, and deploy cutting-edge digital products and platforms that deliver exceptional user experiences and drive business value.",
    icon: <Code className="h-10 w-10 text-primary" />,
    services: [
      { title: "Custom Software Development", description: "Tailored software solutions to meet your unique business requirements.", learnMoreLink: "/services/digital-engineering/custom-software", icon: <Code className="h-8 w-8 text-primary" /> },
      { title: "Mobile App Development", description: "Native and cross-platform mobile applications for iOS and Android.", learnMoreLink: "/services/digital-engineering/mobile-apps", icon: <Users className="h-8 w-8 text-primary" /> }, // Placeholder icon
      { title: "UX/UI Design", description: "User-centric design to create intuitive and engaging digital experiences.", learnMoreLink: "/services/digital-engineering/ux-ui", icon: <Zap className="h-8 w-8 text-primary" /> }, // Placeholder icon
    ],
     faqs: [
        { id: "de-faq1", question: "What technologies do you use for digital engineering?", answer: "We leverage a modern tech stack including React, Angular, Node.js, Python, Java, and various cloud platforms like AWS, Azure, and GCP." },
        { id: "de-faq2", question: "Can you help with modernizing legacy systems?", answer: "Yes, we have extensive experience in legacy system modernization, helping businesses migrate to more agile and scalable architectures." },
    ]
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    description: "Accelerate your cloud journey with our expertise in cloud strategy, migration, optimization, and management across leading platforms.",
    icon: <Cloud className="h-10 w-10 text-primary" />,
    services: [
      { title: "Cloud Migration Services", description: "Seamlessly migrate your applications and data to the cloud.", learnMoreLink: "/services/cloud/migration", icon: <Cloud className="h-8 w-8 text-primary" /> },
      { title: "Cloud-Native Development", description: "Build and deploy applications designed for cloud scalability and resilience.", learnMoreLink: "/services/cloud/native-development", icon: <Code className="h-8 w-8 text-primary" /> },
      { title: "DevOps & Automation", description: "Implement CI/CD pipelines and automation for faster, reliable delivery.", learnMoreLink: "/services/cloud/devops", icon: <Zap className="h-8 w-8 text-primary" /> },
    ],
     faqs: [
        { id: "cs-faq1", question: "Which cloud platforms do you support?", answer: "We are proficient with major cloud providers including Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP)." },
        { id: "cs-faq2", question: "How do you optimize cloud costs?", answer: "We employ various strategies such as right-sizing resources, leveraging reserved instances, and implementing cost monitoring tools to ensure optimal cloud spend." },
    ]
  },
];

const ServicesPage = () => {
  console.log('ServicesPage loaded');
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
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Services</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer a comprehensive suite of technology services designed to help your business thrive in the digital age. Explore our capabilities below.
          </p>
        </section>

        {serviceCategories.map((category) => (
          <section key={category.id} id={category.id} className="mb-16 scroll-mt-20">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-muted p-6 md:p-8">
                <div className="flex items-center space-x-4 mb-2">
                  {category.icon}
                  <CardTitle className="text-2xl md:text-3xl">{category.title}</CardTitle>
                </div>
                <CardDescription className="text-md md:text-lg">{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-6">Key Offerings in {category.title}:</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {category.services.map(service => (
                    <ServiceCard key={service.title} {...service} className="bg-background border" />
                  ))}
                </div>
                {category.faqs && category.faqs.length > 0 && (
                    <>
                        <h4 className="text-lg font-semibold mb-4">Frequently Asked Questions</h4>
                        <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map(faq => (
                            <AccordionItem value={faq.id} key={faq.id}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>
                    </>
                )}
                 <div className="mt-8 text-center">
                    <Button asChild size="lg">
                        <Link to={`/contact-us?service=${category.id}`}>Discuss Your {category.title} Needs</Link>
                    </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;