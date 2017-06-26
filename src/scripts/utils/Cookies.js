/**
 * Used for interfacing with cookie storage data
 * @module      utils/Cookies
 * @copyright   Copyright (c) 2017 Hulu
 */
const Cookies = {
  /* eslint-disable prefer-template, no-loops/no-loops */

  /**
   * Checks to see if user has cookies enabled in their browser
   * @return {Boolean} Returns true if cookies are enabled and false if not
   */
  isEnabled: function() {
    this.set('test_cookies_enabled', true);
    return this.get('test_cookies_enabled');
  },

  /**
   * Read a cookie
   * @param  {String} key The name of the cookie to read
   * @return {String}     String representing the cookie value
   */
  get: function(key) {
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
  },

  /**
   * Create/overwrite a cookie
   * @param {String} key                    The name of the cookie to create/overwrite
   * @param {String} val                    The value of the cookie
   * @param {[Number, String, Date]} end    (Optional) The max-age in seconds (e.g. 31536e3 for a year, Infinity for a never-expires cookie), or the expires date in GMTString format or as Date object
   * @param {String} path                   (Optional) The path from where the cookie will be readable
   * @param {String} domain                 (Optional) The domain from where the cookie will be readable
   * @param {Boolean} secure                (Optional) The cookie will be transmitted only over secure protocol as https
   * @return {Boolean}                      Returns true after setting the cookie
   */
  set: function(key, val, end, path, domain, secure) {
    if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
      return false;
    }
    let sExpires = '';
    if (end) {
      switch(end.constructor) {
        case Number:
          sExpires = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : `; max-age=${end}`;
          break;
        case String:
          sExpires = `; expires=${end}`;
          break;
        case Date:
          sExpires = `; expires=${end.toUTCString()}`;
          break;
        default:
          break;
      }
    }
    document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(val) + sExpires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');
    return true;
  },

  /**
   * Delete a cookie
   * @param  {String} key     The name of the cookie to remove
   * @param  {String} path    (Optional) E.g., "/", "/mydir"; if not specified, defaults to the current path of the current document location
   * @param  {String} domain  (Optional) E.g., "example.com", ".example.com" (includes all subdomains) or "subdomain.example.com"
   * @return {Boolean}        Returns true after completion of removal
   */
  remove: function(key, path, domain) {
    if (!key || !this.has(key)) {
      return false;
    }
    document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '');
    return true;
  },

  /**
   * Check whether a cookie exists in the current position
   * @param  {String}  key  The name of the cookie to test
   * @return {Boolean}      Returns boolean representing whether or not the cookie exists
   */
  has: function(key) {
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
  },

  /**
   * Returns an array of all readable cookies from this location
   * @return {Array} Returns an array of exisitng cookies and their values
   */
  keys: function() {
    const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    for(let nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
};

export default Cookies;
