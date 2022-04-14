import {NextApiRequest, NextApiResponse} from "next";
import {StatsResponse} from "@pages/api/types";

export default async function stats(req:NextApiRequest, res: NextApiResponse<StatsResponse>) {
    if (req.method === 'POST') {
        res.send({msg: "it works"})
    }
}
