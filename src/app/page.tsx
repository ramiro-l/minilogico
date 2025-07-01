import { ArrowRight, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 pt-12 pb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black shadow-sm">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <span className="font-bold text-2xl text-black tracking-tight">
              Mini Lógico
            </span>
          </div>
        </div>
      </header>

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
        </div>
      </main>
    </div>
  );
}
