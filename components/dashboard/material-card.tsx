import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImg } from "@/lib/getImg";
import type { Material } from "@/lib/types";
import Image from "next/image";

export function MaterialCard({ material }: { material: Material }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={getImg(material.CoverPhoto)}
          alt={material.Title}
          className="object-cover"
          width={400}
          height={400}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{material.Title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground">{material.BrandName}</p>
        {material.VariantTitle && (
          <p className="text-xs text-muted-foreground mt-1">
            Variant: {material.VariantTitle}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex justify-between w-full">
          <p className="font-semibold">
            ${material.SalesPriceInUsd.toFixed(2)}
          </p>
          <p className="text-muted-foreground">
            {material.SalesPrice.toFixed(2)} BDT
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
