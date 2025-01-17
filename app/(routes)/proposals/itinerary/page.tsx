import { Columns } from "@/components/custom/proposals/itinerary/columns";
import { DataTable } from "@/components/custom/leads/data-table";
import ErrorDisplay from "@/components/custom/shared/error-display";
import { getAllItinerary } from "@/services/itineraryService";

export default async function ItineraryPage() {
  const response = await getAllItinerary();
  if (response.status !== 200) return <ErrorDisplay message={response.data} />;
  return (
    <>
      <div className="mx-auto">
        <DataTable
          columns={Columns}
          data={response.data}
          handleButtonInteractionType="Itinerary"
        />
      </div>
    </>
  );
}
