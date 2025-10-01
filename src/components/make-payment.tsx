import { useState } from 'react'
import { paySchema, confirmPaymentSchema } from '../schemas'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from './input'
import { paymentForm, confirmPaymentForm } from '../utils/forms'
import { startPayment, confirmPayment } from '../api/paymentApi'
import { toast } from 'react-toastify'

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paySchema()),
    defaultValues: {
      document: '',
      phone: '',
      amount: 0,
    },
  })

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(confirmPaymentSchema()),
    defaultValues: {
      token: '',
    },
  })

  const [sessionId, setSessionId] = useState('')

  const reloadWallet = handleSubmit(async (data) => {
    data.amount = parseFloat(data.amount)

    try {
      const response = await startPayment(data)
      if (['200', '201'].includes(response.data.code)) {
        reset()
        toast.success(response?.data?.message)
        setSessionId(response?.data?.data?.sessionId)
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

  const confirmPaymentAction = handleSubmit2(async (data) => {
    console.log('data:', data)

    const payload = {
      sessionId,
      token: data.token,
    }
    console.log('payload:', payload)

    try {
      const response = await confirmPayment(payload)
      console.log('response:', response)
      if (['200', '201'].includes(response.data.code)) {
        reset()
        reset2()
        toast.success(response?.data?.message)
        setSessionId('')
      } else {
        toast.error(
          response?.data?.message + response?.data?.data + '$' ||
            'Error al recargar billetera'
        )
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
      <h2 className="text-2xl font-semibold mb-4">
        {sessionId ? 'Confirmar Pago' : 'Realizar Pago'}
      </h2>

      {!sessionId &&
        paymentForm.map((input) => (
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

      {sessionId &&
        confirmPaymentForm.map((input) => (
          <Input
            key={input.name}
            label={input.label}
            type={input.type}
            name={input.name}
            register={register2}
            errors={errors2?.[input.name]?.message}
            placeholder={input.placeholder}
          />
        ))}

      {!sessionId ? (
        <button className="action-button" onClick={reloadWallet}>
          Realizar Pago
        </button>
      ) : (
        <button className="action-button" onClick={confirmPaymentAction}>
          Confirmar Pago
        </button>
      )}
    </div>
  )
}
export default PaymentForm
