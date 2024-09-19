import type { FastifyInstance, FastifyRequest } from 'fastify'
import { createGoal } from '../../functions/create-goal'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import z from 'zod'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'
import { createGoalCompletion } from '../../functions/create-goal-completion'
import { getWeekSummary } from '../../functions/get-week-summary'

export async function goalRoutes(fastify: FastifyInstance) {
  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)

  /* Create a new goal */
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/goals',
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().min(1).max(7),
      }),
    },
    handler: async (req, res) => {
      const { title, desiredWeeklyFrequency } = req.body
      await createGoal({
        title,
        desiredWeeklyFrequency,
      })
    },
  })

  /* Return of goals pending */
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/pending-goals',
    handler: async () => {
      const { pendingGoals } = await getWeekPendingGoals()
      return { pendingGoals }
    },
  })

  /* Create which goal was completed */
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/completions',
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
    handler: async req => {
      const { goalId } = req.body
      await createGoalCompletion({ goalId })
    },
  })

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/summary',
    handler: async () => {
      return await getWeekSummary()
    },
  })
}

export default goalRoutes
