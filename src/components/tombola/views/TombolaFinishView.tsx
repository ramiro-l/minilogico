import Link from "next/link";

import { CheckCircle, RotateCcw, XCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import InlineLaTeX from "@/components/InlineLaTeX";

import { useTombola } from "@/lib/tombola/hooks/useTombola";

import type { Blank } from "@/lib/tombola/types/tombolaExercise";

export default function TombolaFinishView() {
  const { history, limitExercises, init } = useTombola();

  const perfectExercises = history.filter((exercise) => {
    const blanks = exercise.sentence.filter(
      (segment): segment is Blank =>
        typeof segment === "object" && "correctOption" in segment
    );
    const correctAnswers = blanks.filter(
      (blank) => blank.userResponse?.id === blank.correctOption.id
    ).length;
    return correctAnswers === blanks.length;
  }).length;

  return (
    <div className="my-auto w-full py-6 max-md:mx-4">
      <div className="mb-6 text-center">
        <h1 className="mb-2 font-bold text-2xl">¡Terminaste!</h1>
        <p className="text-gray-600">
          Revisá tus respuestas ejercicio por ejercicio
        </p>
      </div>

      <Card className="mb-6 w-full rounded-md border-blue-200 bg-blue-50 py-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Resumen General</h3>
              <p className="text-gray-600 text-sm">
                {perfectExercises} de {limitExercises} ejercicios perfectos
              </p>
            </div>
            <div className="text-right">
              <div className="font-bold text-2xl text-blue-600">
                {Math.round((perfectExercises / limitExercises) * 100)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de ejercicios */}
      <Accordion type="single" collapsible className="space-y-2">
        {history.map((exercise, index) => {
          // Calcular estadísticas del ejercicio
          const blanks = exercise.sentence.filter(
            (segment): segment is Blank =>
              typeof segment === "object" && "correctOption" in segment
          );
          const correctAnswers = blanks.filter(
            (blank) => blank.userResponse?.id === blank.correctOption.id
          ).length;
          const isAllCorrect = correctAnswers === blanks.length;

          return (
            <AccordionItem
              key={`exercise-${exercise.title.slice(0, 10)}-${index}`}
              value={`item-${index}`}
              className="rounded-lg border last:border-b-1"
            >
              {/* Encabezado del ejercicio */}
              <AccordionTrigger className="px-4 hover:cursor-pointer hover:bg-gray-50">
                <div className="flex w-full items-center justify-between ">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Ejercicio {index + 1}</span>
                    {isAllCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <span className="text-gray-500 text-sm">
                    {correctAnswers}/{blanks.length}
                  </span>
                </div>
              </AccordionTrigger>

              {/* Contenido del ejercicio */}
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4 pt-2">
                  {/* Título del ejercicio */}
                  <div className="rounded-md bg-gray-50 p-3">
                    <p className="font-medium text-gray-800 text-sm">
                      <InlineLaTeX math={exercise.title} />
                    </p>
                  </div>

                  {/* Tu respuesta */}
                  <div className="rounded-md border border-gray-200 bg-white p-3">
                    <p className="mb-2 font-medium text-gray-700 text-sm">
                      Tu respuesta:
                    </p>
                    <div className="text-base leading-12">
                      {exercise.sentence.map((segment, idx) => {
                        if (typeof segment === "string") {
                          return (
                            <span key={idx + segment} className="inline">
                              <InlineLaTeX math={segment} />
                              {idx < exercise.sentence.length - 1 && " "}
                            </span>
                          );
                        } else {
                          const blank = segment as Blank;
                          const isCorrect =
                            blank.userResponse?.id === blank.correctOption.id;
                          const hasResponse = blank.userResponse !== undefined;

                          let bgColor =
                            "bg-yellow-50 border-yellow-400 text-yellow-800";
                          if (hasResponse) {
                            bgColor = isCorrect
                              ? "bg-green-50 border-green-400 text-green-800"
                              : "bg-red-50 border-red-400 text-red-800";
                          }

                          return (
                            <span
                              key={`user-${blank.id}`}
                              className={`mx-1 inline-flex h-10 min-w-20 items-center justify-center rounded-2xl border-2 px-3 py-1 font-medium shadow-sm ${bgColor}`}
                            >
                              <InlineLaTeX
                                math={blank.userResponse?.value || "..."}
                              />
                            </span>
                          );
                        }
                      })}
                    </div>
                  </div>

                  {/* Respuesta correcta */}
                  <div className="rounded-md border border-green-200 bg-green-50 p-3">
                    <p className="mb-2 font-medium text-green-700 text-sm">
                      Respuesta correcta:
                    </p>
                    <div className="text-base leading-12">
                      {exercise.sentence.map((segment, idx) => {
                        if (typeof segment === "string") {
                          return (
                            <span key={idx + segment} className="inline">
                              <InlineLaTeX math={segment} />
                              {idx < exercise.sentence.length - 1 && " "}
                            </span>
                          );
                        } else {
                          const blank = segment as Blank;
                          return (
                            <span
                              key={`correct-${blank.id}`}
                              className="mx-1 inline-flex h-10 min-w-20 items-center justify-center rounded-2xl border-2 border-green-400 bg-green-50 px-3 py-1 font-medium text-green-800 shadow-sm"
                            >
                              <InlineLaTeX math={blank.correctOption.value} />
                            </span>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="mt-6 text-center">
        <Button className="gap-2" onClick={init}>
          <RotateCcw className="h-4 w-4" />
          Jugar de nuevo
        </Button>
      </div>

      <div className="mt-8 flex justify-center border-gray-100 border-t pt-6">
        <Link
          href="/"
          className="text-gray-400 text-sm underline transition-colors hover:cursor-pointer hover:text-gray-600"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
