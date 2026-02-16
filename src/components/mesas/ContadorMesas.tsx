interface Props {
  numero: number;
  estado: string;
}

export default function ContadorMesas({ numero, estado }: Props) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{estado}</p>
      <p className="mt-2 text-3xl font-black text-slate-900">{numero}</p>
    </article>
  );
}
