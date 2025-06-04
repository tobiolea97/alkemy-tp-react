import './styles.css';

export const Spinner = () => {
    return (
        <div className="spinner-background">
          <div className="spinner"></div>
          <p className="loading-label">Espere un momento por favor, no sea ansioso.</p>
        </div>
    )
}

export default Spinner;