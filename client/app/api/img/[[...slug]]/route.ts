
import { NextRequest } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  console.log("File name:", file.name, "size:", file.size);
}