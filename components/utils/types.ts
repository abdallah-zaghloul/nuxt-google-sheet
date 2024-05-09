import { DropdownItemArray } from '@youcan/ui-vue3/types'

export interface Field {
  name: string
  required?: boolean
}

export interface Sheet {
  id?: string
  name: string
  products: DropdownItemArray // To be defined once we have products
  fields: Field[]
}

export interface SheetConfigurationProps {
  onSubmit: (sheet: Sheet) => void
  submitLabel?: string
  cancelLabel?: string
  sheet?: Sheet
}
