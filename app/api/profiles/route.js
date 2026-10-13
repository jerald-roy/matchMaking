import { NextResponse } from "next/server";
import { assigned_clients } from "@/data/profile";


export async function GET(response) {
    try {
        return NextResponse.json({
            sucess: true,
            count: assigned_clients.length,
            data:assigned_clients
        })
    } catch (err) {
        return NextResponse.json({ sucess: false , error:err},{status:500})
    }
}