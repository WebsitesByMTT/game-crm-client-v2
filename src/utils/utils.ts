"use server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken";

export const getUser = async () => {
    const userToken = await cookies().get('userToken')?.value
    if (userToken) {
        return jwt.decode(userToken)
    }
}

