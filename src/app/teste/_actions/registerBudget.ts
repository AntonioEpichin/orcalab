// file: /app/_actions/registerBudget.js
'use server'

import { auth } from '../../../../auth';
import db from '../../../lib/db';

export default async function registerBudget() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      console.error('Auth session is invalid:', session);
      return { success: false, error: 'Invalid session' };
    }

    const email = session.user.email;
    console.log('Creating budget for user:', email);

    const budget = await db.budgetByUser.create({
      data: {
        userTag: email,
      },
    });
    
    console.log('Budget created:', budget);
    return { success: true, budget };
  } catch (error) {
    console.error('Error creating budget:', error);
    return { success: false, error: error.message };
  }
}
