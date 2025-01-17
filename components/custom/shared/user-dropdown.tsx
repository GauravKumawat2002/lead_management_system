import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronUp, LucideProps, User2 } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function UserDropdown({
  DropDownItems,
}: {
  className?: string;
  DropDownItems: {
    label: string;
    route?: string;
    icon?: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    onClick?: () => void;
  }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <User2 /> Username
          <ChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width]"
      >
        {DropDownItems.map((item) => (
          <DropdownMenuItem key={item.label}>
            {item.route ? (
              <Link href={item.route}>
                <DropdownMenuLabel className="flex items-center gap-2 text-xs">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </DropdownMenuLabel>
              </Link>
            ) : (
              <DropdownMenuLabel
                className="flex items-center gap-2 text-xs"
                onClick={item.onClick}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </DropdownMenuLabel>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <ModeToggle type="secondary" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
