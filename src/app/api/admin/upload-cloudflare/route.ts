import { r2 } from "@/libs/r2";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqFile = await req.formData();
    const file: File = reqFile.get("file") as unknown as File;
    if (!file)
      return NextResponse.json({ error: "Missing file!" }, { status: 400 });

    const fileSizeLimit: number = 5 * 1024 ** 2;
    if (file.size > fileSizeLimit)
      return NextResponse.json(
        { error: "The image exceed the maximum allow size!" },
        {
          status: 400,
        }
      );

    const bytes: ArrayBuffer = await file.arrayBuffer();
    const buffer: Buffer<ArrayBuffer> = Buffer.from(bytes);

    const currentTime: number = Date.now();
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: `uploads/${currentTime}-${file.name}`, // http://.../uploads/1728554759000-logo.png
      ContentType: file.type,
      Body: buffer,
      ACL: "bucket-owner-full-control",
    });

    await r2.send(putObjectCommand);
    const url: string = `${process.env.PUBLIC_STORAGE_R2_URL}/uploads/${currentTime}-${file.name}`;
    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url)
      return NextResponse.json({ error: "Missing fileUrl!" }, { status: 400 });

    // https://pub-3fd9df0a9a034d6fa7c099456764cf28.r2.dev/uploads/1728554759000-logo.png ---> ["uploads","1728554759000-logo.png"] ---> uploads/1728554759000-logo.png
    const key = url.split("/").slice(-2).join("/");
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    });
    await r2.send(deleteObjectCommand);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
