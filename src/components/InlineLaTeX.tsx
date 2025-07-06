import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";

interface InlineLaTeXProps {
  math: string;
  fontSizeLatex?: string; // Optional prop for custom font size
}

export default function InlineLaTeX({
  math,
  fontSizeLatex = "text-sm",
}: InlineLaTeXProps) {
  const parts = math
    .split(/\$\$(.*?)\$\$/g)
    .flatMap((part) => part.split(/\$(.*?)\$/g));

  return (
    <span className="inline font-latex">
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index + part} className={cn(fontSizeLatex)}>
            <InlineMath math={part} />
          </span>
        ) : (
          <span key={index + part}>{part}</span>
        )
      )}
    </span>
  );
}
