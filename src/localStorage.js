(function ($localStorage, window, undefined) {

    var store = window.localStorage;
    var cookiePrefix = "localstorage__";

    $localStorage.add = function (key, value) {
        var encodedValue = JSON.stringify(value);

        if (store) {
            store.setItem(key, encodedValue);
        } else {
            storeCookie(key, encodedValue);
        }
    };

    $localStorage.get = function (key) {
        var value = store ? store.getItem(key) : getCookie(key);
        return JSON.parse(value);
    };

    $localStorage.remove = function (key) {
        if (store) {
            store.removeItem(key);
        } else {
            removeCookie(key);
        }
    };

    $localStorage.getAllKeys = function () {
        var key, values = [];

        if (store) {
            for (key in store) {
                values.push(key);
            }
        }
        else {
            return getAllCookies(cookiePrefix);
        }

        return values;
    };

    function getCookieKey(key) {
        return cookiePrefix + key;
    }

    function storeCookie(key, value) {
        document.cookie = getCookieKey(key) + "=" + value;
    }

    function getAllCookies(prefix) {
        var i, x, cookies = document.cookie.split(";");
        var keys = [];

        for (i = 0; i < cookies.length; i++) {
            x = cookies[i].substr(0, cookies[i].indexOf("="));
            x = x.replace(/^\s+|\s+$/g, "");

            if (x.indexOf(prefix) === 0) {
                var key = x.substr(prefix.length);
                keys.push(key);
            }
        }

        return keys;
    }

    function getCookie(key) {
        var i, x, y, cookies = document.cookie.split(";");
        var cname = getCookieKey(key);

        for (i = 0; i < cookies.length; i++) {
            x = cookies[i].substr(0, cookies[i].indexOf("="));
            y = cookies[i].substr(cookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == cname) {
                return unescape(y);
            }
        }
    }

    function removeCookie(key) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() - 1);
        document.cookie = getCookieKey(key) + "=''; expires=" + exdate.toUTCString();
    }

} (window.$localStorage = window.$localStorage || {}, window));