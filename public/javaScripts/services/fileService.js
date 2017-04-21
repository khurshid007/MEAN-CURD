app.service('fileService',['$http',function ($http) {
	var fileServiceP = {}
	var baseUrl = '/api/fileService/';

	fileServiceP.uploadFile = function (file) {
			var fd  = new FormData();

			fd.append('file',file);

			$http.post(baseUrl + 'uploadFile',fd, {
			 transformRequest: angular.identity,
			
            headers: {'Content-Type': undefined}}).success(function (res) {
				return res;
			}).error(function (err) {
				return err;
			})
	};
	return fileServiceP;
}])	