import React from 'react';

const FormField = ({
  label,
  id,
  type = 'text',
  value = '',
  onChange,
  placeholder,
  error,
  hint,
  checked,
  required,
  ...rest
}) => {
  if (type === 'checkbox') {
    return (
      <div className={`form-field checkbox-field ${error ? 'has-error' : ''}`}>
        <label className="checkbox-wrapper" htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            required={required}
            {...rest}
          />
          <span>{label}</span>
        </label>
        {hint && <span className="field-hint">{hint}</span>}
        {error && <span className="field-error">{error}</span>}
      </div>
    );
  }

  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...rest}
      />
      {hint && <span className="field-hint">{hint}</span>}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

export default FormField;
