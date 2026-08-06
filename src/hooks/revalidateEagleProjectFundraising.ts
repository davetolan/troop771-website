import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateEagleProjectFundraising: GlobalAfterChangeHook = ({ req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/eagle/kason')
    revalidateTag('global_eagle-project-fundraising', 'max')
  }
}
