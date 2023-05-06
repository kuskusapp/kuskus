interface Props {
  action: string
  keybind: string
}

export default function Keybind(props: Props) {
  return (
    <div class="flex justify-between p-1">
      <div>{props.action}</div>
      <div>{props.keybind}</div>
    </div>
  )
}
