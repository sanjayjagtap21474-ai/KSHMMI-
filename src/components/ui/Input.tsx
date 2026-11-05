import React from 'react';
import styles from './Input.module.css';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helper?: string;
  size?: 'small' | 'medium' | 'large';
  vintage?: boolean;
  handwritten?: boolean;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  size = 'medium',
  vintage = false,
  handwritten = false,
  required = false,
  className = '',
  ...props
}) => {
  const inputClasses = [
    styles.input,
    styles[size],
    vintage && styles.vintage,
    handwritten && styles.handwritten,
    error && styles.error,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={`${styles.label} ${required ? styles.required : ''}`}>
          {label}
        </label>
      )}
      <input className={inputClasses} {...props} />
      {error && <p className={styles.error}>{error}</p>}
      {helper && !error && <p className={styles.helper}>{helper}</p>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  size?: 'small' | 'medium' | 'large';
  vintage?: boolean;
  required?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helper,
  size = 'medium',
  vintage = false,
  required = false,
  className = '',
  ...props
}) => {
  const textareaClasses = [
    styles.input,
    styles.textarea,
    styles[size],
    vintage && styles.vintage,
    error && styles.error,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={`${styles.label} ${required ? styles.required : ''}`}>
          {label}
        </label>
      )}
      <textarea className={textareaClasses} {...props} />
      {error && <p className={styles.error}>{error}</p>}
      {helper && !error && <p className={styles.helper}>{helper}</p>}
    </div>
  );
};

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helper?: string;
  size?: 'small' | 'medium' | 'large';
  vintage?: boolean;
  required?: boolean;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helper,
  size = 'medium',
  vintage = false,
  required = false,
  options,
  className = '',
  ...props
}) => {
  const selectClasses = [
    styles.input,
    styles.select,
    styles[size],
    vintage && styles.vintage,
    error && styles.error,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={`${styles.label} ${required ? styles.required : ''}`}>
          {label}
        </label>
      )}
      <select className={selectClasses} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className={styles.error}>{error}</p>}
      {helper && !error && <p className={styles.helper}>{helper}</p>}
    </div>
  );
};

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <div className={styles.wrapper}>
      <input type="checkbox" className={`${styles.input} ${styles.checkbox}`} {...props} />
      {label && <label className={styles.checkboxLabel}>{label}</label>}
    </div>
  );
};

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio: React.FC<RadioProps> = ({ label, className = '', ...props }) => {
  return (
    <div className={styles.wrapper}>
      <input type="radio" className={`${styles.input} ${styles.radio}`} {...props} />
      {label && <label className={styles.radioLabel}>{label}</label>}
    </div>
  );
};
