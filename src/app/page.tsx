import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TombolaCardInit from "./tombola/components/config/TombolaCardInit";

export default function Home() {
  return (
    <div>
      <header className="flex w-full items-center justify-center px-6 pt-12 pb-8">
        <Logo />
      </header>
      <div className="flex flex-col items-center justify-center px-6 py-4">
        <div className="mb-16 max-w-sm text-center">
          <p className="text-gray-600 leading-relaxed">
            Practica con <b>ejercicios aleatorios</b> sacados de los{" "}
            <b>combos para los finales</b> de las materias.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <TombolaCardInit title="Lenguajes Formales y Computabilidad" />
          <Proximamente title="Lógica" />
        </div>

        <div className="mt-8 flex w-full justify-center border-gray-100 border-t pt-6">
          <Link href="/creador">
            <button
              type="button"
              className="text-gray-400 text-xs underline transition-colors hover:cursor-pointer hover:text-gray-600"
            >
              Creador de Ejercicios
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Proximamente({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button size="lg" disabled variant="disabled" className="h-12 w-full">
          <Zap className="mr-2 h-4 w-4" />
          Próximamente
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
