"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import InlineLaTeX from "@/components/InlineLaTeX";

import type { ExerciseDefinition } from "@/lib/tombola/types/jsonDataFormat";

interface ExerciseOption {
  correct: string;
  distractors: string[];
}

export default function CreadorPage() {
  const [jsonText, setJsonText] = useState(`{
  "labels": ["Combo 1", "Item 1"],
  "title": "Conjunto $\\\\Sigma$-recursivo",
  "sentence": [
    "Un conjunto",
    {
      "correct": "$S$",
      "distractors": ["$T$", "$R$"]
    },
    "es llamado $\\\\Sigma$-recursivo si y sólo si su función característica",
    {
      "correct": "$\\\\chi_{S}^{\\\\omega \\\\times  \\\\Sigma^*}$",
      "distractors": ["$\\\\rho_{S}$", "$f_{S}$"]
    },
    "es",
    {
      "correct": "$\\\\Sigma$-recursiva",
      "distractors": ["$\\\\omega$-recursiva", "$\\\\Sigma$-mixta"]
    },
    "."
  ]
}`);

  const [copySuccess, setCopySuccess] = useState(false);

  // Parse JSON safely
  const getParsedData = (): ExerciseDefinition | null => {
    try {
      return JSON.parse(jsonText);
    } catch {
      return null;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = jsonText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const data = getParsedData();

  const isSmallScreen = useIsSmallScreen();
  if (isSmallScreen) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <p className="text-balance text-center text-gray-500">
          Esta herramienta no está disponible en pantallas pequeñas.
        </p>
        <Link href="/">
          <Button className="mt-4" size="sm" variant="outline">Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full bg-white">
      <div className="flex h-screen">
        {/* Editor Panel */}
        <div className="w-1/2 border-r bg-white">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="h-16 border-b p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">Editor JSON</h2>
                <Button
                  onClick={copyToClipboard}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copySuccess ? "¡Copiado!" : "Copiar JSON"}
                </Button>
              </div>
            </div>

            {/* Editor */}
            <div className="flex-1 p-4">
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="h-full w-full resize-none rounded border border-gray-200 bg-gray-50 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder='{\n  "labels": ["Ejemplo"],\n  "title": "Título con $\\\\LaTeX$",\n  "sentence": [\n    "Texto",\n    {"correct": "opción", "distractors": ["dist1"]}\n  ]\n}'
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 bg-white">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="h-16 border-b p-4">
              <h2 className="font-bold text-lg">Vista Previa</h2>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto p-4">
              {data ? (
                <div className="space-y-4">
                  {/* Title like in the real exercise */}
                  <p className="mb-4 font-bold text-xl">
                    <InlineLaTeX
                      math={data.title}
                      fontSizeLatex="text-normal"
                    />
                  </p>

                  {/* Labels like in the real exercise */}
                  <div className="-mt-3 flex w-full justify-between">
                    <p className="text-black/70 text-xs">
                      {data.labels.map((label) => (
                        <span
                          key={`label-${label}`}
                          className="mr-2 inline-flex items-center rounded-md bg-gray-200 px-2 font-medium"
                        >
                          {label}
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* Exercise content like in the real exercise */}
                  <div className="">
                    {data.sentence.map((segment, idx) => {
                      return typeof segment === "string" ? (
                        <span key={idx + segment} className="inline">
                          <InlineLaTeX math={segment} />
                          {idx < data.sentence.length - 1 && " "}
                        </span>
                      ) : (
                        <span
                          key={`option-${idx}-${segment.correct}`}
                          className="inline"
                        >
                          <span className=" inline-flex items-center justify-center rounded-md border-2 border-gray-200 bg-gray-50 px-1 font-medium ">
                            <InlineLaTeX math={segment.correct} />
                          </span>
                          {idx < data.sentence.length - 1 && " "}
                        </span>
                      );
                    })}
                  </div>

                  {/* Options analysis */}
                  <Card className="mt-6 p-4">
                    <h3 className="mb-3 font-bold text-lg">
                      Análisis de opciones
                    </h3>
                    <div className="space-y-3">
                      {data.sentence
                        .filter((s) => typeof s !== "string")
                        .map((option, index) => {
                          const opt = option as ExerciseOption;
                          return (
                            <div
                              key={`analysis-${index}-${opt.correct}`}
                              className="rounded border bg-gray-50 p-3"
                            >
                              <div className="mb-2 font-medium text-gray-800 text-sm">
                                Espacio #{index + 1}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <span className="mx-1 inline-flex h-10 min-w-20 items-center justify-center rounded-2xl border-2 border-green-400 bg-green-50 px-3 py-1 font-medium text-green-800 shadow-sm">
                                  <InlineLaTeX math={opt.correct} />
                                </span>
                                {opt.distractors.map(
                                  (dist: string, i: number) => (
                                    <span
                                      key={`dist-${opt.correct}-${dist}-${i}`}
                                      className="mx-1 inline-flex h-10 min-w-20 items-center justify-center rounded-2xl border-2 border-red-400 bg-red-50 px-3 py-1 font-medium text-red-800 shadow-sm"
                                    >
                                      <InlineLaTeX math={dist} />
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="mb-2 text-4xl">⚠️</div>
                    <p className="font-medium">Error en el JSON</p>
                    <p className="text-gray-600 text-sm">
                      Revisa la sintaxis en el editor
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function useIsSmallScreen(breakpoint = 768) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    function checkScreen() {
      setIsSmall(window.innerWidth < breakpoint);
    }

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isSmall;
}
