import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Icon, Input } from '@/components/ui'
import { DEMO_CREDENTIALS } from '@/config/app'
import { useAuth } from '@/features/auth/context/AuthContext'
import styles from './LoginForm.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email)
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  function validate() {
    const next = {}
    if (!email.trim()) next.email = 'El correo es obligatorio'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Correo no válido'
    if (!password) next.password = 'La contraseña es obligatoria'
    else if (password.length < 6) next.password = 'Mínimo 6 caracteres'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError('')
    if (!validate()) return

    setLoading(true)
    try {
      await login(email.trim(), password)
      const to = location.state?.from?.pathname || '/dashboard'
      navigate(to, { replace: true })
    } catch (error) {
      setFormError(error.message || 'No se pudo iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        id="email"
        label="Correo"
        type="email"
        autoComplete="username"
        placeholder="tu@restaurante.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={errors.email}
        icon={<Icon name="mail" size={16} />}
      />
      <Input
        id="password"
        label="Contraseña"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={errors.password}
        icon={<Icon name="lock" size={16} />}
        suffix={
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            <Icon name={showPassword ? 'eyeOff' : 'eye'} size={16} />
          </Button>
        }
      />

      {formError ? (
        <p className={styles.formError} role="alert">
          <Icon name="alert" size={16} />
          {formError}
        </p>
      ) : null}

      <Button type="submit" block size="lg" loading={loading}>
        Entrar
      </Button>
    </form>
  )
}
