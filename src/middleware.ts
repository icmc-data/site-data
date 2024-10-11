import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n';
import { localePrefix } from './navigation';

type CustomMiddleware = (req: NextRequest) => Promise<NextRequest | NextResponse>;

const customMiddleware: CustomMiddleware = async req => {
  console.log('Custom middleware executed before next-intl');
  
  const pathname = req.nextUrl.pathname;
  
  if(pathname == "/br/pages/events/undertandingDL"){
    const url = req.nextUrl.clone();
    url.pathname= "/br/pages/events/understandingDL"
    return NextResponse.redirect(url)
  }
  
  // Caso a rota não contenha o prefixo do locale
  if (!locales.some(locale => pathname.startsWith(`/${locale}`))) {
    const url = req.nextUrl.clone();
    url.pathname = `/br${pathname}`;
    return NextResponse.redirect(url);
  }

  // redireciona a URL incorreta "undertandingDL" pra correta "understandingDL"
  if (pathname.includes('/events/undertandingDL')) {
    const correctedUrl = req.nextUrl.clone();
    correctedUrl.pathname = pathname.replace('/events/undertandingDL', '/events/understandingDL');
    return NextResponse.redirect(correctedUrl);
  }

  return req;
};

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'br',
  localePrefix
});

export default async function middleware(
  req: NextRequest
): Promise<ReturnType<typeof intlMiddleware>> {
  const result = await customMiddleware(req);

  if (result instanceof NextResponse) {
    return result;
  }

  return intlMiddleware(result);
}

export const config = {
  matcher: ['/', '/(br|en)/:path*']
};
