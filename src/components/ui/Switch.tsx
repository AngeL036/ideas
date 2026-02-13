interface Props {
  activo: boolean;
  onChange: (value: boolean) => void;
}

export default function Switch({ activo, onChange }: Props) {
  return (
    <button
      onClick={() => onChange(!activo)}
      className={`w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 ${
        activo ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-all duration-300 ${
          activo ? "translate-x-7" : ""
        }`}
      />
    </button>
  );
}
