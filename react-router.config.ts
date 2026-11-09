import type { Config } from '@react-router/dev/config'

export default {
  ssr: true,
  future: {
    unstable_enableNodeReadableStream: true,
  },
  prerender: true,
} satisfies Config
