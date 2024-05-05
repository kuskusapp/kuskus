import "server-only"

import { unstable_cache } from "next/cache"
import { cache } from "react"
import { z } from "zod"
import { tracing } from "@baselime/node-opentelemetry/trpc"

export const updateUser = protectedAction
  .input(
    createBoardSchema.superRefine(async (it, ctx) => {
      const { id: userId } = await currentUser()
      const board = await db.query.Board.findFirst({
        where: (fields) =>
          and(eq(fields.name, it.name), eq(fields.ownerId, userId)),
      })
      if (board) {
        ctx.addIssue({
          code: "custom",
          message: `Board ${it.name} already exists`,
          path: ["name"],
        })
      }
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const id = genId("brd")

    await db.insert(Board).values({
      ...input,
      id,
      ownerId: ctx.user.id,
    })

    revalidatePath(`/`)
    revalidateTag("user_boards")
    return redirect(`/boards/${id}`)
  })

/**
 * Protected proc
 */
export const protectedAction = nextProc.use(async (opts) => {
  if (!opts.ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    })
  }

  return opts.next({
    ctx: {
      user: opts.ctx.user,
    },
  })
})

const nextProc = t.procedure
  .use(tracing({ collectInput: true, collectResult: true }))
  .use(async (opts) => {
    const ctx = await createContext()
    const input = await opts.getRawInput()
    const log = ctx.log.child({ input })

    if (t._config.isDev) {
      // artificial delay in dev
      const waitMs = Math.floor(Math.random() * 400) + 100
      await new Promise((resolve) => setTimeout(resolve, waitMs))
    }

    const start = Date.now()
    const res = await opts.next({ ctx: { ...ctx, log } })
    const duration = Date.now() - start

    if (res.ok) log.info({ duration, result: res.data })
    else log.error({ duration, error: res.error })

    return res
  })
  .experimental_caller(experimental_nextAppDirCaller({}))
