"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import TombolaExerciseView from "./components/views/TombolaExerciseView";
import TombolaFinishView from "./components/views/TombolaFinishView";
import { useTombola } from "./hooks/useTombola";

export default function FillExercise() {
  const { status, hasHydrated } = useTombola();

  useEffect(() => {
    if (hasHydrated && status === "idle") {
      redirect("/");
    }
  }, [status, hasHydrated]);

  if (!hasHydrated) {
    return <Loading message="Cargando" />;
  }

  if (status === "playing") {
    return <TombolaExerciseView />;
  } else if (status === "finished") {
    return <TombolaFinishView />;
  }
}

function Loading({ message }: { message: string }) {
  return (
    <div>
      <div className="flex flex-col items-center space-y-6">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
        <p className="font-semibold text-gray-900 text-xl">{message}</p>
      </div>
    </div>
  );
}
