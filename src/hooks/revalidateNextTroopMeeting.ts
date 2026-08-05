import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

const revalidateNextTroopMeetingBanner = () => {
  revalidatePath('/', 'layout')
  revalidateTag('next_troop_meeting', 'max')
}

export const revalidateNextTroopMeeting: CollectionAfterChangeHook = ({ req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateNextTroopMeetingBanner()
  }
}

export const revalidateNextTroopMeetingDelete: CollectionAfterDeleteHook = ({
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateNextTroopMeetingBanner()
  }
}

export const revalidateNextTroopMeetingGlobal: GlobalAfterChangeHook = ({ req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateNextTroopMeetingBanner()
  }
}
