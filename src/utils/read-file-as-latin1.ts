export async function readFileAsLatin1(file: File) {
  const buffer = await file.arrayBuffer();
  return new TextDecoder('iso-8859-1').decode(buffer);
}
