import axios from '@/api'
import { Hotel } from '@/types/Hotel';
import { cookies } from 'next/headers'

export async function getHotels(): Promise<Hotel[]> {
    const accessToken = cookies().get('access_token')?.value;
    
    const { data } = await axios.get('/hotels', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return data;
}