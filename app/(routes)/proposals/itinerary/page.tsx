import { columns } from "@/components/custom/proposals/itinerary/columns";
import { DataTable } from "@/components/custom/leads/data-table";
import ErrorDisplay from "@/components/custom/shared/error-display";
import { getAllItinerary } from "@/services/itineraryService";

export default async function ItineraryPage() {
  try {
    const response = await getAllItinerary();
    if (response.status !== 200) throw response.data;
    return (
      <>
        <div className="mx-auto">
          <DataTable
            columns={columns}
            data={response.data}
            handleButtonInteractionType="Itinerary"
          />
        </div>
      </>
    );
  } catch (error) {
    return <ErrorDisplay message={error as string} />;
  }
}
