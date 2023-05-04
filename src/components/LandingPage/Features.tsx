export default function Features() {
  return (
    <div
      style={{
        "border-color": "rgba(7, 25, 61, 0.3)",
        "background-color": "rgba(1, 1, 4, 0.8)",
      }}
      class="flex flex-col pl-16 pt-20 gap-6 bg-white dark:bg-neutral-900 h-screen border-l-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-sky-300 mb-3">AI</h1>
        <div>Create a task. AI will create subtasks for you.</div>
      </div>
      <div>
        <h1 class="text-3xl font-bold text-sky-300 mb-3">
          <span class="text-white">KeyBoard</span> Shortcuts
        </h1>
        <div>Everything in the app is one hotkey away.</div>
      </div>
    </div>
  )
}
