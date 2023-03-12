export const FORM = document.querySelector('.sign-up__form')

export function getElem(sel) {
  return FORM.querySelector(sel)
}
export function getElemAll(sel) {
  return FORM.querySelectorAll(sel)
}
