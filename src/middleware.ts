import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n';
import { localePrefix } from './navigation';

type CustomMiddleware = (req: NextRequest) => Promise<NextRequest | NextResponse>;

const customMiddleware: CustomMiddleware = async req => {
  console.log('Custom middleware executed before next-intl');

  // Verifica se o cookie `preferredLocale` está presente
  const preferredLocale = req.cookies.get('preferredLocale')?.value;

  if (!preferredLocale) {
    // Define o cookie `preferredLocale` como "br" se não existir
    const response = NextResponse.next();
    response.cookies.set('preferredLocale', 'br', { path: '/' });
    return response;
  }

  // Verifica se a URL não contém o locale e redireciona para o locale preferido
  const pathname = req.nextUrl.pathname;

  // Caso a rota não contenha o prefixo do locale
  if (!locales.some(locale => pathname.startsWith(`/${locale}`))) {
    const url = req.nextUrl.clone();
    url.pathname = `/${preferredLocale}${pathname}`;
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
