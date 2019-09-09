// 즉시 실행 모듈
// API를 반환하는 건 임의 모듈과 같지만, 외부 함수를 선언하자마자 실행함
// 반환된 API는 이름공간을 가진 전역 변수에 할단된 후
// 해당 모듈의 싱글톤 인스턴스가 된다

var MyApp = MyApp || {};

MyApp.wildlifePreserveSimulator = (function() {
  var animals = [];
  
  return {
    addAnimal: function(animalMaker, species, sex) {
      animals.push(animalMaker.make(species, sex));
    },
    getAnimalCount: function() {
      return animals.length;
    }
  }
}());


// 싱글톤은 이렇게 사용한다.
MyApp.wildlifePreserveSimulator.addAnimal(realAnimalMaker, gorilla, female);
// 외부 함수는 애플리케이션 기동 코드의 실행과 상관없이 코드가 작성된 지점에서 즉시 실행된다
// 따라서 함수 (즉시) 실행 시, 의존성을 가져오지 못하면 외부 함수에 주입할 수 없다.
// 싱글톤이 꼭 필요하다면 임의 모듈 패턴으로 모듈을 코딩하고 해당 모듈을 요청할 때마다
// 의존성 주입 프레임워크에서 같은 인스턴스를 제공하는 편이 의존성 주입 측면에서 더 낫다.