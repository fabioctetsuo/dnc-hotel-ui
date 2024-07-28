"use server"
import axios from '@/api'
import { HotelsList } from '@/types/Hotel';
import { cookies } from 'next/headers'

export async function getHotels(currentPage: string, limit: number): Promise<HotelsList> {
    const access_token = cookies().get('access_token')?.value;

    const { data } = await axios.get('/hotels', {
        params: { page: currentPage, limit },
        headers: { Authorization: `Bearer ${access_token}` }
    });

    return data;
}