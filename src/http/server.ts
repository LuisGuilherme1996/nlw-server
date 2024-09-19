import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import routes from './routes/index.routes'
import fastifyCors from '@fastify/cors'

const dateBr = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
  credentials: true,
})
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(routes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(`
      Server is running!!
      Date: ${dateBr}
      Hour: ${new Date().toLocaleTimeString()}
      `)
  })
