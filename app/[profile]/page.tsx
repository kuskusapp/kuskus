export default async function Profile(props: any) {
  return (
    <>
      <header className="flex justify-between items-center pb-4">
        Profile name is {props.params.profile}
      </header>
    </>
  )
}
