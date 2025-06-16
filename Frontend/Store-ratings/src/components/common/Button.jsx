export default function Button({ children, ...props }) {
  return (
    <button style={{ padding: "0.5em 1em", margin: "0.5em" }} {...props}>
      {children}
    </button>
  );
}
