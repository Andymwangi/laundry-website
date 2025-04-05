import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  popular?: boolean;
  colorClass?: string;
  buttonVariant?: 'default' | 'outline';
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  unit,
  description,
  features,
  popular = false,
  colorClass = 'bg-white',
  buttonVariant = 'default',
}) => {
  const isLight = colorClass.includes('bg-white') || colorClass.includes('bg-blue-50') || colorClass.includes('bg-yellow-50');
  
  return (
    <Card className={`h-full relative ${popular ? colorClass : 'border-2 ' + colorClass}`}>
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
          {name}
        </CardTitle>
        <p className={isLight ? 'text-gray-600' : 'text-blue-100'}>
          {description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <span className={`text-4xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {price}
          </span>
          <span className={`text-lg ${isLight ? 'text-gray-600' : 'text-blue-100'}`}>
            {' '}{unit}
          </span>
        </div>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start">
              <div className={`flex-shrink-0 h-6 w-6 rounded-full ${isLight ? 'bg-blue-100' : 'bg-blue-500'} flex items-center justify-center mr-2`}>
                <Check className={`h-4 w-4 ${isLight ? 'text-blue-600' : 'text-white'}`} />
              </div>
              <span className={isLight ? 'text-gray-700' : 'text-white'}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          size="lg" 
          variant={buttonVariant} 
          className={`w-full ${buttonVariant === 'outline' ? 'border-blue-600 text-blue-600 hover:bg-blue-50' : ''}`}
        >
          Choose Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;