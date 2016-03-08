
$scope.rules = [];
Rule.query({},function(r){
    $scope.rules = r;
});
$scope.model = {
    type:type,
};
$scope.modelError = {};

$scope.ok = function () {
    $scope.model.ruleName = $scope.model.ruleName.name;
    Item.save({},$scope.model,function(r){
        $scope.modelError = {};
        $modalInstance.close(r);
    },function(r){
        if (r.status == 422) {
            angular.forEach(r.data,function(err){
                $scope.modelError[err.field] = err.message;
            });
        }else{
            $scope.statusText = r.statusText;
        }
    });
};

$scope.cancel = function () {
    $modalInstance.dismiss('cancel');
};

$scope.closeAlert = function(){
    delete $scope.statusText;
}