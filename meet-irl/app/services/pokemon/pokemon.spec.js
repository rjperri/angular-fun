describe('Pokemon factory', function() {
    var Pokemon;

    //load the api.pokemon module 
    beforeEach(angular.mock.module('api.pokemon'));

    //Inject the Pokemon service
    beforeEach(inject(function(_Pokemon_) {
        Pokemon = _Pokemon_;
    }));

    //Verify thing exists
    it('Should exist', function() {
        expect(Pokemon).toBeDefined();
    });

});