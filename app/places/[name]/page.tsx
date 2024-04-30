export default async function Place(props: any) {
  console.log(props)
  return (
    <>
      <header className="flex justify-between items-center pb-4">
        Place is {props.params.name}
      </header>
    </>
  )
}
