"use client";

import { useEffect, useId, useRef, useState } from "react";
import { getSkillsBusinessOptions } from "./get-skills-business-data";
import type { SkillsBusinessId } from "./skills-business-types";

type SkillsBusinessSelectProps = {
  value: SkillsBusinessId;
  onChange: (nextValue: string) => void;
};

export function SkillsBusinessSelect({ value, onChange }: SkillsBusinessSelectProps) {
  const fieldId = useId();
  const listId = `${fieldId}-list`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const options = getSkillsBusinessOptions();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (wrapRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const choose = (nextValue: SkillsBusinessId, disabled: boolean) => {
    if (disabled) return;
    onChange(nextValue);
    setOpen(false);
  };

  return (
    <div className="skills-business-field">
      <span className="skills-business-label" id={fieldId}>
        What Defines Your Business?
      </span>

      <div ref={wrapRef} className="skills-business-combobox-wrap">
        <button
          type="button"
          aria-controls={listId}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-labelledby={fieldId}
          className="skills-business-combobox skills-business-combobox--trigger"
          onClick={() => setOpen((current) => !current)}
        >
          {selected.label}
        </button>

        <span aria-hidden="true" className="skills-business-chevron">
          ▾
        </span>

        {open ? (
          <ul
            className="skills-business-combobox-list"
            id={listId}
            role="listbox"
            aria-labelledby={fieldId}
          >
            {options.map((option) => (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-disabled={option.disabled}
                  aria-selected={option.value === value}
                  className={`skills-business-combobox-option${
                    option.disabled ? " skills-business-combobox-option--disabled" : ""
                  }${option.value === value ? " skills-business-combobox-option--selected" : ""}`}
                  disabled={option.disabled}
                  onClick={() => choose(option.value, option.disabled)}
                >
                  <span className="skills-business-combobox-option-label">{option.label}</span>
                  {option.disabled ? (
                    <span className="skills-business-coming-soon">(Coming Soon...)</span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
