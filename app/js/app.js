import angular from 'angular';
import appModule from 'config';
import './css/main.scss';
// require('./module.js');

angular.bootstrap(document, [appModule.name]);