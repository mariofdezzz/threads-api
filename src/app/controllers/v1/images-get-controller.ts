import { contentType } from 'std/media_types/mod.ts'
import { Controller } from '~/controllers/controller.ts'

// GET /v1/images/*
export const ImagesGetController: Controller<'/v1/images/*'> = async ({
  request,
}) => {
  const { pathname } = new URL(request.url)
  const filepath = decodeURIComponent(pathname.replace('/v1/', ''))
  const path = `./public/${filepath}`
  const mimeType = contentType(String(path.split('.').at(-1)))!

  try {
    // Streams to save memory
    const fileInfo = await Deno.stat(path)
    const file = await Deno.open(path, { read: true })

    return new Response(file.readable, {
      headers: {
        'Content-Type': mimeType,
        'Content-Length': fileInfo.size.toString(),
      },
    })
  } catch {
    return new Response('Not Found', { status: 404 })
  }
}
