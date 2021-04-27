import setCookieParser from 'set-cookie-parser';
import Cookies from 'universal-cookie';

export const setCookie = (ctx, name, value, options) => {
  if (ctx && ctx.res && ctx.res.getHeader && ctx.res.setHeader) {
    let cookies = ctx.res.getHeader('Set-Cookie') || [];

    if (typeof cookies === 'string') cookies = [cookies];
    if (typeof cookies === 'number') cookies = [];

    const parsedCookies = setCookieParser.parse(cookies);
    const cookiesToSet = [];
    // @TODO set cookie
    if (!ctx.res.finished) {
      ctx.res.setHeader('Set-Cookie', cookiesToSet);
    }
  } else {
    new Cookies().set(name, value, options);
  }
};

export const removeCookie = (name) => {
  new Cookies().remove(name);
};

export default {
  setCookie,
  removeCookie,
};
