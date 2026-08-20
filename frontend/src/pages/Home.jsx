import AppShell from "../components/AppShell"


export default function Home() {
    return (
        <>
            <AppShell>
                <div className="page page--reading">
                    <div className="d-flex flex-column gap-3">
                        <p className="lead fs-2 mb-0">
                            Have you been building a collection for a long time but have no one to share it with?{" "}
                            <span className="accent">Shelved</span> is the perfect online showcase for your collection.
                        </p>

                        <p className="muted fs-4 mb-0">
                            Shelved lets you create <strong className="accent">public and private collections</strong>, comment on other users' collections, and share your thoughts on what you see.
                        </p>

                        <p className="muted fs-4 mb-0">
                            And for the most discerning collectors, a feature allowing exchanges with other users is coming soon.
                        </p>
                    </div>
                </div>
            </AppShell>
        </>  
    ) 
}