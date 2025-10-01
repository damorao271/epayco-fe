import { optionsActions } from '../utils/options'
import epaycoLogo from '/logo-blanco.svg'
import './header.scss'

function Header({
  setSelected,
}: {
  selected: string
  setSelected: (s: string) => void
}) {
  return (
    <div className="header">
      <img src={epaycoLogo} alt="epayco Logo" className="h-8 mr-24" />

      <nav className="flex gap-2">
        {optionsActions.map((opt) => (
          <div className="option" key={opt} onClick={() => setSelected(opt)}>
            {opt}
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Header
