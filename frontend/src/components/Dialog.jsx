export default function Dialog({ title, onClose, children, footer, wide }) {
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className={`dialog${wide ? ' dialog--wide' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="modal__head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose}>
            <span className="material-symbols-outlined micon">close</span>
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__foot">{footer}</div>}
      </div>
    </div>
  );
}
