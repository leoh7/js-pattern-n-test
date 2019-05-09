describe('Aop', () => {
  Aop = {
    around: function(fnName, advice, fnObj) {
      var originalFn = fnObj[fnName];
      fnObj[fnName] = function() {
        var targetContext = {};
        advice.call(targetContext, {fn: originalFn,
                                    args: arguments});
      };
    }
  }
  
  var targetObj,
      executionPoints,
      argPassingAdvice, // 타겟에 인자를 전달할 어드바이스
      argsToTarget;    // targetObj.targetFn에 전달할 인자들

  beforeEach(function() {
    executionPoints = [];
    targetObj = {
      targetFn: function () {
        executionPoints.push('targetFn');
        argsToTarget = Array.prototype.slice.call(arguments, 0);
      }
    }
    argsToTarget = [];
    argPassingAdvice = function(targetInfo) {
      targetInfo.fn.apply(this, targetInfo.args);
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
    it('마지막 어드바이스가 기존 어드바이스에 대해 실행되는 방식으로 체이닝 할 수 있다', () => {
      var adviceFactory = function(adviceID) {
        return (function(targetInfo) {
          executionPoints.push('wrappingAdvice - 처음 ' + adviceID);
          targetInfo.fn();
          executionPoints.push('wrappingAdvice - 끝 ' + adviceID);
        });
      };
      Aop.around('targetFn', adviceFactory('안쪽'), targetObj);
      Aop.around('targetFn', adviceFactory('바깥쪽'), targetObj);
      targetObj.targetFn();
      
      expect(executionPoints).toEqual([
        'wrappingAdvice - 처음 바깥쪽',
        'wrappingAdvice - 처음 안쪽',
        'targetFn',
        'wrappingAdvice - 끝 안쪽',
        'wrappingAdvice - 끝 바깥쪽'
      ]);
    });
    it('어드바이스에서 타깃으로 일반 인자를 넘길 수 있다', () => {
      Aop.around('targetFn', argPassingAdvice, targetObj);
      targetObj.targetFn('a', 'b');
      expect(argsToTarget).toEqual(['a', 'b']);
    })
  });
  
});
