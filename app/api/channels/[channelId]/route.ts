import { currentProfile } from "@/lib/currenr-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"


export async function DELETE(
    req: Request,
    { params }: { params: { channelId: string } }
  ) {
    try {
      const profile = await currentProfile();
  
      if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const channel = await db.channel.delete({
        where: {
          id: params.channelId,
          profileId: profile.id,
        }
      });
  
      return NextResponse.json(channel);
    } catch (error) {
      console.log("[SERVER_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
