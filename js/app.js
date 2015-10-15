/**
 * Created by aramirez92 on 15/10/15.
 */
'use strict';

angular.module('lapmedia',[])
    .directive('modal',function(){
        return {
            template: '' +
            '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{title}}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '<div class="modal-footer" ng-show="type==\'login\'">'+
            '<button type="button" class="btn btn-default" ng-click="$root.login()">{{confirm}}</button>'+
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>',
            restrict: 'E',
            transclude: true,
            replace:true,
            scope:true,
            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;
                scope.type = attrs.type;
                scope.confirm = attrs.confirm;
                scope.cancel = attrs.cancel;

                scope.$watch(attrs.visible, function(value){
                    if(value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };
    })
	.run(function($rootScope){
		$rootScope.showModal = false;
		$rootScope.modalContact = function(){
			$rootScope.showModal = !$rootScope.showModal;
		}
	});