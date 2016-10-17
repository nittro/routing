_context.invoke('Nittro.Routing', function (DOMRoute, URLRoute, Url) {

    var Router = _context.extend('Nittro.Object', function (basePath) {
        Router.Super.call(this);

        this._.basePath = '/' + basePath.replace(/^\/|\/$/g, '');
        this._.routes = {
            dom: {},
            url: {}
        };
    }, {
        getDOMRoute: function (selector) {
            if (!(selector in this._.routes.dom)) {
                this._.routes.dom[selector] = new DOMRoute(selector);

            }

            return this._.routes.dom[selector];

        },

        getURLRoute: function (mask) {
            if (!(mask in this._.routes.url)) {
                this._.routes.url[mask] = new URLRoute(mask);

            }

            return this._.routes.url[mask];

        },

        matchAll: function () {
            var k, url = Url.fromCurrent();

            if (url.getPath().substr(0, this._.basePath.length) === this._.basePath) {
                url.setPath(url.getPath().substr(this._.basePath.length));

                for (k in this._.routes.url) {
                    this._.routes.url[k].match(url);

                }
            }

            for (k in this._.routes.dom) {
                this._.routes.dom[k].match();

            }
        }
    });

    _context.register(Router, 'Router');

}, {
    Url: 'Utils.Url'
});
