import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n';
import { localePrefix } from './navigation';

type CustomMiddleware = (req: NextRequest) => Promise<NextRequest | NextResponse>;

const customMiddleware: CustomMiddleware = async req => {
  console.log('Custom middleware executed before next-intl');

  // verifica se o cookie `preferredLocale` está presente
  const preferredLocale = req.cookies.get('preferredLocale')?.value;

  if (!preferredLocale) {
    // seta o cookie `preferredLocale` como "br" se não existir
    const response = NextResponse.next();
    response.cookies.set('preferredLocale', 'br', { path: '/' });
    return response;
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

  // se `customMiddleware` retornar `NextResponse`, usar essa resposta
  if (result instanceof NextResponse) {
    return result;
  }

  // caso contrário, continuar com o `intlMiddleware`
  return intlMiddleware(result);
}

export const config = {
  matcher: ['/', '/(br|en)/:path*']
};
