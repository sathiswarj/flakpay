function CustomActionIcon({ children, onClick, style }) {
  return (
    <div style={{}}>
      <span
        onClick={onClick}
        style={{
          cursor: "pointer",
          ...style,
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default CustomActionIcon;
