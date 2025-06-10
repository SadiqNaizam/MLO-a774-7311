import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { cn } from '@/lib/utils'; // For conditional classes

// Define props for the MegaMenuPanel
interface MegaMenuCategory {
  title: string;
  href?: string; // Optional link for the category title itself
  items: {
    title: string;
    href: string;
    description?: string;
  }[];
}

interface MegaMenuPanelProps {
  categories: MegaMenuCategory[];
  className?: string;
}

const MegaMenuPanel: React.FC<MegaMenuPanelProps> = ({ categories, className }) => {
  console.log("Rendering MegaMenuPanel with categories:", categories.length);

  if (!categories || categories.length === 0) {
    return null; // Don't render if no categories
  }

  return (
    <div className={cn("p-4 md:p-6 bg-background shadow-lg", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <div key={index} className="space-y-3">
            {category.href ? (
                <Link to={category.href} className="font-semibold text-lg text-primary hover:underline">
                    {category.title}
                </Link>
            ) : (
                <h3 className="font-semibold text-lg text-primary">{category.title}</h3>
            )}
            <ul className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link
                    to={item.href}
                    className="block p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <p className="font-medium">{item.title}</p>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenuPanel;