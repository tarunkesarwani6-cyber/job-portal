import { AlertCircle } from "lucide-react";

const TextareaField = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  rows = 6,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <textarea
  id={id}
  value={value}
  onChange={onChange}
  disabled={disabled}
  rows={rows}
  placeholder={placeholder}
  style={{ minHeight: "150px" }}
        className={`w-full px-3 py-2.5 border rounded-lg text-base transition-colors duration-200 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        } focus:outline-none focus:ring-2 focus:ring-opacity-20`}
      />

      {helperText && (
        <p className="text-xs text-gray-500">
          {helperText}
        </p>
      )}

      {error && (
        <div className="flex items-center gap-1 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default TextareaField;