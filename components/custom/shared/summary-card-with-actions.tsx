"use client";
import React from "react";
import { cn } from "@/lib/utils";
import ActionButton, { Action } from "./action-button";

type BaseProps = {
  Name: string;
  className?: string;
};
type ViewLeadProps = BaseProps & {
  cardType: "viewLead";
  LeadStage: LeadsData["stage"];
  LeadStatus: LeadsData["status"];
};
type ViewCostomerProps = BaseProps & {
  cardType: "viewCostomer";
};
type SummaryCardWithActionsProps = ViewLeadProps | ViewCostomerProps;

const actions = [
  { title: "Add Follow Up", onClick: () => {} },
  { title: "Add Note", onClick: () => {} },
  { title: "Download PDF", onClick: () => {} },
  { title: "Send Email", onClick: () => {} },
];
export default function LeadActions({
  props,
}: {
  props: SummaryCardWithActionsProps;
}) {
  return (
    <div
      className={cn(
        "z-30 mb-6 flex items-center justify-between rounded-xl bg-primary-foreground px-4 py-4 shadow-lg outline outline-gray-500/10 dark:shadow-none dark:outline-none",
        props.className,
      )}
    >
      <div>
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {props.Name}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-lg text-gray-500 dark:text-gray-100">
            {props.cardType === "viewLead" && (
              <>
                Stage:{" "}
                <span className="text-blue-500 dark:text-blue-300">
                  {props.LeadStage}
                </span>
              </>
            )}
          </div>
          <div className="text-lg text-gray-500 dark:text-gray-100">
            {props.cardType === "viewLead" && (
              <>
                Status:{" "}
                <span className="text-blue-500 dark:text-blue-300">
                  {props.LeadStatus}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <ActionButton actions={actions} />
      </div>
    </div>
  );
}
