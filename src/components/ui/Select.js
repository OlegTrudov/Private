export function Select({ children }) {
  return <select className="border p-2 rounded">{children}</select>;
}

export function SelectItem({ children, value }) {
  return <option value={value}>{children}</option>;
}