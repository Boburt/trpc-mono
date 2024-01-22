export async function statusRender(status: number, url: string) {
    const res = await fetch(url)
    return new Response(res.body, {
        headers: res.headers,
        status,
    })
}