describe('Aop', () => {
  Aop = {
    around: function(fnName, advice, fnObj) {
      fnObj[fnName] = advice;
    }
  }
  
  var targetObj,
      executionPoints;
  beforeEach(function() {
    executionPoints = [];
    targetObj = {
      targetFn: function () {
        executionPoints.push('targetFn');
      }
    }
  });

  describe('Aop.around(fnName, advice, targetObj)', () => {
    it('타깃 함수를 호출 시, 어드바이스를 실행하도록 한다', () => {
      // 테스트의 신호등 역할
      var excutedAdvice = false;
      var advice = function() {
        excutedAdvice = true;
      };
      Aop.around('targetFn', advice, targetObj);
      targetObj.targetFn();
      expect(excutedAdvice).toBe(true);
    });
    it('어드바이스가 타깃 호출을 래핑한다', () => {
      var wrappingAdvice = function(targetInfo) {
        executionPoints.push('wrappingAdvice - 처음');
        targetInfo.fn();
        executionPoints.push('wrappingAdvice - 끝');
      };
      Aop.around('targetFn', wrappingAdvice, targetObj);
      targetObj.targetFn();      
      expect(executionPoints).toEqual(
        ['wrappingAdvice - 처음', 'targetFn', 'wrappingAdvice - 끝']
      );
    });
  });
  
});
