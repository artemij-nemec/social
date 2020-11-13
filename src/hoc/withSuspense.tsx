import React, { Suspense } from 'react'

export const withSuspense = <WCP,>(Component: React.ComponentType<WCP>) => {
    return (props: WCP) => {
        return <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    }
}
