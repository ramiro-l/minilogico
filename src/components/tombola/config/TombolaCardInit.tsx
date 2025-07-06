"use client";

import Link from "next/link";

import { ArrowRight, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useTombola } from "@/lib/tombola/hooks/useTombola";

import TombolaConfig from "./TombolaConfig";

export default function TombolaCardInit({ title }: { title: string }) {
  const { init } = useTombola();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="select-none space-y-3">
        <Link href="/tombola">
          <Button size="lg" className="h-12 w-full" onClick={init}>
            <Zap className="mr-2 h-4 w-4" />
            Empezar Tómbola
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <TombolaConfig />
      </CardContent>
    </Card>
  );
}
