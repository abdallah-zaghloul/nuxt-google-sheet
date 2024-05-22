export default function (array: [] | null, prop: string): any {
  return array?.find(obj => obj?.[prop] !== undefined)?.[prop]
}