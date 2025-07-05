import { v4 as uuidv4 } from "uuid";
import final_lenguajes from "@/data/final_lenguajes.json";
import type { Difficulty } from "../hooks/useTombola";
import { DIFFICULTY_CONFIG } from "../hooks/useTombola";
import type { SentenceComplete } from "../types";

export function loadRandomSentenceComplete(
  difficulty: Difficulty = "medium"
): SentenceComplete {
  const config = DIFFICULTY_CONFIG[difficulty];

  // Filtrar la oración para limitar la cantidad de espacios en blanco según la dificultad
  const filteredSentence = final_lenguajes.sentence.slice();

  // Contar cuántos espacios en blanco hay en total
  const totalBlanks = filteredSentence.filter(
    (segment) => typeof segment !== "string"
  ).length;

  // Si hay más espacios de los permitidos, seleccionar aleatoriamente cuáles mantener
  if (totalBlanks > config.maxBlanks) {
    const blankIndices: number[] = [];
    filteredSentence.forEach((segment, index) => {
      if (typeof segment !== "string") {
        blankIndices.push(index);
      }
    });

    // Seleccionar aleatoriamente qué espacios mantener
    const selectedIndices = blankIndices
      .sort(() => Math.random() - 0.5)
      .slice(0, config.maxBlanks)
      .sort((a, b) => a - b);

    // Convertir los espacios no seleccionados en texto
    blankIndices.forEach((index) => {
      if (!selectedIndices.includes(index)) {
        const segment = filteredSentence[index] as { correct: string };
        filteredSentence[index] = segment.correct;
      }
    });
  }

  const { sentence, options } = filteredSentence.reduce<{
    sentence: SentenceComplete["sentence"];
    options: SentenceComplete["options"];
  }>(
    (acc, segment) => {
      if (typeof segment === "string") {
        acc.sentence.push(segment);
        return acc;
      }

      const gapId = uuidv4();
      const correctId = uuidv4();

      acc.sentence.push({
        id: gapId,
        correctOption: {
          id: correctId,
          value: segment.correct,
        },
      });

      // Limitar la cantidad de distractores según la dificultad
      const maxDistractors = config.maxOptions - 1; // -1 porque la opción correcta siempre está
      const selectedDistractors = segment.distractors
        .sort(() => Math.random() - 0.5) // Mezclar aleatoriamente
        .slice(0, maxDistractors); // Tomar solo los necesarios

      acc.options.push(
        { id: correctId, value: segment.correct },
        ...selectedDistractors.map((d) => ({
          id: uuidv4(),
          value: d,
          selected: false,
        }))
      );

      return acc;
    },
    { sentence: [], options: [] }
  );

  return {
    title: final_lenguajes.title,
    labels: final_lenguajes.labels,
    sentence,
    options: options.sort(() => Math.random() - 0.5),
  };
}
