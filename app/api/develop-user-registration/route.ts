import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const { username, email, password } = await request.json()

  // Validate input
  if (!username || !email || !password) {
    return NextResponse.json(
      { message: 'Please provide a username, email, and password.' },
      { status: 400 }
    )
  }

  // Check if email is already registered
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json(
      { message: 'Email is already registered.' },
      { status: 409 }
    )
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create new user
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ message: 'User registered successfully.' })
}