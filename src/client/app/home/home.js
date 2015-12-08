(function() {
  'use strict';

  angular
    .module('app')
    .controller('Home', Home);

  function Home() {
    var vm = this;

    vm.fullName = 'Ryan Delaney';
    vm.profession = 'Software Engineer';
  }
})();
