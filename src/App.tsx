import epaycoLogo from '/logo-blanco.svg'
import './App.css'
import { Input } from './components/input'
import { useForm } from 'react-hook-form'
import { paySchema } from './schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { paymentForm } from './utils/forms'

function App() {
  // Read from environment variables

  // const apiUrl = import.meta.env.VITE_API_URL
  // const key = import.meta.env.VITE_KEY

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paySchema()),
  })

  const applyDiscount = handleSubmit(async (data) => {})

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={epaycoLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div className="card">
        <p></p>
      </div>

      <div className="bg-gray-200 p-4 rounded-md shadow-md">
        {paymentForm.map((input) => (
          <Input
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
    </>
  )
}

export default App
