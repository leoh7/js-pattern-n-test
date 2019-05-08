describe('Aop', () => {
  describe('Aop.around(fnName, advice, targetObj)', () => {
    it('타깃 함수를 호출 시, 어드바이스를 실행하도록 한다', () => {
      // 테스트의 신호등 역할
      var excutedAdvice = false;
      var advice = function() {
        excutedAdvice = true;
      };
      advice();
      expect(excutedAdvice).toBe(true);
    });
  });
  
});
