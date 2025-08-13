import { getUserInfo } from '@/services/user.service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getUserInfo();
    return NextResponse.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
