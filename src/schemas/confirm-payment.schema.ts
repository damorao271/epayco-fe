import * as yup from 'yup'

export const confirmPaymentSchema = () => {
  return yup.object().shape({
    // sessionId: yup.string().required('Obligatorio'),
    token: yup.string().required('Obligatorio'),
  })
}
