export async function queryHasuraGql(query: string | undefined, variables: string | undefined, operationName: { issuer: any } | undefined, token: string) {
    const hasuraToken = typeof process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET !== "undefined" ? process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET : ''
    const hasuraUrl = typeof process.env.NEXT_PUBLIC_HASURA_ADMIN_URL !== "undefined" ? process.env.NEXT_PUBLIC_HASURA_ADMIN_URL : ''
    const result = await fetch(
        hasuraUrl,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'x-hasura-admin-secret': hasuraToken,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables,
                operationName
            })
        }
    )

    return await result.json()
}

export async function isNewUser(token: string, issuer: string | null) {
    const operationsDoc = `
        query isNewUser($issuer: String!) {
            users(where: {issuer: {_eq: $issuer}}) {
                id
                email
                issuer
            }
        }
    `;
    const response = await queryHasuraGql(
        operationsDoc,
        "isNewUser",
        {issuer},
        token
    );

    return response?.data?.users?.length === 0
}

export {}
