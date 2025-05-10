import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { categoryList } from "@/data";
import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { SearchInput } from "../ui/custom";
import { Label } from "../ui/label";

export const FilterSections = () => {
  return (
    <div className="flex items-center gap-2">
      <SearchInput />
      <Popover>
        <PopoverTrigger className="flex items-center gap-2 border py-2 px-4 rounded-lg">
          <SlidersHorizontal className="size-4" />
          <span>category</span>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-1">
            {categoryList.map((category) => {
              return (
                <div key={category.Id} className="flex items-center gap-2">
                  <Checkbox
                    id={category.Id.toString()}
                    className="min-h-full"
                  />
                  <Label
                    htmlFor={category.Id.toString()}
                    className="font-montserrat text-base"
                  >
                    {category.Title}
                  </Label>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
