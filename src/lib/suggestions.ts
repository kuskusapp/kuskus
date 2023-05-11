import { GoogleClient } from "./auth"

export type SuggestedTodo = {
  title: string
  note: string
}

const MOCK_SUGGESTIONS: boolean = true

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchSubtaskSuggestions(
  taskTitle: string
): Promise<SuggestedTodo[] | undefined> {
  if (MOCK_SUGGESTIONS) {
    await sleep(1000)
    return [
      {
        title: "Subtask 1",
        note: "This is a note for subtask 1",
      },
      {
        title: "Subtask 2",
        note: "This is a note for subtask 2",
      },
      {
        title: "Subtask 3",
        note: "This is a note for subtask 3",
      },
    ]
  }

  const googleToken = (await GoogleClient.getUser())?.id_token

  if (!googleToken) return

  const res = await fetch(
    `http://127.0.0.1:3001/subtasks?request=${taskTitle}`,
    {
      headers: {
        Authorization: "Bearer " + googleToken,
      },
    }
  )
  const resJson = await res.json()
  // not sure why I can't do .Success right after `res.json()`, whole thing is a hack to get it working for now

  return resJson.Success.subtasks
}
