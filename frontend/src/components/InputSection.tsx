import React from 'react';
import { AiOutlineQuestionCircle } from '@react-icons/all-files/ai/AiOutlineQuestionCircle';
import styles from './InputSection.module.css';

interface InputSectionProps {
  inputValue: string;
  limitValue: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onLimitChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  error: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputValue,
  limitValue,
  onInputChange,
  onKeyDown,
  onLimitChange,
  onFocus,
  error,
}) => {
  return (
    <section className={styles.inputSectionContainer}>
      <div className={styles.inputContainer}>
        <label className={styles.labelContainer} htmlFor="search">
          Search:
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          placeholder="Search for textures..."
          className={`${styles.inputField} ${
            error ? styles.disabledInput : ''
          }`}
          id="search"
          autoComplete="off"
          disabled={error}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="limit">Limit:</label>
          <span className={styles.icon}>
            <AiOutlineQuestionCircle />
            <span className={styles.tooltipText}>
              Set the number of suggestions (1-5)
            </span>
          </span>
        </div>
        <input
          type="number"
          value={limitValue}
          onChange={onLimitChange}
          min="1"
          max="5"
          className={`${styles.inputField} ${error ? styles.error : ''}`}
          id="limit"
        />
      </div>
    </section>
  );
};

export default InputSection;
