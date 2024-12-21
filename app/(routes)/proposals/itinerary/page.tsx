import { columns } from "@/components/custom/proposals/itinerary/columns";
import { DataTable } from "@/components/custom/leads/data-table";
import ErrorDisplay from "@/components/custom/shared/error-display";
import { getAllLeads } from "@/services/leadsService";

async function getAllItinerary(): Promise<ItineraryTableData[]> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            itineraryId: "IT-1",
            subject: "Exciting Singapore 7 Days/6 Nights Tour",
            templateName: "Singapore 7D/6N",
          },
          {
            itineraryId: "IT-2",
            subject: "Romantic Paris 5 Days/4 Nights Tour",
            templateName: "Paris 5D/4N",
          },
          {
            itineraryId: "IT-3",
            subject: "Adventurous Amazon 10 Days/9 Nights Tour",
            templateName: "Amazon 10D/9N",
          },
          {
            itineraryId: "IT-4",
            subject: "Cultural Japan 8 Days/7 Nights Tour",
            templateName: "Japan 8D/7N",
          },
          {
            itineraryId: "IT-5",
            subject: "Historical Rome 6 Days/5 Nights Tour",
            templateName: "Rome 6D/5N",
          },
          {
            itineraryId: "IT-6",
            subject: "Scenic Switzerland 7 Days/6 Nights Tour",
            templateName: "Switzerland 7D/6N",
          },
          {
            itineraryId: "IT-7",
            subject: "Exotic Bali 5 Days/4 Nights Tour",
            templateName: "Bali 5D/4N",
          },
          {
            itineraryId: "IT-8",
            subject: "Majestic Australia 12 Days/11 Nights Tour",
            templateName: "Australia 12D/11N",
          },
          {
            itineraryId: "IT-9",
            subject: "Wildlife Kenya 8 Days/7 Nights Tour",
            templateName: "Kenya 8D/7N",
          },
          {
            itineraryId: "IT-10",
            subject: "Vibrant India 15 Days/14 Nights Tour",
            templateName: "India 15D/14N",
          },
          {
            itineraryId: "IT-11",
            subject: "Charming Italy 10 Days/9 Nights Tour",
            templateName: "Italy 10D/9N",
          },
          {
            itineraryId: "IT-12",
            subject: "Mystical Egypt 7 Days/6 Nights Tour",
            templateName: "Egypt 7D/6N",
          },
          {
            itineraryId: "IT-13",
            subject: "Sunny Spain 9 Days/8 Nights Tour",
            templateName: "Spain 9D/8N",
          },
          {
            itineraryId: "IT-14",
            subject: "Enchanting Greece 6 Days/5 Nights Tour",
            templateName: "Greece 6D/5N",
          },
          {
            itineraryId: "IT-15",
            subject: "Dynamic New York 5 Days/4 Nights Tour",
            templateName: "New York 5D/4N",
          },
          {
            itineraryId: "IT-16",
            subject: "Magical Disney World 7 Days/6 Nights Tour",
            templateName: "Disney World 7D/6N",
          },
          {
            itineraryId: "IT-17",
            subject: "Picturesque Norway 8 Days/7 Nights Tour",
            templateName: "Norway 8D/7N",
          },
          {
            itineraryId: "IT-18",
            subject: "Luxurious Dubai 6 Days/5 Nights Tour",
            templateName: "Dubai 6D/5N",
          },
          {
            itineraryId: "IT-19",
            subject: "Historic London 7 Days/6 Nights Tour",
            templateName: "London 7D/6N",
          },
          {
            itineraryId: "IT-20",
            subject: "Tropical Hawaii 10 Days/9 Nights Tour",
            templateName: "Hawaii 10D/9N",
          },
          {
            itineraryId: "IT-21",
            subject: "Adventurous New Zealand 14 Days/13 Nights Tour",
            templateName: "New Zealand 14D/13N",
          },
        ]),
      1000,
    ),
  );
}

export default async function ItineraryPage() {
  try {
    const response = await getAllItinerary();
    return (
      <>
        <div className="mx-auto">
          <DataTable
            columns={columns}
            data={response}
            handleButtonInteractionType="Itinerary"
          />
        </div>
      </>
    );
  } catch (error) {
    return <ErrorDisplay message={error as string} />;
  }
}
