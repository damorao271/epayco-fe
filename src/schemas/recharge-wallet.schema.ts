import * as yup from 'yup'
import { phoneRegex, documentRegex } from '../utils/regex'

export const rechargeWalletSchema = () => {
  return yup.object().shape({
    document: yup
      .string()
      .required('Obligatorio')
      .matches(documentRegex, 'Documento debe tener máximo 8 dígitos'),
    phone: yup
      .string()
      .required('Obligatorio')
      .matches(phoneRegex, 'Teléfono debe tener 10 dígitos'),
    amount: yup
      .number()
      .required('Obligatorio')
      .positive('El monto debe ser mayor a 0'),
  })
}
