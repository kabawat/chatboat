import { NextResponse } from 'next/server'

export function middleware(request) {
    const url = request.nextUrl
    const cookie = request.cookies.get('_x_a_t')
    const chat_token = request.cookies.get('_x_s_t')

    const story = url.pathname.startsWith('/story')
    const chat = url.pathname.startsWith('/chat')
    const home = url.pathname.startsWith('/')

    if (chat || story) {
        if (!cookie || cookie.value === '' || !chat_token || chat_token.value === "") {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } else if (home) {
        if (!cookie || cookie.value === '' || !chat_token || chat_token.value === "") {
            return NextResponse.redirect(new URL('/login', request.url))
        } else {
            return NextResponse.redirect(new URL('/chat', request.url))
        }
    }
}

export const config = {
    matcher: ['/', '/chat', '/story',]
}
