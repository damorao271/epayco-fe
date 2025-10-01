import epaycoLogo from '/logo-blanco.svg'
import './App.css'
import { Input } from './components/input'
import { useForm } from 'react-hook-form'
import { paySchema } from './schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { paymentForm } from './utils/forms'
import { useState } from 'react'

const ACTIONS = {
  REGISTRAR_CLIENTE: 'Registrar Cliente',
  RECARGAR_MONEDERO: 'Recargar Billetera',
  OBTENER_BALANCE: 'Obtener Balance',
  REALIZAR_PAGO: 'Realizar Pago',
}

const options = Object.values(ACTIONS)

function Header({
  selected,
  setSelected,
}: {
  selected: string
  setSelected: (s: string) => void
}) {
  return (
    <header className="bg-blue-900 text-white p-4 flex gap-4 items-center shadow">
      <img src={epaycoLogo} alt="epayco Logo" className="h-8 mr-24" />

      <nav className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            className={`px-4 py-2 rounded transition font-medium ${
              selected === opt
                ? 'bg-white text-blue-900 shadow'
                : 'hover:bg-blue-800'
            }`}
            onClick={() => setSelected(opt)}
          >
            {opt}
          </button>
        ))}
      </nav>
    </header>
  )
}

function RegisterSection() {
  return <div className="p-8">Register Client Section</div>
}
function RechargeSection() {
  return <div className="p-8">Recharge Wallet Section</div>
}
function BalanceSection() {
  return <div className="p-8">Get Balance Section</div>
}
function PaymentSection() {
  return <div className="p-8">Payment Section</div>
  // You can move your payment form here later
  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md">
      {paymentForm.map((input) => (
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
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={applyDiscount}
      >
        Submit
      </button>
    </div>
  )
}

function App() {
  const [selected, setSelected] = useState('Register Client')
  // Payment form logic (move to PaymentSection if needed)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paySchema()),
  })
  const applyDiscount = handleSubmit(async (data) => {})

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Header selected={selected} setSelected={setSelected} />
      <main>
        {selected === ACTIONS.REGISTRAR_CLIENTE && <RegisterSection />}
        {selected === ACTIONS.RECARGAR_MONEDERO && <RechargeSection />}
        {selected === ACTIONS.OBTENER_BALANCE && <BalanceSection />}
        {selected === ACTIONS.REALIZAR_PAGO && <PaymentSection />}
      </main>
    </div>
  )
}

export default App
