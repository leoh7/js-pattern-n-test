// 임의 모듈 생성
// 해당 애플리케이션에서만 사용할 수 있는 모든 객체(모듈)를 담아 넣은
// 전역 객체를 선언하여 이름공간처럼 활용한다.
var MyApp = MyApp || {};

// 애플리케이션 이름공간에 속한 모듈
// 이 함수는 animalMaker라는 다른 함수에 의존하며 animalMaker 는 주입 가능하다
MyApp.wildlifePreserveSimulator = function(animalMaker) {
  // 프라이빗 변수
  var animals = [];

  // API를 반환
  return {
    addAnimal: function(species, sex) {
      animals.push(animalMaker.make(species, sex));
    },
    getAnimalCount: function() {
      return animals.length();
    }
  };
};

// 모듈은 다음과 같이 사용된다
var preserve = MyApp.wildlifePreserveSimulator(realAnimalMaker);
preserve.addAnimal(gorilla, female);