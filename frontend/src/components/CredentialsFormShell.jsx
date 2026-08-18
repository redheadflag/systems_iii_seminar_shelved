import React from "react";

export default function CredentialsFormShell({pageTitle, children}) {
    return (
        <>
            <div className="auth view-enter">
                <div className="auth__card">
                    <div className="auth__brand">
                        <div>
                            <h1 className="auth__title">Shelved</h1>
                            <div className="auth__subtitle">{pageTitle} page</div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}