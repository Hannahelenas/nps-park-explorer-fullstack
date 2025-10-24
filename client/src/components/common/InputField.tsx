interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  errorMessage?: string;
  autoComplete?: string;
}

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  errorMessage,
  autoComplete,
}: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-md font-bold mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={errorMessage ? `${id}-error` : undefined}
        className="appearance-none border rounded w-full py-3 px-3 
          text-gray-700 leading-tight focus:outline-none focus:ring-2 
          focus:ring-[var(--color-primary)]"
      />
      {errorMessage && (
        <p id={`${id}-error`} className="text-gray-900 text-sm mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
