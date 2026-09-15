import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const noSoloEspaciosValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const valor = control.value;

  if (typeof valor !== 'string' || valor.length === 0) {
    return null;
  }

  return valor.trim().length === 0 ? { soloEspacios: true } : null;
};
