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
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <InlineMath key={index + part} math={part} />
        ) : (
          <span key={index + part}>{part}</span>
        )
      )}
    </>
  );
}
