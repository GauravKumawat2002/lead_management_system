"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LucideChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Action = {
  title: string;
  onClick: () => void;
};
export default function ActionButton({ actions }: { actions: Action[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="btn btn-primary">
          Actions
          <LucideChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {actions.map((action) => (
            <DropdownMenuItem onClick={action.onClick} key={action.title}>
              {action.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
