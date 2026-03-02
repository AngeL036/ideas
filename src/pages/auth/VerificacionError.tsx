export default function VerificacionError() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-red-600">
        Enlace inválido o expirado
      </h1>
      <p className="mt-4">
        Solicita un nuevo correo de verificación.
      </p>
    </div>
  );
}