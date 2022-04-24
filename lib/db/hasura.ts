import { MagicUserMetadata } from "@magic-sdk/admin";

interface Variables {
    issuer?: string | null
    email?: string | null
    publicAddress?: string | null
    userId?: string | null
    videoId?: string | null
}

export async function queryHasuraGql(operationsDoc: string, operationName: string, variables: Variables, token: string) {
    const hasuraToken = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET !== undefined ? process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET : ''
    const hasuraUrl = process.env.NEXT_PUBLIC_HASURA_ADMIN_URL !== undefined ? process.env.NEXT_PUBLIC_HASURA_ADMIN_URL : ''
    try {
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
                    query: operationsDoc,
                    variables: variables,
                    operationName: operationName
                })
            }
        )
        return await result.json()
    } catch (err) {
        console.error('Error in Hasura GQL.', err)
    }
}

export async function isNewUser(token: string, issuer: string | null) {
    const operationsDoc = `
        query isNewUser($issuer: String!) {
            user(where: {issuer: {_eq: $issuer}}) {
                id
                email
                issuer
            }
        }
    `
    try {
        const response = await queryHasuraGql(
            operationsDoc,
            "isNewUser",
            {issuer},
            token
        );
        return response?.data?.user?.length === 0
    } catch (err) {
        console.error('Error in isNewUser', err)
    }
}

export async function createNewUser(token: string, metadata: MagicUserMetadata) {
    const operationsDoc = `
            mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
                insert_user(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
                returning {
                    email
                    id
                    issuer
                }
            }
        }
    `
    const { issuer, email, publicAddress } = metadata
    try {
        return await queryHasuraGql(
            operationsDoc,
            "createNewUser",
            {
                issuer,
                email,
                publicAddress,
            },
            token
        )
    } catch (err) {
        console.error('Error in createNewUser', err)
    }
}

export async function findVideoIdByUser(token: string, userId: string, videoId: string) {
    const operationsDoc = `
        query findVideoIdByUserId($userId: String!, $videoId: String!) {
            stat(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
                id
                userId
                videoId
                favourited
                watched
            }
        }
    `
    try {
        return await queryHasuraGql(
            operationsDoc,
            "findVideoIdByUserId",
            {
                userId,
                videoId
            },
            token
        )
    } catch (err) {
        console.error('Error in createNewUser', err)
    }
}

export {}
