export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{ background: "#fff", padding: "2em", borderRadius: "8px" }}>
        <button onClick={onClose} style={{ float: "right" }}>X</button>
        {children}
      </div>
    </div>
  );
}
