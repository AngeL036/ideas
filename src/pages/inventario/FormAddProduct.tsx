import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { crearProductoInicial } from '../../api/inventario.api'

// Tipo plano para el formulario (más fácil de manejar en RHF)
interface FormValues {
  marca:       string
  unidad:       string
  codigo?:      string
  categoria_id?: number
  stock_minimo: number
  cantidadActual: number
  motivo?:      string
  precioCompra: number
  precioVenta:  number
}

const inputClass    = 'mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white'
const readonlyClass = 'mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 text-slate-500 outline-none cursor-not-allowed'

export default function FormAddProduct() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: { stock_minimo: 3, cantidadActual: 0, precioCompra: 0, precioVenta: 0 }
  })

  // ✅ watch en lugar de useWatch — evita el error de tipos
  const precioCompra   = watch('precioCompra') ?? 0
  const precioVenta    = watch('precioVenta')  ?? 0
  const cantidadActual = watch('cantidadActual') ?? 0

  const ganancia    = (precioVenta - precioCompra).toFixed(2)
  const valorInv    = (cantidadActual * precioCompra).toFixed(2)
  const estadoStock = cantidadActual <= 0 ? '⚠️ Reponer'
                    : cantidadActual <= 3 ? '🔸 Bajo'
                    : '✅ OK'

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setError(null)
    try {
      // ✅ Transforma el formulario plano a la estructura anidada del backend
      await crearProductoInicial({
        producto: {
          marca:        data.marca,
          unidad:       data.unidad,
          codigo:       data.codigo || null,
          categoria_id: data.categoria_id || null,
          stock_minimo: data.stock_minimo,
        },
        precios: {
          precio_compra: data.precioCompra,
          precio_venta:  data.precioVenta,
        },
        inventario: {
          cantidad: data.cantidadActual,
          motivo:   data.motivo || 'conteo inicial',
        }
      })
      navigate('/inventario')  // ← redirige al listado
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al guardar el producto')
      console.log(err.response?.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-3xl font-black tracking-tight text-slate-900">Agregar Producto</h2>
      <p className="mt-1 text-sm text-slate-600">Completa la información.</p>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

        <div>
          <label className="block text-sm font-medium text-slate-700">Nombre</label>
          <input type="text" {...register('marca', { required: 'El nombre es obligatorio' })}
            className={inputClass} />
          {errors.marca && <p className="mt-1 text-xs text-red-500">{errors.marca.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Código (opcional)</label>
          <input type="text" {...register('codigo')} className={inputClass} placeholder="Ej: COC-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Unidad</label>
          <select {...register('unidad', { required: 'La unidad es obligatoria' })} className={inputClass}>
            <option value="">Selecciona...</option>
            <option value="pieza">Pieza</option>
            <option value="kg">Kilogramo (kg)</option>
            <option value="litro">Litro (lt)</option>
            <option value="caja">Caja</option>
          </select>
          {errors.unidad && <p className="mt-1 text-xs text-red-500">{errors.unidad.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Stock mínimo</label>
          <input type="number" min={0} {...register('stock_minimo', { valueAsNumber: true })}
            className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Cantidad actual</label>
          <input type="number" min={0}
            {...register('cantidadActual', { required: true, valueAsNumber: true })}
            className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Precio de Compra ($)</label>
          <input type="number" min={0} step="0.01"
            {...register('precioCompra', { required: true, valueAsNumber: true })}
            className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Precio de Venta ($)</label>
          <input type="number" min={0} step="0.01"
            {...register('precioVenta', { required: true, valueAsNumber: true })}
            className={inputClass} />
        </div>

        {/* Calculados */}
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

        <button type="submit" disabled={loading}
          className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Guardando...' : 'Guardar producto'}
        </button>

      </form>
    </section>
  )
}