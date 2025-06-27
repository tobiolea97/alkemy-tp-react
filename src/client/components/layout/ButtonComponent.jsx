
import './styles.css';

function ButtonComponent({ text, buttonType, onClick }) {
  const style = "";
  if (buttonType === "default") {
    style = "btn btn-default";
  }
  return (
    <button className="btn btn-primary" style={{ margin: "1rem 0" }} onClick={onClick}>
      { text }
    </button>
  );
}

export default ButtonComponent;
