// TOOD - patch
//setAttribute, setAttributeNS, innerHTML, outerHTML, insertAdjeacentHTML, append, prepend, insertAdjacentElement, appendChild, insertBefore, and replaceChild
import rewriteURL from "../rewrite/lib/url";
import $config from "../config";


let attrToRewrite = new Set([
    "src",
    "href",
    "action",
    "formaction",
    "longdesc",
    "background",
    "cite",
    "data",
    "profile",
    "xlink:href",
    "usemap",
    "manifest",
    "archive",
    "codebase",
    "poster",
]);

function getOrigin(url: any) {
  if (!url.pathname.startsWith($config.prefix)) return false;
  return $config.decodeUrl(url.pathname.slice($config.prefix.length));
}

function rewriteValue(value: string) {
  return rewriteURL(value, getOrigin(location.href));
}

window.Element.prototype.getAttribute = new Proxy(window.Element.prototype.getAttribute, {
    apply(target, thisArg, args) {
        if (args[0] && thisArg.hasAttribute(`celari-origattr-${args[0]}`)) {
            args[0] = `celari-origattr-${args[0]}`           
        }
        return Reflect.apply(target, thisArg, args);
    }
})