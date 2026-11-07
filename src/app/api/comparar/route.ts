import { compararInstalacoes } from "@/lib/compararInstalacoes";
import {objeto,validarClientes,validarInstalacoes,validarCusto} from "@/lib/validar";
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!objeto(body)) throw new Error("Corpo da requisição inválido.");
    validarClientes(body.clientes);
    validarInstalacoes(body.instalacoes);
    validarCusto(body.custoTransporteUnitario);
    return Response.json(compararInstalacoes(body.clientes,body.instalacoes,body.custoTransporteUnitario));
  } catch(e) {
    return Response.json({erro:e instanceof SyntaxError ? "JSON inválido." : e instanceof Error ? e.message : "Erro inesperado."},{status:400});
  }
}
