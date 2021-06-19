export function mergeRefs<T extends HTMLElement | null>(node: T, ...refs: (React.Ref<T> | null | undefined)[]) {
  refs.forEach((ref) => {
    if (node === null) return;
    if (ref === undefined || ref === null) return;
    if (typeof ref === 'function') ref(node);
    else (ref as React.MutableRefObject<T>).current = node;
  })
}