describe('Pokemon factory', function() {
    var Pokemon, $q, $httpBackend;

    var API = 'http://pokeapi.co/api/v2/pokemon/';

    var RESPONSE_SUCCESS = {
        'id': 25,
        'name': 'pikachu',
        'sprites': {
            'front_default': 'http://pokeapi.co/media/sprites/pokemon/25.png'    
        },
        'types': [
            {'type': { 'name': 'electric' }}
        ]
    };

    var RESPONSE_ERROR = {
        'detail': 'Not found.'
    };

    //load the api.pokemon module 
    beforeEach(angular.mock.module('api.pokemon'));

    //Inject the Pokemon service, and $q and $httpBackend for Testing HTTP requests
    beforeEach(inject(function(_Pokemon_, _$q_, _$httpBackend_) {
        Pokemon = _Pokemon_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
    }));

    //Verify thing exists
    it('Should exist', function() {
        expect(Pokemon).toBeDefined();
    });

    describe('findByName()', function() {
        var result;

        beforeEach(function() {
            //Initialize our local result object to an empty object before each test
            result = {};

            // Spy on our service call but allow it to continue to its implementation
            spyOn(Pokemon, "findByName").and.callThrough();
        });

        it('Should return a Pokemon when called with a valid name', function() {
            var search = 'pikachu';

            // Declare the endpoint we expect our service to hit and provide it with our mocked return values
            $httpBackend.whenGET(API + search).respond(200, $q.when(RESPONSE_SUCCESS));

            expect(Pokemon.findByName).not.toHaveBeenCalled();
            expect(result).toEqual({});

            Pokemon.findByName(search).then(function(res) {
                result = res;
            });

            // Flush pending HTTP requests
            $httpBackend.flush();

            expect(Pokemon.findByName).toHaveBeenCalledWith(search);
            expect(result.id).toEqual(25);
            expect(result.name).toEqual('pikachu');
            expect(result.sprites.front_default).toContain('.png');
            expect(result.types[0].type.name).toEqual('electric');
        });

        it('Should return a 404 when called with an invalid name', function() {
            //setup data
            var search = 'godzilla';

            //setup mocks
            $httpBackend.whenGET(API + search).respond(404, $q.reject(RESPONSE_ERROR));

            expect(Pokemon.findByName).not.toHaveBeenCalled();
            expect(result).toEqual({});

            //Update chained method to catch
            Pokemon.findByName(search).catch(function(res) {
                result = res;
            });

            $httpBackend.flush();

            expect(Pokemon.findByName).toHaveBeenCalledWith(search);
            expect(result.detail).toEqual('Not found.');
        });

    });

});