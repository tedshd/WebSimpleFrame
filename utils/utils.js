/**
 * Retrieves the value of a query string parameter from the current page's URL.
 *
 * @param {string} name - The name of the query string parameter to retrieve.
 * @returns {string} The value of the query string parameter, or an empty string if the parameter is not found.
 *
 * @example
 * // URL: http://example.com/?foo=bar
 * getQueryString('foo'); // Returns: 'bar'
 *
 * @example
 * // URL: http://example.com/?foo=bar&baz=qux
 * getQueryString('baz'); // Returns: 'qux'
 *
 * @example
 * // URL: http://example.com/
 * getQueryString('foo'); // Returns: ''
 */
export function getQueryString(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * Detects the platform of the user's device based on the user agent string.
 *
 * @returns {string} The platform type: 'ios', 'android', 'desktop', or 'unknown'.
 *
 * @example
 * // If the user is on an iPhone
 * detectPlatform(); // Returns: 'ios'
 *
 * @example
 * // If the user is on an Android device
 * detectPlatform(); // Returns: 'android'
 *
 * @example
 * // If the user is on a Windows, Mac, or Linux desktop
 * detectPlatform(); // Returns: 'desktop'
 *
 * @example
 * // If the user is on an unknown platform
 * detectPlatform(); // Returns: 'unknown'
 */
export function detectPlatform() {
  const userAgent = window.navigator.userAgent;

  if (/iPhone|iPad|iPod/.test(userAgent)) {
    return 'ios';
  } else if (/Android/.test(userAgent)) {
    return 'android';
  } else if (/Windows|Mac|Linux/.test(userAgent)) {
    return 'desktop';
  }

  return 'unknown';
}