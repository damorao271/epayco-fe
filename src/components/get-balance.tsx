import { useState } from 'react'
import { getBalanceSchema } from '../schemas'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from './input'
import { getBalanceForm } from '../utils/forms'
import { getBalance } from '../api/walletApi'
import { toast } from 'react-toastify'

const GetBalance = () => {
  const [balance, setBalance] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getBalanceSchema()),
    defaultValues: {
      document: '',
      phone: '',
    },
  })

  const applyDiscount = handleSubmit(async (data) => {
    try {
      const response = await getBalance(data)

      if (['200', '201'].includes(response.data.code)) {
        reset()
        toast.success(response?.data?.message)
        setBalance(response?.data?.data?.balance || 0)
      } else {
        toast.error(response?.data?.message || 'Error al registrar cliente')
        setBalance(null)
      }
    } catch (error) {
      const errorMessages = error?.response?.data?.message
      if (Array.isArray(errorMessages)) {
        toast.error(errorMessages.join(', '))
      } else {
        toast.error(
          error?.response?.data?.message || 'Error al registrar cliente'
        )
      }
      return response
    }
  })

  return (
    <div className="bg-gray-200 p-4 mt-48 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Consultar Saldo</h2>

      {getBalanceForm.map((input) => (
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
        Consultar Saldo
      </button>
      {balance >= 0 && balance !== null && (
        <>
          <h1>Su Saldo es: {balance}</h1>
        </>
      )}
    </div>
  )
}
export default GetBalance
