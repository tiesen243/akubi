import { handler } from '@/server'

export const loader = ({ request }: { request: Request }) => handler(request)
export const action = ({ request }: { request: Request }) => handler(request)
