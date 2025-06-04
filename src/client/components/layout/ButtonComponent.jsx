
import './styles.css';

function ButtonComponent({ text, buttonType }) {
  const style = "";
  if (buttonType === "default") {
    style = "btn btn-default";
  }
  return (
    <button className="btn btn-primary" style={{ margin: "1rem 0" }}>
      { text }
    </button>
  );
}

export default ButtonComponent;
