import type { FastifyInstance } from 'fastify'
import goalRoutes from './goal.routes'

async function routes(fastify: FastifyInstance) {
  fastify.register(goalRoutes)
}

export default routes
