import { useState } from 'react'
import { ACTIONS } from './utils/options'
import {
  ReqisterClient,
  ReloadWallet,
  GetBalance,
  PaymentForm,
} from './components'
import Header from './components/header'
import './App.css'

function App() {
  const [selected, setSelected] = useState(ACTIONS.REGISTRAR_CLIENTE)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Header selected={selected} setSelected={setSelected} />
      {selected === ACTIONS.REGISTRAR_CLIENTE && <ReqisterClient />}
      {selected === ACTIONS.RECARGAR_MONEDERO && <ReloadWallet />}
      {selected === ACTIONS.OBTENER_BALANCE && <GetBalance />}
      {selected === ACTIONS.REALIZAR_PAGO && <PaymentForm />}
    </div>
  )
}

export default App
