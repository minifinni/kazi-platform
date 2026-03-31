import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const supabase = await createClient();

    const { data: updates, error } = await supabase
      .from('order_updates')
      .select('*')
      .eq('order_id', id)
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch order updates' },
        { status: 500 }
      );
    }

    return NextResponse.json(updates || []);
  } catch (error) {
    console.error('Get order updates error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order updates' },
      { status: 500 }
    );
  }
}
