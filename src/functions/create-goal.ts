import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalsRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalsRequest) {
  if (title && desiredWeeklyFrequency) {
    const result = await db
      .insert(goals)
      .values([
        { title: title, desiredWeeklyFrequency: desiredWeeklyFrequency },
      ])
      .returning()
    const goal = result[0]
    return { goal }
  }
}
