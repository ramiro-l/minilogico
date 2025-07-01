"use client";

import { AlertCircle, CheckCircle, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  AnswerOption,
  FillInSegment,
  FillInTheBlankDefinition,
} from "@/types";

// Compilador de texto
function parseText(text: string): {
  segments: FillInSegment[];
  errors: string[];
} {
  const errors: string[] = [];
  const segments: FillInSegment[] = [];

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
  const [prompt, setPrompt] = useState("");
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
    if (textContent.trim() && !prompt.trim()) {
      errors.push("El título del ejercicio es obligatorio");
    }

    // Agregar errores de parseo
    errors.push(...parseErrors);

    return errors;
  }, [prompt, textContent, parseErrors]);

  // Generar JSON para mostrar
  const generatedJSON = useMemo(() => {
    if (segments.length === 0 || !prompt.trim()) {
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

    const fillInDefinition: FillInTheBlankDefinition = {
      prompt,
      segments: validSegments,
    };

    return JSON.stringify(fillInDefinition, null, 2);
  }, [prompt, segments, allErrors]);

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
    <div>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-4">
        {/* Title Section */}
        <div className="mb-1 max-w-sm text-center">
          <h1 className="mb-2 font-bold text-black text-xl">
            Editor de Ejercicios
          </h1>
        </div>

        <div className="mb-6 w-full max-w-lg rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
          <h3 className="mb-3 font-semibold text-gray-800">
            ¿Cómo usar el editor?
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
              <span>Escribe texto normal.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
              <span>
                Usa{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">
                  $ ... $
                </code>{" "}
                para LaTeX.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
              <div>
                <span>
                  Para agregar opciones{" "}
                  <b className="font-medium text-gray-800 text-xs">
                    (solo en el contenido)
                  </b>
                  :
                </span>
                <div className="mt-1">
                  <code className="rounded bg-white px-2 py-1 font-mono text-xs">
                    {
                      "{respuesta_correcta|opción_incorrecta1|opción_incorrecta2}"
                    }
                  </code>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Editor Cards */}
        <div className="w-full max-w-lg space-y-4">
          {/* Instrucciones Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Enunciado</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Escribe las enunciado..."
                className="w-full resize-none rounded border border-gray-200 p-3 text-sm focus:border-blue-500 focus:outline-none"
                rows={2}
              />
            </CardContent>
          </Card>

          {/* Editor de Contenido */}
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Contenido</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-3">
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Ejemplo: La capital de Argentina es {Buenos Aires|Córdoba|Rosario} y tiene más de {3|2|4|5} millones de habitantes."
                  className="w-full resize-none rounded border border-gray-200 p-3 text-sm focus:border-blue-500 focus:outline-none"
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>

          {/* JSON Generado */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>JSON Generado</CardTitle>
                {allErrors.length === 0 && generatedJSON ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : !textContent.trim() && !generatedJSON ? (
                  <AlertCircle className="h-4 w-4 text-gray-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
              {allErrors.length > 0 && (
                <div className="rounded border border-red-200 bg-red-50 p-3">
                  <p className="mb-2 font-medium text-red-800 text-sm">
                    Errores encontrados:
                  </p>
                  <ul className="space-y-1 text-red-700 text-sm">
                    {allErrors.map((error: string, index: number) => (
                      <li key={`error-${index}-${error.slice(0, 10)}`}>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {generatedJSON && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700 text-sm">
                      Resultado:
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyToClipboard}
                      className="h-8 gap-1 text-xs"
                    >
                      <Copy className="h-3 w-3" />
                      {copySuccess ? "¡Copiado!" : "Copiar"}
                    </Button>
                  </div>
                  <pre className="overflow-auto rounded border border-gray-200 bg-gray-50 p-3 text-xs leading-relaxed">
                    <code>{generatedJSON}</code>
                  </pre>
                </div>
              )}
              {!textContent.trim() && !generatedJSON && (
                <div className="rounded border border-gray-200 bg-gray-50 p-3 text-gray-800 text-sm">
                  Complete tanto el enunciado como el contenido.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
