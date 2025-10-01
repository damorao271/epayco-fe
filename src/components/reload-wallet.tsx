import { rechargeWalletSchema } from '../schemas'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from './input'
import { rechargeWalletForm } from '../utils/forms'
import { rechargeWallet } from '../api/walletApi'
import { toast } from 'react-toastify'

const ReloadWallet = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(rechargeWalletSchema()),
    defaultValues: {
      document: import.meta.env.VITE_DOCUMENT || '',
      phone: import.meta.env.VITE_PHONE || '',
      amount: 0,
    },
  })

  const reloadWallet = handleSubmit(async (data) => {
    try {
      const response = await rechargeWallet(data)
      if (['200', '201'].includes(response.data.code)) {
        reset()
        toast.success(response?.data?.message)
      } else {
        toast.error(response?.data?.message || 'Error al recargar billetera')
      }
    } catch (error) {
      const errorMessages = error?.response?.data?.message
      if (Array.isArray(errorMessages)) {
        toast.error(errorMessages.join(', '))
      } else {
        toast.error(
          error?.response?.data?.message || 'Error al recargar billetera'
        )
      }
    }
  })

  return (
    <div className="bg-gray-200 p-4 mt-48 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Recargar Billetere</h2>

      {rechargeWalletForm.map((input) => (
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
      <button className="action-button" onClick={reloadWallet}>
        Recargar Billetera
      </button>
    </div>
  )
}
export default ReloadWallet
