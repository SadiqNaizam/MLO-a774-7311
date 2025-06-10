import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react'; // Example icon

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode; // e.g., <Briefcase className="h-8 w-8 text-primary" />
  learnMoreLink: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, learnMoreLink, className }) => {
  console.log("Rendering ServiceCard:", title);

  return (
    <Card className={className ? `h-full flex flex-col ${className}` : "h-full flex flex-col"}>
      <CardHeader>
        {icon && <div className="mb-4 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0">
          <Link to={learnMoreLink}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;