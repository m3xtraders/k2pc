import React from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  hint,
  required,
  children,
}) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-stone-800">
        {label} {required && <span className="text-[#BE2320]">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-stone-500">{hint}</p>}
      {error && <p className="text-xs text-[#BE2320] font-medium">{error}</p>}
    </div>
  );
};
