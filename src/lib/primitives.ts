import { Accessor, createEffect, mapArray, onCleanup } from "solid-js"

/**
 * For diffing a reactive array with mapArray
 */
export function createArrayDiff<T>(
  source: Accessor<readonly T[]>,
  mapFn: (item: T, setOnRemove: (fn: VoidFunction) => void) => void
): void {
  const runDiff = mapArray(source, (item) => {
    let onRemove = () => {}

    mapFn(item, (fn) => (onRemove = fn))

    // only run the cleanup if the item was removed from the array
    // not when the effect is disposed
    onCleanup(() => updating && onRemove())
  })

  let updating = false
  createEffect(() => {
    updating = true
    runDiff()
    updating = false
  })
}
