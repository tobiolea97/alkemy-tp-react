import './styles.css';

export const Spinner = () => {
    return (
        <div className="spinner-background">
          <div className="spinner"></div>
          <p className="loading-label">Cargando</p>
        </div>
    )
}

export default Spinner;