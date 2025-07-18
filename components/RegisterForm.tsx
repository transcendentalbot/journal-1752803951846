'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/toast'

export default function RegisterForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })

      if (response.ok) {
        toast({
          title: 'Registration successful!',
          description: 'You can now log in with your new account.',
        })
        router.push('/login')
      } else {
        const error = await response.json()
        toast({
          variant: 'destructive',
          title: 'Registration failed',
          description: error.message,
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: 'An unexpected error occurred. Please try again later.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Register</Button>
    </form>
  )
}