import { storage } from "@/plugins/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const upload = async (file, directory) => {
  try {
    const fileRef = ref(storage, `${directory.charAt(directory.length) === '/' ? directory : `${directory}/`}${new Date().getTime()}-${file.name}`)
    await uploadBytes(fileRef, file)
    return await getDownloadURL(fileRef)
  } catch (e) {
    console.error('[file-upload]', e)
  }
}

