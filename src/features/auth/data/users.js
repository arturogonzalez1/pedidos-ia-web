export const MOCK_USERS = [
  {
    id: 'usr_01',
    name: 'Ana García',
    email: 'admin@pedidos.com',
    password: 'admin123',
    role: 'Administradora',
  },
]

export function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}
