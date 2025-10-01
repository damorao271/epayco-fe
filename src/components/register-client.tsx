import { registerClientSchema } from '../schemas'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from './input'
import { registerClientForm } from '../utils/forms'
import { registerClient } from '../api/clientApi'

export const ReqisterClient = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerClientSchema()),
    defaultValues: {
      document: '',
      name: '',
      email: '',
      phone: '',
    },
  })

  const applyDiscount = handleSubmit(async (data) => {
    const response = await registerClient(data)

    if (response.status === 201) {
      reset()
      // Paunt message from BE succes or fail
    }
  })

  return (
    <div className="bg-gray-200 p-4 mt-48 rounded-md shadow-md">
      {registerClientForm.map((input) => (
        <Input
          key={input.name}
          label={input.label}
          type={input.type}
          name={input.name}
          register={register}
          errors={errors?.[input.name]?.message}
          placeholder={input.placeholder}
        />
      ))}
      <button className="action-button" onClick={applyDiscount}>
        Registrar Cliente
      </button>
    </div>
  )
}
