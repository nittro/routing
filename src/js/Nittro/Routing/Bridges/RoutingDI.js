_context.invoke('Nittro.Routing.Bridges', function(Nittro) {

    if (!Nittro.DI) {
        return;
    }

    var RoutingDI = _context.extend('Nittro.DI.BuilderExtension', function(containerBuilder, config) {
        RoutingDI.Super.call(this, containerBuilder, config)
    }, {
        STATIC: {
            defaults: {
                basePath: ''
            }
        },

        load: function () {
            var builder = this._getContainerBuilder(),
                config = this._getConfig(RoutingDI.defaults);

            builder.addServiceDefinition('router', {
                factory: 'Nittro.Routing.Router()',
                args: config,
                run: true
            });
        }
    });

    _context.register(RoutingDI, 'RoutingDI');

});
