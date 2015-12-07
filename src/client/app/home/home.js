(function() {
  'use strict';

  angular
    .module('app')
    .controller('Home', Home);

  function Home() {
    var vm = this;

    vm.title = 'Home Controller';
    vm.fullName = 'Ryan Delaney';
  }
})();
