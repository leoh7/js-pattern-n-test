describe('DiContainer', function() {
  var container;
  beforeEach(function() {
    container = new DiContainer();
  });

  describe('register(name, dependencies,func)', function() {
    // 01
    it('인자가 하나라도 빠졌거나 타입이 잘못되면 예외를 던진다', function() {
      var badArgs = [
        // 인자가 아예 없는 경우
        [],
        // name만 있는 경우
        ['Name'],
        // name과 dependencies만 있는 경우
        ['Name', ['Dependency1', 'Dependency2']],
        // dependencies가 빠진 경우
        // (상용 프레임워크는 지원하지만, DiContainer는 지원하지 않음)
        ['Name', function() {}],
        // 타입이 잘못된 다양한 사례들
        [1, ['a', 'b'], function() {}],
        ['Name', [1, 2], function() {}],
        ['Name', ['a', 'b'], 'should be a function']
      ];

      badArgs.forEach(function(args) {
        expect(function() {
          // apply는 해당 함수(register)를 주어진 'this'(container) context로, 
          // 콤마로 나뉜 일반 함수 호출과 달리 배열 타입의 인자(args)를 넘겨 호출하는 함수다
          container.register.apply(container, args);  
        }).toThrowError(container.messages.registerRequiresArgs);
      });
    });

  });

});