import { useForm, useWatch } from 'react-hook-form'
import { InventarioPayload } from '../../types/Inventario'

const inputClass = 'mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white'
const readonlyClass = 'mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 text-slate-500 outline-none cursor-not-allowed'

export default function FormAddProduct() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<InventarioPayload>()

  const precioCompra = useWatch({ control, name: 'precioCompra', defaultValue: 0 })
  const precioVenta  = useWatch({ control, name: 'precioVenta',  defaultValue: 0 })
  const cantidad     = useWatch({ control, name: 'cantidadActual', defaultValue: 0 })

  const ganancia      = (precioVenta - precioCompra).toFixed(2)
  const valorInv      = (cantidad * precioCompra).toFixed(2)
  const estadoStock   = cantidad <= 3 ? '⚠️ Reponer' : cantidad <= 8 ? '🔸 Bajo' : '✅ OK'

  const onSubmit = (data: InventarioPayload) => {
    console.log({ ...data, ganancia, valorInv, estadoStock })
    // aquí llamas tu API / contexto
  }

  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-3xl font-black tracking-tight text-slate-900">Agregar Producto</h2>
      <p className="mt-1 text-sm text-slate-600">Completa la información.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Nombre</label>
          <input type="text" {...register('nombre', { required: 'El nombre es obligatorio' })}
            className={inputClass} />
          {errors.nombre && <p className="mt-1 text-xs text-red-500">{errors.nombre.message}</p>}
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Categoría</label>
          <input type="text" {...register('categoria', { required: 'La categoría es obligatoria' })}
            className={inputClass} />
          {errors.categoria && <p className="mt-1 text-xs text-red-500">{errors.categoria.message}</p>}
        </div>

        {/* Unidad — select, no number */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Unidad</label>
          <select {...register('unidad', { required: 'La unidad es obligatoria' })}
            className={inputClass}>
            <option value="">Selecciona...</option>
            <option value="pieza">Pieza</option>
            <option value="kg">Kilogramo (kg)</option>
            <option value="litro">Litro (lt)</option>
            <option value="caja">Caja</option>
          </select>
          {errors.unidad && <p className="mt-1 text-xs text-red-500">{errors.unidad.message}</p>}
        </div>

        {/* Cantidad */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Cantidad Actual</label>
          <input type="number" min={0} {...register('cantidadActual', { required: true, valueAsNumber: true })}
            className={inputClass} />
        </div>

        {/* Precio compra */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Precio de Compra ($)</label>
          <input type="number" min={0} step="0.01" {...register('precioCompra', { required: true, valueAsNumber: true })}
            className={inputClass} />
        </div>

        {/* Precio venta */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Precio de Venta ($)</label>
          <input type="number" min={0} step="0.01" {...register('precioVenta', { required: true, valueAsNumber: true })}
            className={inputClass} />
        </div>

        {/* Calculados — solo lectura */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Calculado automáticamente</p>

          <div>
            <label className="block text-sm font-medium text-slate-700">Ganancia por unidad</label>
            <input readOnly value={`$${ganancia}`} className={readonlyClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Valor en inventario</label>
            <input readOnly value={`$${valorInv}`} className={readonlyClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Estado en stock</label>
            <input readOnly value={estadoStock} className={readonlyClass} />
          </div>
        </div>

        <button type="submit"
          className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
          Guardar producto
        </button>

      </form>
    </section>
  )
}