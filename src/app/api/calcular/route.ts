import { calcularCentroGravidade } from "@/lib/centroGravidade";
import {objeto,validarClientes} from "@/lib/validar";
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!objeto(body)) throw new Error("Corpo da requisição inválido.");
    validarClientes(body.clientes);
    return Response.json(calcularCentroGravidade(body.clientes));
  } catch (e) {
    return Response.json({erro:e instanceof SyntaxError ? "JSON inválido." : e instanceof Error ? e.message : "Erro inesperado."},{status:400});
  }
}
