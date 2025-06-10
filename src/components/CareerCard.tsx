import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, ArrowRight } from 'lucide-react'; // Example icons

interface CareerCardProps {
  title: string;
  location: string;
  department?: string; // Optional
  summary: string;
  applyLink: string; // Could be an internal link or external ATS link
  className?: string;
}

const CareerCard: React.FC<CareerCardProps> = ({
  title,
  location,
  department,
  summary,
  applyLink,
  className,
}) => {
  console.log("Rendering CareerCard:", title);

  return (
    <Card className={className ? `h-full flex flex-col ${className}` : "h-full flex flex-col"}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
          <span className="flex items-center">
            <MapPin className="mr-1.5 h-4 w-4" /> {location}
          </span>
          {department && (
            <span className="flex items-center">
              <Briefcase className="mr-1.5 h-4 w-4" /> {department}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3">{summary}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="default" size="sm">
          {/* Check if applyLink is external or internal */}
          {applyLink.startsWith('http') ? (
            <a href={applyLink} target="_blank" rel="noopener noreferrer">
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          ) : (
            <Link to={applyLink}>
              View & Apply <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CareerCard;