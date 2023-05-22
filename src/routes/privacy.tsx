export default function Privacy() {
  return (
    <div class="flex flex-col bg-white text-black h-screen">
      <h1 class="border-b border-black p-10  font-semibold text-5xl">
        Privacy Policy
      </h1>
      <div class="flex p-5 pt-2 gap-5">
        <div class="font-semibold flex flex-col">
          <span>Updated</span>
          <span>May 14, 2023</span>
        </div>
        <div class="text-lg flex flex-col w-1/2">
          <div class="mb-10">
            We at KusKus.app, respect your privacy and are strongly committed to
            keeping secure any information we obtain from you or about you.
            Todos are never shared with any third party unless AI features are
            used. Then the todos get sent to{" "}
            <a class="text-blue-400" href="https://openai.com/">
              OpenAI
            </a>{" "}
            for processing. OpenAI's privacy policy is{" "}
            <a
              class="text-blue-400"
              href="https://openai.com/policies/privacy-policy"
            >
              here
            </a>
            . All data created by users exists on Amazon Web Services (AWS)
            servers. AWS's privacy policy is{" "}
            <a class="text-blue-400" href="https://aws.amazon.com/privacy/">
              here
            </a>
            .
          </div>
          <div class="mb-10">
            We use{" "}
            <a class="text-blue-400" href="https://www.hanko.io/">
              Hanko
            </a>{" "}
            auth provider to authenticate users using email and passkeys.
            Hanko's privacy policy is{" "}
            <a class="text-blue-400" href="https://www.hanko.io/privacy">
              here
            </a>
            .
          </div>
          <div class="text-3xl pb-4 font-semibold">How to contact us</div>
          <div>
            Please{" "}
            <a class="text-blue-400" href="mailto:mail@kuskus.app">
              contact us
            </a>{" "}
            if you have any questions or concerns not already addressed in this
            privacy policy.
          </div>
        </div>
      </div>
    </div>
  )
}
