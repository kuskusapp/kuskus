export type SuggestedTodosResponse = {
  title: string
  note: string
}

const MOCK_SUGGESTIONS: boolean = true

export async function fetchSubtaskSuggestions(
  taskTitle: string,
  googleToken: string
): Promise<SuggestedTodosResponse[]> {
  if (MOCK_SUGGESTIONS) {
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
