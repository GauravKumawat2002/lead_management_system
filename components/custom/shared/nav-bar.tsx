"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

// userName will come from DB
const userName: string = "Gaurav Kumawat";
export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <header
      className={cn(
        `navbar ${state === "expanded" ? "navbar-shrinked" : "navbar-expanded"} `,
        className,
      )}
    >
      <nav className="flex items-center justify-end gap-4">
        <div className="jusity-start mr-auto flex items-center gap-4">
          <SidebarTrigger />
          {/* creating heading for Leads  */}
          {pathname === ROUTES.HOME && <GreetingTitle userName={userName} />}
          {pathname === ROUTES.LEADS && (
            <>
              <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
                Leads
              </h1>

              <Link href={"/leads/follow-up-leads"}>
                <Button className="font-semibold">Follow Up Lead</Button>
              </Link>
            </>
          )}
          {pathname === ROUTES.FOLLOW_UP_LEADS && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Follow Up Leads
            </h1>
          )}
          {pathname === ROUTES.NEW_LEADS && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Add New Lead
            </h1>
          )}
          {pathname.startsWith(ROUTES.LEADS_DETAILS("LD-")) && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Lead Details
            </h1>
          )}
          {pathname.startsWith(ROUTES.UPDATE_LEAD("LD-")) && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Update Lead
            </h1>
          )}
          {pathname === ROUTES.ITINERARY && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Itineraries
            </h1>
          )}
          {pathname === ROUTES.NEW_ITINERARY && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Add New Itinerary
            </h1>
          )}
          {pathname.startsWith(ROUTES.UPDATE_ITINERARY("IT-")) && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Update Itinerary
            </h1>
          )}
          {pathname.startsWith(ROUTES.DUPLICATE_ITINERARY("IT-")) && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Duplicate Itinerary
            </h1>
          )}
          {pathname === ROUTES.QUOTATIONS && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Quotations
            </h1>
          )}
          {pathname === ROUTES.NEW_QUOTATION() && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Add New Quotation
            </h1>
          )}
          {pathname.startsWith(ROUTES.UPDATE_QUOTATION("QT-")) && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Update Quotation
            </h1>
          )}
          {pathname.startsWith(ROUTES.DUPLICATE_QUOTATION("QT-")) && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Duplicate Quotation
            </h1>
          )}
        </div>
        <Link href={"/notifications"}>
          <Bell />
        </Link>{" "}
        {/* <ModeToggle /> */}
      </nav>
    </header>
  );
}

const GreetingTitle = ({ userName }: { userName: string }) => {
  return (
    <h1 className="text-xl font-bold text-primary">
      <span className="text-base font-semibold text-gray-600 dark:text-gray-200">
        Great Day !
      </span>{" "}
      {userName}
    </h1>
  );
};

// things need to be in the dropdown
// - User Profile {route: /profile}
// - Settings {route: /settings} (will implement later)
// - Logout
// - Status (active, idle) (will implement later)
