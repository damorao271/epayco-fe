import * as yup from 'yup'
import { phoneRegex, documentRegex } from '../utils/regex'

export const registerClientSchema = () => {
  return yup.object().shape({
    document: yup
      .string()
      .required('Obligatorio')
      .matches(documentRegex, 'Documento debe tener máximo 8 dígitos'),
    name: yup.string().required('Obligatorio'),
    email: yup.string().email('Email inválido').required('Obligatorio'),
    phone: yup
      .string()
      .required('Obligatorio')
      .matches(phoneRegex, 'Teléfono debe tener 10 dígitos'),
    amount: yup.string().required('Obligatorio'),
  })
}
