import { SelectValue } from "../entities"

export const mapToSelectOptions = <T>(values: T[], keyName: string, ): SelectValue[] => (
  Array.isArray(values) ?
    values.map((value, index) => mapToSelectOption<T>(value, index, keyName)) :
    []
)

export const mapToSelectOption = <T>(value: T, index: number, keyName: string): SelectValue => (
  value && value[keyName] ?
    {
      name: value[keyName],
      value: index,
    } :
    null
)
