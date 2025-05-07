import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Material } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

interface MaterialCardProps {
  material: Material;
}

export function MaterialCard({ material }: MaterialCardProps) {
  const { user } = useAuth();
  const currency = user?.currency;
  const imageUrl = `https://d1wh1xji6f82aw.cloudfront.net/${material.CoverPhoto}`;
  const fallbackImageUrl = 'https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={material.Title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = fallbackImageUrl;
          }}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-medium line-clamp-1">{material.Title}</h3>
          </div>
          {material.VariantTitle && (
            <Badge variant="outline" className="w-fit">
              {material.VariantTitle}
            </Badge>
          )}
          <p className="text-sm text-muted-foreground">{material.BrandName}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="font-semibold">{currency?.Symbol}{material.SalesPriceInUsd.toFixed(2)}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          Local: {material.SalesPrice.toFixed(2)}
        </span>
      </CardFooter>
    </Card>
  );
}