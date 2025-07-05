"use client";

import { useEffect } from "react";
import TombolaExerciseView from "./components/views/TombolaExerciseView";
import TombolaFinishView from "./components/views/TombolaFinishView";
import TombolaLoadingView from "./components/views/TombolaLoadingView";
import { useTombola } from "./hooks/useTombola";

export default function FillExercise() {
  const { status, init } = useTombola();

  useEffect(() => {
    if (status === "idle") init();
  }, [status, init]);
  if (status === "playing") {
    return <TombolaExerciseView />;
  } else if (status === "finished") {
    return <TombolaFinishView />;
  } else {
    return <TombolaLoadingView />;
  }
}
