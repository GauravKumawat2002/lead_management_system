import { cn } from "@/lib/utils";

interface CardData {
  [key: string]: string | number | undefined;
}
type DetailCardProps = {
  cardHeading: string;
  cardData: CardData;
  className?: string;
};

export default function DetailCard({
  cardHeading,
  cardData,
  className,
}: DetailCardProps) {
  return (
    <div className={cn("p-4 shadow-lg outline outline-gray-500/10", className)}>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
        {cardHeading}
      </h3>
      <ul>
        {Object.entries(cardData).map(([key, value]) => (
          <li key={key} className="flex gap-2 py-2">
            <span className="capitalize text-gray-500 dark:text-gray-100">
              {key.replace(/_/g, " ")}:
            </span>
            {""}
            <span className="text-gray-700 dark:text-gray-400">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
