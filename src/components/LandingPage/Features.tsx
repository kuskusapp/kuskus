export default function Features() {
  return (
    <>
      <style>{`
        #Animation {
          animation: 1s linear 0s 1 slideInFromLeft;
        }
        @keyframes slideInFromLeft {
          0% {
              transform: translateX(-20px);
              opacity: 0;
          }
          100% {
              transform: translateX(0);
              opacity: 1;
          }
      }
      #Nav {
        padding: 10px 25px 10px 25px;
        border-radius: 25px;
      }
      #Nav:hover {
        background-color: rgba(38, 40, 60, 0.29);
        border: solid 1px rgba(111, 118, 156, 0.15)
        opacity: 0.6;
        transition: 0.3s;
      }
      #NavContainer {
        border-bottom: solid 1px rgba(38, 40, 60, 0.29)
      }
      `}</style>
      <div
        style={{
          "border-color": "rgba(7, 25, 61, 0.3)",
          "background-color": "rgba(1, 1, 4, 0.8)",
        }}
        class=" h-screen lg:border-l-4"
      >
        <div id="NavContainer" class="flex justify-between px-40 p-5">
          <div id="Nav">Price</div>
          <div id="Nav">Features</div>
          <div id="Nav">Changelogs</div>
        </div>
        <div class="flex flex-col pl-16 pt-20 gap-6">
          <div>
            <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
              AI
            </h1>
            <div>Create a task. AI will create subtasks for you.</div>
          </div>
          <div>
            <h1 id="Animation" class="text-3xl font-bold text-sky-300 mb-3">
              <span class="text-white">KeyBoard</span> Shortcuts
            </h1>
            <div>Everything in the app is one hotkey away.</div>
          </div>
        </div>
      </div>
    </>
  )
}
