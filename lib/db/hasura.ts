export async function queryHasuraGql() {
    const hasuraToken = typeof process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET !== "undefined" ? process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET : ''
    const hasuraUrl = typeof process.env.NEXT_PUBLIC_HASURA_ADMIN_URL !== "undefined" ? process.env.NEXT_PUBLIC_HASURA_ADMIN_URL : ''
    const result = await fetch(
        hasuraUrl,
        {
            method: "POST",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImhpMiIsImlhdCI6MTY0OTU4NjI0NywiZXhwIjoxNjUwMTkxMDU1LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiaGkifX0.BuNgeEih_8JemoySwd2COw7gsxexJxZXhEPmJrzczfM",
                'x-hasura-admin-secret': hasuraToken
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: {},
                operationName: "MyQuery"
            })
        }
    )

    return await result.json()
}

const operationsDoc = `  
  query MyQuery {
    user {
      email
      id
      issuer
      publicAddress
    }
  }
`

export {}
