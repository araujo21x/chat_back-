export default function plateIsValid(plate: string): boolean {
  plate = plate.replace(/[\s-]*/gim, '');

  const plateRegex = /^[a-zA-Z]{3}[0-9]{4}$/;
  const mercoSulPlateRegex = /^[a-zA-Z]{3}[0-9][0-9a-zA-Z][0-9]{2}$/;

  if (plateRegex.test(plate)) return true;
  if (mercoSulPlateRegex.test(plate)) return true;

  return false;
}
