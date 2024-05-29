'use server';

import db from '@/lib/db';
import { hashSync } from 'bcrypt-ts';
import { redirect } from 'next/navigation';

export default async function register(formData: FormData) {
  const entries = Array.from(formData.entries());
  const { name, email, dataNascimento, cpf, password, telefone } = Object.fromEntries(entries) as {
    name: string;
    dataNascimento: string;
    cpf: string;
    telefone: string;
    email: string;
    password: string;
  };

  // Verifique se algum campo está vazio
  if (!name || !email || !password || !dataNascimento || !cpf || !telefone) {
    throw new Error('Preencha todos os campos');
  }

  // Verifique se o usuário já existe
  const userExists = await db.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error('Usuário já existe');
  }

await db.user.create({
    data: {
        name,
        email,
        password: hashSync(password, 10),
        dataNascimento: new Date(dataNascimento), // Convert to Date object
        cpf,
        telefone,
    },
});

redirect('/');
}
