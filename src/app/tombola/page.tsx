import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

type Choice = {
  id: string;
  text: string;
};

type Question = {
  id: string;
  prompt: string;
  choices: Choice[];
  correctChoiceId: string;
};

const quiz: Question[] = [
  {
    id: "q1",
    prompt: "Cual es el resultado",
    choices: [
      { id: "a", text: "\\frac{1}{2}" },
      { id: "b", text: "1" },
      { id: "c", text: "0" },
    ],
    correctChoiceId: "a",
  },
];

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl">Quiz Matemático</h1>

      {quiz.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold">
            <InlineMath math={q.prompt} />
          </p>

          {q.choices.map((c) => (
            <label key={c.id} className="block">
              <input type="radio" name={q.id} value={c.id} className="mr-2" />
              <InlineMath math={c.text} />
            </label>
          ))}
        </div>
      ))}
    </main>
  );
}
