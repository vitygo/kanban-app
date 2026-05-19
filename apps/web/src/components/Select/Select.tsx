import { useState, useRef, useEffect } from 'react'
import styles from './Select.module.css'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export const Select = ({ options, value, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen((p) => !p)}
      >
        {selected?.label ?? 'Select...'}
        <i
          className={`ti ti-chevron-down ${styles.arrow} ${isOpen ? styles.open : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
              {value === option.value && (
                <i className={`ti ti-check ${styles.checkIcon}`} aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}