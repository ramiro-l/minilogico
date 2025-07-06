/** biome-ignore-all lint/suspicious/noArrayIndexKey: < "solo para crear, no para el usuario" > */
/** biome-ignore-all lint/a11y/noLabelWithoutControl: < "solo para crear, no para el usuario" > */
"use client";

import { AlertCircle, CheckCircle, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import InlineLaTeX from "@/components/InlineLaTeX";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  AnswerOption,
  ExerciseDefinition,
  SentenceSegment,
} from "../../data/json_types";

// Compilador de texto
function parseText(text: string): {
  segments: SentenceSegment[];
  errors: string[];
} {
  const errors: string[] = [];
  const segments: SentenceSegment[] = [];

  // Regex para encontrar patrones {respuesta|distractor1|distractor2}
  const pattern = /\{([^}]+)\}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  match = pattern.exec(text);
  while (match !== null) {
    // Agregar texto antes del match como string si existe
    const textBefore = text.slice(lastIndex, match.index);
    if (textBefore.trim()) {
      segments.push(textBefore);
    }

    // Parsear el contenido dentro de {}
    const content = match[1];
    const parts = content.split("|").map((part) => part.trim());

    if (parts.length < 1) {
      errors.push(
        `Formato inválido en: {${content}}. Debe tener al menos una respuesta.`
      );
      continue;
    }

    const correct = parts[0];
    const distractors = parts.slice(1).filter((d) => d.length > 0);

    if (!correct) {
      errors.push(`Respuesta correcta vacía en: {${content}}`);
      continue;
    }

    if (distractors.length === 0) {
      errors.push(
        `Sin opciones en: {${content}}. Agregue al menos una separada por |`
      );
    }

    const answerOption: AnswerOption = {
      correct,
      distractors,
    };

    // Agregar la opción como AnswerOption
    segments.push(answerOption);

    lastIndex = pattern.lastIndex;
    match = pattern.exec(text);
  }

  // Agregar texto restante si existe
  const remainingText = text.slice(lastIndex);
  if (remainingText.trim()) {
    segments.push(remainingText);
  }

  // Si no hay segmentos con respuestas válidas pero hay texto, es un error
  const hasAnswerOptions = segments.some(
    (segment) => typeof segment === "object"
  );
  if (!hasAnswerOptions && text.trim()) {
    errors.push(
      "El contenido debe incluir al menos una opción usando el formato {respuesta_correcta|opción_incorrecta}"
    );
  }

  return { segments, errors };
}

export default function CreadorPage() {
  const [labels, setLabels] = useState("");
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Compilar texto en tiempo real y validar
  const parseResult = useMemo(() => {
    if (!textContent.trim()) {
      return { segments: [], errors: [] };
    }
    return parseText(textContent);
  }, [textContent]);

  const { segments, errors: parseErrors } = parseResult;

  // Crear array de errores combinados (validación + parseo)
  const allErrors = useMemo(() => {
    const errors: string[] = [];

    // Validar título
    if (textContent.trim() && !title.trim()) {
      errors.push("El título del ejercicio es obligatorio");
    }

    // Agregar errores de parseo
    errors.push(...parseErrors);

    return errors;
  }, [title, textContent, parseErrors]);

  // Generar JSON para mostrar
  const generatedJSON = useMemo(() => {
    if (segments.length === 0 || !title.trim()) {
      return null;
    }

    if (allErrors.length > 0) {
      return null;
    }

    // Filtrar segmentos que tengan contenido útil
    const validSegments = segments.filter((segment) => {
      if (typeof segment === "string") {
        return segment.trim().length > 0;
      } else {
        return segment.correct.length > 0;
      }
    });

    if (validSegments.length === 0) {
      return null;
    }

    // Convertir labels string a array
    const labelsArray = labels.trim()
      ? labels
          .split(",")
          .map((label) => label.trim())
          .filter(Boolean)
      : ["Item 1"];

    const exerciseDefinition: ExerciseDefinition = {
      labels: labelsArray,
      title,
      sentence: validSegments,
    };

    return JSON.stringify(exerciseDefinition, null, 2);
  }, [labels, title, segments, allErrors]);

  const copyToClipboard = async () => {
    if (!generatedJSON) return;

    try {
      await navigator.clipboard.writeText(generatedJSON);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (_err) {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = generatedJSON;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch {}
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full p-6">
      {/* Header */}
      <div className="mx-auto mb-3 max-w-7xl sm:mb-4">
        <h1 className="text-center font-bold text-gray-900 text-xl sm:text-2xl">
          Editor de Ejercicios
        </h1>
        <p className="mt-1 px-2 text-center text-gray-600 text-xs sm:text-sm">
          Usa{" "}
          <code className="rounded bg-white px-1 py-0.5 text-xs">$...$</code>{" "}
          para LaTeX y{" "}
          <code className="rounded bg-white px-1 py-0.5 text-xs">
            {"{respuesta|distractor1|distractor2}"}
          </code>{" "}
          para opciones
        </p>
      </div>

      {/* Main Layout - Two Columns */}
      <div className="mx-auto grid max-w-7xl gap-3 sm:gap-6 lg:grid-cols-2">
        {/* Left Column - Editor */}
        <div className="space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base">
                Datos del Ejercicio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-medium text-gray-700 text-xs">
                    Etiquetas
                  </label>
                  <input
                    value={labels}
                    onChange={(e) => setLabels(e.target.value)}
                    placeholder="Combo 1, Item 1"
                    className="w-full rounded border border-gray-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block font-medium text-gray-700 text-xs">
                  Título
                </label>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Escribe el título del ejercicio..."
                  className="w-full resize-none rounded border border-gray-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base">
                Contenido del Ejercicio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Dado un alfabeto $\Sigma$, una familia $\Sigma$-indexada será {$G$|$H$|$f$} donde {$\text{Im}_G$|$\text{Dom}_G$} es el conjunto..."
                className="w-full resize-none rounded border border-gray-200 p-3 text-sm focus:border-blue-500 focus:outline-none"
                rows={8}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview & Output */}
        <div className="space-y-3 sm:space-y-4">
          {/* Previsualización */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base">
                Previsualización
              </CardTitle>
            </CardHeader>
            <CardContent>
              {title.trim() && segments.length > 0 ? (
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-1 font-medium text-gray-800 text-xs">
                      Título:
                    </h4>
                    <div className="rounded border bg-white p-2">
                      <InlineLaTeX math={title} />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium text-gray-800 text-xs">
                      Contenido:
                    </h4>
                    <div className="rounded border bg-white p-2">
                      <div className="flex flex-wrap items-center gap-1">
                        {segments.map((segment, index) =>
                          typeof segment === "string" ? (
                            <span key={`text-${index}`}>
                              <InlineLaTeX math={segment} />
                            </span>
                          ) : (
                            <span
                              key={`option-${index}`}
                              className="rounded bg-green-100 px-1.5 py-0.5 font-medium text-green-800 text-xs"
                            >
                              <InlineLaTeX math={segment.correct} />
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded border border-gray-200 bg-gray-50 p-3 text-center text-gray-500 text-xs">
                  Complete el título y contenido para ver la previsualización
                </div>
              )}
            </CardContent>
          </Card>

          {/* Errores */}
          {allErrors.length > 0 && (
            <Card className="border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-red-700 text-sm sm:text-base">
                  <AlertCircle className="h-4 w-4" />
                  Errores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-red-700 text-xs sm:text-sm">
                  {allErrors.map((error: string, index: number) => (
                    <li key={`error-${index}`}>• {error}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* JSON Resultado */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  JSON Resultado
                  {allErrors.length === 0 && generatedJSON && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </CardTitle>
                {generatedJSON && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyToClipboard}
                    className="h-6 gap-1 text-xs sm:h-7"
                  >
                    <Copy className="h-3 w-3" />
                    {copySuccess ? "¡Copiado!" : "Copiar"}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedJSON ? (
                <pre className="overflow-auto rounded border bg-gray-50 p-2 text-xs sm:p-3">
                  <code>{generatedJSON}</code>
                </pre>
              ) : (
                <div className="rounded border border-gray-200 bg-gray-50 p-3 text-center text-gray-500 text-xs sm:text-sm">
                  {allErrors.length > 0
                    ? "Corrija los errores para generar el JSON"
                    : "Complete todos los campos para generar el JSON"}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
