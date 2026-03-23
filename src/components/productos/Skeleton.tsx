export default function Skeleton() {
  return (
    <li className="p-3 rounded-xl border border-slate-100 bg-white animate-pulse flex items-center justify-between">
      <div>
        <div className="h-3.5 bg-slate-100 rounded w-32 mb-2" />
        <div className="h-2.5 bg-slate-100 rounded w-20" />
      </div>
      <div className="text-right">
        <div className="h-4 bg-slate-100 rounded w-14 mb-1" />
        <div className="h-3 bg-slate-100 rounded w-10" />
      </div>
    </li>
  )
}