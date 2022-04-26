import {GetServerSidePropsContext} from "next";
import {verifyToken} from "@utils/verifyToken";

const redirectUser = async (context: GetServerSidePropsContext) => {
    const token = context.req ? context.req.cookies?.token : ''
    const userId = await verifyToken(token)
    return {userId, token}
}

export default redirectUser
