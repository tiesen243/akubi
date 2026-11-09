import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

import { getQueryClient } from '@/lib/trpc/client'

export function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient()

  return (
    <ThemeProvider attribute='class' enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
