import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MegaMenuPanel from '@/components/layout/MegaMenuPanel';
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast"; // For success message
import { Phone, Mail, MapPin } from 'lucide-react';

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

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  consent: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." })
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactUsPage = () => {
  console.log('ContactUsPage loaded');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      consent: false,
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log("Form submitted:", data);
    // Simulate API call
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    form.reset();
  }

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
            <BreadcrumbItem><BreadcrumbPage>Contact Us</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have a question about our services, want to discuss a project, or just want to say hello, please reach out.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="fullName">Full Name</FormLabel>
                        <FormControl>
                          <Input id="fullName" placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <FormControl>
                          <Input id="email" type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="company">Company (Optional)</FormLabel>
                        <FormControl>
                          <Input id="company" placeholder="Acme Corp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="subject">Subject</FormLabel>
                        <FormControl>
                          <Input id="subject" placeholder="Project Inquiry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="message">Message</FormLabel>
                        <FormControl>
                          <Textarea id="message" placeholder="Tell us about your project or query..." rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the <Link to="/terms-of-service" className="underline hover:text-primary">terms and conditions</Link>.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Our Headquarters</h4>
                    <p className="text-muted-foreground">123 Innovation Drive, Tech City, TX 75001, USA</p>
                  </div>
                </div>
                 <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Email Us</h4>
                    <a href="mailto:info@ascendion.com" className="text-primary hover:underline">info@ascendion.com</a>
                  </div>
                </div>
                 <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Find Us On Map</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for an embedded map */}
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">
                            <a 
                                href="https://www.google.com/maps/search/?api=1&query=Ascendion+Headquarters" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="underline hover:text-primary"
                            >
                                View on Google Maps (Placeholder)
                            </a>
                        </p>
                        {/* Or an iframe like:
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-md"
                        ></iframe> 
                        */}
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUsPage;