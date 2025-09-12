import { ArrowBigRightDashIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  const slug = "jp-donalds"; // ou qualquer slug que você queira navegar

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <h1 className="font-semibold text-sm">
        Olá, clique no botão abaixo para continuar!
      </h1>

      <Button className="mt-3" variant="destructive" asChild>
        <Link href={`/${slug}`}>
          Fazer Pedido
          <ArrowBigRightDashIcon />
        </Link>
      </Button>
    </div>
  );
}

