import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface InsightCardProps {
  title: string;
  summary: string;
  imageUrl?: string; // Optional image
  category?: string;
  date?: string; // e.g., "April 20, 2024"
  readMoreLink: string;
  className?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  summary,
  imageUrl,
  category,
  date,
  readMoreLink,
  className,
}) => {
  console.log("Rendering InsightCard:", title);

  return (
    <Card className={className ? `overflow-hidden h-full flex flex-col ${className}` : "overflow-hidden h-full flex flex-col"}>
      {imageUrl && (
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')} // Fallback
            />
          </AspectRatio>
        </CardHeader>
      )}
      <CardContent className={`p-6 flex-grow ${!imageUrl && 'pt-6'}`}>
        {category && <Badge variant="outline" className="mb-2">{category}</Badge>}
        <CardTitle className="mb-2 text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{summary}</CardDescription>
        {date && <p className="text-xs text-muted-foreground mt-2">{date}</p>}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" size="sm">
          <Link to={readMoreLink}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InsightCard;