"use client";

import { Settings } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DifficultySelector from "./DifficultySelector";
import ExerciseCounter from "./ExerciseCounter";

export default function TombolaConfig() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="config" className="border-0">
        <AccordionTrigger className="mt-2 border border-gray-200 bg-gray-50/50 p-1 text-gray-600 text-xs hover:cursor-pointer [&[data-state=open]]:text-black">
          <div className="my-0.5 ml-1 flex items-center gap-1.5">
            <Settings className="h-3 w-3" />
            Configuración
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-1 pb-2 ">
          <div className="space-y-6 rounded-lg border border-gray-200 bg-gray-50/50 p-5">
            <ExerciseCounter />

            <div className="border-gray-200 border-t" />

            <DifficultySelector />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
