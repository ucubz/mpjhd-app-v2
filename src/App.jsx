import { BrowserRouter as Router } from 'react-router-dom'
import { MPJHDProvider } from './context/MPJHDContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <MPJHDProvider>
      <Router>
        <AppRoutes />
      </Router>
    </MPJHDProvider>
  )
}
