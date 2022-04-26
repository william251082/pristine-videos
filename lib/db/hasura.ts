import { MagicUserMetadata } from "@magic-sdk/admin";

interface GqlPayload {
    issuer?: string | null
    email?: string | null
    publicAddress?: string | null
    userId?: string | null
    videoId?: string | null
    favourited?: number | null
    watched?: boolean
}

export async function queryHasuraGql(operationsDoc: string, operationName: string, variables: GqlPayload, token: string) {
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
        const response = await queryHasuraGql(
            operationsDoc,
            "findVideoIdByUserId",
            {
                userId,
                videoId
            },
            token
        )
        return response?.data?.stat
    } catch (err) {
        console.error('Error in createNewUser', err)
    }
}

export async function insertStat(
    token: string,
    { favourited, userId, watched, videoId }: GqlPayload
) {
    const operationsDoc = `
        mutation insertStat($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
            insert_stat_one(object: {
                favourited: $favourited, 
                userId: $userId, 
                watched: $watched, 
                videoId: $videoId
            }) {
                favourited
                userId
            }
        }
    `;

    return await queryHasuraGql(
        operationsDoc,
        "insertStat",
        { favourited, userId, watched, videoId },
        token
    );
}

export async function updateStat(
    token: string,
    { favourited, userId, watched, videoId }: GqlPayload
) {
    const operationsDoc = `
    mutation updateStat($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
        update_stat(
            _set: {watched: $watched, favourited: $favourited}, 
            where: {
                userId: {_eq: $userId}, 
                videoId: {_eq: $videoId}
            }) {
            returning {
                favourited,
                userId,
                watched,
                videoId
            }
        }
    }
`;
    return await queryHasuraGql(
        operationsDoc,
        "updateStat",
        { favourited, userId, watched, videoId },
        token
    );
}

export async function getWatchedVideos(userId: string, token: string) {
    const operationsDoc = `
        query watchedVideos($userId: String!) {
            stat(where: {
            watched: {_eq: true}, 
            userId: {_eq: $userId},
        }) {
            videoId
        }
    }
`;
    const response = await queryHasuraGql(
        operationsDoc,
        "watchedVideos",
        {userId},
        token
    );

    return response?.data?.stat || [];
}

export {}
