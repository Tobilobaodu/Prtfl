import * as React from "react"

const LockedProjectModal = ({ isOpen, onClose, projectPassword, onPasswordCorrect, projectTitle }) => {
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === projectPassword) {
      setError("")
      setPassword("")
      onPasswordCorrect()
      onClose()
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="12" fill="#ECF0F1"/>
              <path d="M17.5563 7.75736L13.3137 12L17.5563 16.2426L16.1421 17.6569L11.8995 13.4142L7.65685 17.6569L6.24264 16.2426L10.4853 12L6.24264 7.75736L7.65685 6.34315L11.8995 10.5858L16.1421 6.34315L17.5563 7.75736Z" fill="#EE550E"/>
            </svg>
          </button>
          
          <div className="modal-body">
            <h2 className="modal-title">Sensitive material within</h2>
            <p className="modal-description">
              This case study is not publicly available due to a non-disclosure agreement. To access this case study, contact me for a password. Access is <span className="highlight">limited</span> to recruiters and potential clients.
            </p>

            <form onSubmit={handleSubmit} className="password-form">
              <div className="password-label">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.6665 14.667V5.33366H4.6665V4.00033C4.6665 3.0781 4.99162 2.29188 5.64184 1.64166C6.29162 0.991881 7.07762 0.666992 7.99984 0.666992C8.92206 0.666992 9.70828 0.991881 10.3585 1.64166C11.0083 2.29188 11.3332 3.0781 11.3332 4.00033V5.33366H13.3332V14.667H2.6665ZM5.99984 5.33366H9.99984V4.00033C9.99984 3.44477 9.80539 2.97255 9.4165 2.58366C9.02762 2.19477 8.55539 2.00033 7.99984 2.00033C7.44428 2.00033 6.97206 2.19477 6.58317 2.58366C6.19428 2.97255 5.99984 3.44477 5.99984 4.00033V5.33366ZM3.99984 13.3337H11.9998V6.66699H3.99984V13.3337ZM7.99984 11.3337C8.3665 11.3337 8.6805 11.2032 8.94184 10.9423C9.20273 10.681 9.33317 10.367 9.33317 10.0003C9.33317 9.63366 9.20273 9.31966 8.94184 9.05833C8.6805 8.79744 8.3665 8.66699 7.99984 8.66699C7.63317 8.66699 7.31939 8.79744 7.0585 9.05833C6.79717 9.31966 6.6665 9.63366 6.6665 10.0003C6.6665 10.367 6.79717 10.681 7.0585 10.9423C7.31939 11.2032 7.63317 11.3337 7.99984 11.3337Z" fill="#A2A2A2"/>
                </svg>
                <span>Password</span>
              </div>

              <div className="password-input-wrapper">
                <input
                  type="password"
                  className="password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="● ● ● ● ● ● ● ●"
                  aria-label="Password"
                />
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}
              </div>

              <a href="mailto:oluwatobiodu@outlook.com" className="request-password">
                Need access? <span className="underline">Request password</span>
              </a>
            </form>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.15) 100%);
          backdrop-filter: blur(5px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          position: relative;
          background: #2E2A2A;
          border-radius: 5px;
          padding: 31px 35px 25px 35px;
          max-width: 429px;
          width: 90%;
          animation: slideUp 0.3s ease-in-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-close {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ECF0F1;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: transform 0.2s ease;
        }

        .modal-close:hover {
          transform: scale(1.1);
        }

        .modal-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-title {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 600;
          line-height: 120%;
          letter-spacing: 0.6px;
          color: #FFF;
          margin: 0;
        }

        .modal-description {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: #FFF;
          margin: 0;
        }

        .modal-description .highlight {
          color: #EE550E;
        }

        .password-form {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 10px;
        }

        .password-label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 120%;
          color: #FFF;
        }

        .password-label svg {
          width: 16px;
          height: 16px;
        }

        .password-input-wrapper {
          width: 100%;
        }

        .password-input {
          width: 100%;
          height: 45px;
          padding: 19px 20px;
          border-radius: 5px;
          background: #F9F9F8;
          border: none;
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          color: #A2A2A2;
          outline: none;
        }

        .password-input::placeholder {
          color: #A2A2A2;
          letter-spacing: 4px;
        }

        .request-password {
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 120%;
          letter-spacing: 0.42px;
          color: #FFF;
          text-decoration: none;
          margin-top: 5px;
        }

        .request-password .underline {
          color: #FAF8ED;
          text-decoration: underline;
        }

        .error-message {
          color: #EE550E;
          font-family: 'Neue Haas Display', 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 120%;
          margin-top: 5px;
        }

        .request-password:hover .underline {
          color: #EE550E;
        }

        @media (max-width: 768px) {
          .modal-content {
            padding: 25px 20px;
            max-width: 95%;
          }

          .modal-title {
            font-size: 18px;
          }

          .modal-description {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  )
}

export default LockedProjectModal
