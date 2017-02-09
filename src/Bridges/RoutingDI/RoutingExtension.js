_context.invoke('Nittro.Routing.Bridges.RoutingDI', function(Nittro) {

    var RoutingExtension = _context.extend('Nittro.DI.BuilderExtension', function(containerBuilder, config) {
        RoutingExtension.Super.call(this, containerBuilder, config)
    }, {
        STATIC: {
            defaults: {
                basePath: ''
            }
        },

        load: function () {
            var builder = this._getContainerBuilder(),
                config = this._getConfig(RoutingExtension.defaults);

            builder.addServiceDefinition('router', {
                factory: 'Nittro.Routing.Router()',
                args: config,
                run: true
            });
        },

        setup: function () {
            var builder = this._getContainerBuilder();

            if (builder.hasServiceDefinition('snippetManager')) {
                builder.getServiceDefinition('snippetManager')
                    .addSetup(function(router) {
                        this.on('after-update', router.matchDOM.bind(router));
                    });
            }

            if (builder.hasServiceDefinition('history')) {
                builder.getServiceDefinition('history')
                    .addSetup(function (router) {
                        this.on('savestate popstate', router.matchURL.bind(router));
                    });
            }
        }
    });

    _context.register(RoutingExtension, 'RoutingExtension');

});
