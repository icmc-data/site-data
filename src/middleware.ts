import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n';
import { localePrefix } from './navigation';

type CustomMiddleware = (req: NextRequest) => Promise<NextRequest | NextResponse>;

const customMiddleware: CustomMiddleware = async req => {
  console.log('Custom middleware executed before next-intl');

  const pathname = req.nextUrl.pathname;

  // Caso a rota não contenha o prefixo do locale
  if (!locales.some(locale => pathname.startsWith(`/${locale}`))) {
    const url = req.nextUrl.clone();
    url.pathname = `/br${pathname}`;
    return NextResponse.redirect(url);
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

  // Se `customMiddleware` retornar `NextResponse`, usar essa resposta
  if (result instanceof NextResponse) {
    return result;
  }

  // Caso contrário, continuar com o `intlMiddleware`
  return intlMiddleware(result);
}

export const config = {
  matcher: ['/', '/(br|en)/:path*']
};
