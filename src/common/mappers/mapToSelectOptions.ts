import { SelectValue } from "../../model/entities"

export const mapToSelectOptions = <T>(values: T[], keyName: string, ): SelectValue[] => (
  Array.isArray(values) ?
    values.map((value, index) => mapToSelectOption(value, index, keyName)) :
    []
)

export const mapToSelectOption = <T>(value: T, index: number, keyName: string): SelectValue => (
  value ?
    {
      name: value[keyName],
      value: index,
    } :
    null
)
