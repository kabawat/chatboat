import { NextResponse } from 'next/server'
import { useDispatch } from 'react-redux'

export function middleware(request) {
    let cookie = request.cookies.get('_x_a_t')
    if (cookie?.name !== "_x_a_t" || cookie?.value == undefined) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/chat', '/story']
}