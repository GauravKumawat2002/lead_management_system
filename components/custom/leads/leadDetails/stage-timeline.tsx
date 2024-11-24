import { ArrowBigDown } from "lucide-react";

export default function StogeTimeline({
  stage,
}: {
  stage: LeadsTableData["stage"];
}) {
  const stages: LeadsTableData["stage"][] = [
    "not answer",
    "not interested",
    "cold",
    "warm",
    "hot",
    "meeting fixed",
    "meeting completed",
    "converted to hot deals",
    "converted to clients",
    "active",
  ];

  return (
    <div className="w-56 px-2 py-4 shadow-lg outline outline-gray-500/10">
      <h3 className="pb-4 text-center text-lg font-semibold text-gray-800 dark:text-gray-200">
        Stage Timeline
      </h3>
      <ul>
        {stages.map((s, index) => (
          <li
            key={s}
            className={`flex flex-col items-center space-x-2 capitalize ${
              s === stage
                ? "text-blue-500 dark:text-blue-600"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <div className="flex items-center self-start text-center"></div>
            <span className="mx-auto">{s}</span>
            {index !== stages.length - 1 && (
              <ArrowBigDown className="h-8 w-8" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
