describe('Conversations factory', function() {
    
    var Conversations;

    beforeEach(angular.mock.module('api.users'));
    
    beforeEach(inject(function(_Conversations_) {
        Conversations = _Conversations_;
    }));
    
    it('should exist', function() {
        expect(Conversations).toBeDefined();
    });
    
});