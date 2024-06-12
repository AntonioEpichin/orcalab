// src/app/api/tables/route.ts

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getTableOptions = (dirPath: string, type: string) => {
  const files = fs.readdirSync(dirPath);
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      label: file.replace('.json', '').replace(/_/g, ' ').toUpperCase(),
      value: `${type}/${file}`
    }));
};

export async function GET() {
  const baseDir = process.cwd();
  const balcaoDir = path.join(baseDir, 'public', 'tabelas', 'balcão');
  const faturadoDir = path.join(baseDir, 'public', 'tabelas', 'faturado');

  try {
    const balcaoOptions = getTableOptions(balcaoDir, 'tabelas/balcão');
    const faturadoOptions = getTableOptions(faturadoDir, 'tabelas/faturado');
    const tableOptions = [...balcaoOptions, ...faturadoOptions];

    return NextResponse.json(tableOptions);
  } catch (error) {
    console.error('Error reading directory:', error);
    return NextResponse.error();
  }
}
