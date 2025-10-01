import * as yup from 'yup'
import { documentRegex, phoneRegex } from '../utils/regex'

export const getBalanceSchema = () => {
  return yup.object().shape({
    document: yup
      .string()
      .required('Obligatorio')
      .matches(documentRegex, 'Documento debe tener máximo 8 dígitos'),
    phone: yup
      .string()
      .required('Obligatorio')
      .matches(phoneRegex, 'Teléfono debe tener 10 dígitos'),
  })
}
