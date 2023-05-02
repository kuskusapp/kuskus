export default function Features() {
  return (
    <div
      style={{ filter: "drop-shadow(-15px 0px 50px #000)" }}
      class="flex flex-col pl-16 pt-20 gap-6 bg-white dark:bg-stone-700 h-screen"
    >
      <div>
        <h1 class="text-3xl font-bold text-sky-300 mb-3">AI</h1>
        <div>Create a task. AI will create subtasks for you.</div>
      </div>
      <div>
        <h1 class="text-3xl font-bold text-sky-300 mb-3">Keyboard Shortcuts</h1>
        <div>Everything in the app is one hotkey away.</div>
      </div>
    </div>
  )
}
