_context.invoke('Nittro.Routing', function (DOM) {

    var DOMRoute = _context.extend('Nittro.Object', function (selector) {
        DOMRoute.Super.call(this);
        this._.selector = selector;

    }, {
        match: function () {
            var matches = DOM.find(this._.selector);

            if (matches.length) {
                this.trigger('match', matches);

            }
        }
    });

    _context.register(DOMRoute, 'DOMRoute');

}, {
    DOM: 'Utils.DOM'
});
