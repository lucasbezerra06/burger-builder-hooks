declare global {
  interface Window {
    clarity: (set: string, key: string, value: string) => void; // Substitua `void` pelo tipo de retorno apropriado, se aplicável
  }
}

export {};
