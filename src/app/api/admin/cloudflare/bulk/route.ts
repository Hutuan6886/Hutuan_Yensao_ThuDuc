import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function DELETE(req: NextRequest) {
  try {
    const { hrefs } = await req.json();
    if (!hrefs || !Array.isArray(hrefs) || hrefs.length === 0)
      return NextResponse.json({ error: "Missing hrefs!" }, { status: 400 });

    // Tạo danh sách key cho từng ảnh
    const keys = hrefs.map((href: string) => {
      const filterArray: string[] = href.split("/");
      const keyArray: string[] = [];
      for (let i = 3; i < filterArray.length; i++) {
        keyArray.push(filterArray[i]);
      }
      return keyArray.join("/");
    });
    console.log("keys", keys);
    // Gửi lệnh xoá tất cả ảnh song song
    const deleteTasks = keys.map(async (key) => {
      const command = new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: key,
      });
      try {
        await r2.send(command);
        return { key, success: true };
      } catch (err) {
        console.error(`❌ Failed to delete ${key}:`, err);
        return { key, success: false, error: (err as Error).message };
      }
    });

    const results = await Promise.allSettled(deleteTasks);
    const failed = results.filter(
      (r) => r.status === "fulfilled" && !r.value.success
    );
    return NextResponse.json({
      success: failed.length === 0,
      deleted: results.length - failed.length,
      failed: failed.map((f: any) => f.value.key),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
