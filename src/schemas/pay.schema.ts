import * as yup from 'yup'

export const paySchema = () => {
  return yup.object().shape({
    document: yup.string().required('Obligatorio'),
    // phone: yup.string().required('Obligatorio'),
    // amount: yup.string(),
  })
}
