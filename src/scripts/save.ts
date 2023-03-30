import axios from 'axios';
import { SortedLog } from './sort';

const api = axios.create();

export async function getData(id: string): Promise<SortedLog> {
  const url = `https://script.google.com/macros/s/AKfycbwMq6GcBXYS40NMpJ1cq1O7mlgZIu6tDm6sIbHDqCdtkDa1JuRcb3qzvMCRYEAZ_HlM/exec?id=${id}`;
  const result = await api.get(url);
  return result.data as SortedLog;
}

export async function setData(data: SortedLog): Promise<string> {
  const url =
    'https://script.google.com/macros/s/AKfycbwMq6GcBXYS40NMpJ1cq1O7mlgZIu6tDm6sIbHDqCdtkDa1JuRcb3qzvMCRYEAZ_HlM/exec';
  const result = await api.post(url, JSON.stringify(data));
  return result.data;
}
