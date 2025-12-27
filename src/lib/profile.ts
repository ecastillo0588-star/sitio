export const DEFAULT_EDUCATION = 'Universidad del Salvador'

export function getEducation(institution?: string) {
  return institution || DEFAULT_EDUCATION
}
