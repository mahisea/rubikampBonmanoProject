import { createPortal } from "react-dom";
import styles from './Modal.module.css';

const Modal = ({onClose, onSubmit, title, description, hideCloseButton = false, hideSubmitButton = false}) => {
    return (
        createPortal(
            <div className={styles.root}>
                <div className={styles.modal}>
                    <h2>{title}</h2>
                    <section>{description}</section>
                    {!hideCloseButton && <button onClick={onClose}>close</button>}
                    {!hideSubmitButton && <button onClick={onSubmit}>submit</button>}
                </div>
            </div>,
        document.body)
    )
}

export default Modal;