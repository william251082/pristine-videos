export async function queryHasuraGql(operationsDoc: string, operationName: string, variables: {}) {
    const hasuraToken = typeof process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET !== "undefined" ? process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET : ''
    const hasuraUrl = typeof process.env.NEXT_PUBLIC_HASURA_ADMIN_URL !== "undefined" ? process.env.NEXT_PUBLIC_HASURA_ADMIN_URL : ''
    const result = await fetch(
        hasuraUrl,
        {
            method: "POST",
            headers: {
                'x-hasura-admin-secret': hasuraToken
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
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
