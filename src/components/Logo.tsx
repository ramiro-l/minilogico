import Link from "next/link";

import { Brain } from "lucide-react";

export default function Logo() {
  return (
    <Link className="px-5 py-1" href="/">
      <div className="flex items-center space-x-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black shadow-sm">
          <Brain className="h-7 w-7 text-white" />
        </div>
        <span className="font-bold text-2xl text-black tracking-tight">
          Mini Lógico
        </span>
      </div>
    </Link>
  );
}
