import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-4">
        {/* Hero Section */}
        <div className="mb-16 max-w-sm text-center">
          <p className="text-gray-600 leading-relaxed">
            Practica con <b>ejercicios aleatorios</b> sacados de los{" "}
            <b>combos para los finales</b> de las materias.
          </p>
        </div>

        {/* Subject Cards */}
        <div className="w-full max-w-sm space-y-4">
          {/* Lenguajes Formales Card */}
          <Card>
            <CardHeader>
              <CardTitle>Lenguajes Formales y Computabilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="h-12 w-full">
                <Zap className="mr-2 h-4 w-4" />
                Empezar Tómbola
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Lógica Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-400">Lógica</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                disabled
                variant="disabled"
                className="h-12 w-full"
              >
                <Zap className="mr-2 h-4 w-4" />
                Próximamente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Creador de Ejercicios */}
          <div className="mt-8 flex justify-center border-gray-100 border-t pt-6">
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
      </main>
    </div>
  );
}
