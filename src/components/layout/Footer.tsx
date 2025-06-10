import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, FileText } from 'lucide-react'; // Example social icons + privacy policy

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Careers", href: "/careers" },
        { label: "Insights", href: "/insights" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/insights" }, // Assuming insights serve as blog
        { label: "Case Studies", href: "/insights?filter=case-studies" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
      ],
    },
  ];

  const socialLinks = [
    { label: "Twitter", Icon: Twitter, href: "https://twitter.com/ascendion" },
    { label: "LinkedIn", Icon: Linkedin, href: "https://linkedin.com/company/ascendion" },
    { label: "GitHub", Icon: Github, href: "https://github.com/ascendion" }, // Placeholder
  ];

  return (
    <footer className="bg-muted text-muted-foreground border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-6 lg:mb-0">
            <Link to="/" className="inline-block mb-4 text-2xl font-bold text-primary">
              {/* Ascendion Logo Placeholder - Replace with actual SVG or Image */}
              Ascendion
            </Link>
            <p className="text-sm">Engineering the future, today.</p> {/* Example tagline */}
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left">
            &copy; {currentYear} Ascendion. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;