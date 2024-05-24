// below is some experimentatal code, not used in app
import { Hono } from "hono"

const app = new Hono()

app.get("/suggest-categories", async (c) => {
	const response = await fetch("http://158.160.90.161:8000/suggest-categories")
	const data = (await response.json()) as any
	return c.json(data)
})
app.get("/authorize", (c) => {
	return c.json({
		success: true,
	})
})

export default app
