import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import AppShell from "../components/AppShell"
import Collection from "../components/Collection"
import CardTile from "../components/CardTile"
import { search } from "../api/search"

export default function Search() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''

    const [results, setResults] = useState({ collections: [], cards: [] })

    useEffect(() => {
        search(query)
            .then(setResults)
            .catch(() => {})
    }, [query])

    return (
        <AppShell>
            <h2 className="mb-4">Search results for "{query}"</h2>

            <div className="section-head">
                <h2>Collections</h2>
            </div>
            {results.collections.length > 0 ? (
                <div className="grid grid--lg">
                    {results.collections.map(collection => (
                        <Collection key={collection.id} collection={collection} />
                    ))}
                </div>
            ) : (
                <p className="muted">No matching collections.</p>
            )}

            <div className="section-head">
                <h2>Cards</h2>
            </div>
            {results.cards.length > 0 ? (
                <div className="grid grid--wide">
                    {results.cards.map(card => (
                        <CardTile key={card.id} item={card} />
                    ))}
                </div>
            ) : (
                <p className="muted">No matching cards.</p>
            )}
        </AppShell>
    )
}
