export function lerLocal<T>(chave: string): T[] {
  try {
    const valor = localStorage.getItem(chave);
    const parsed: unknown = valor ? JSON.parse(valor) : [];
    return Array.isArray(parsed) ? parsed as T[] : [];
  } catch { return []; }
}
export function salvarLocal<T>(chave: string, dados: T[]): void {
  try { localStorage.setItem(chave,JSON.stringify(dados)); } catch { /* navegador pode bloquear armazenamento */ }
}
