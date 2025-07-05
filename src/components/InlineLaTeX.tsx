import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface InlineLaTeXProps {
  math: string;
}

export default function InlineLaTeX({ math }: InlineLaTeXProps) {
  const parts = math
    .split(/\$\$(.*?)\$\$/g)
    .flatMap((part) => part.split(/\$(.*?)\$/g));

  return (
    <span className="inline font-latex">
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index + part} className="text-sm">
            <InlineMath math={part} />
          </span>
        ) : (
          <span key={index + part}>{part}</span>
        )
      )}
    </span>
  );
}
