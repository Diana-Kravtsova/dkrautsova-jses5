function flatter(arrays){
	return arrays.reduce((array, element) => {
		return array.concat(element);
	});
}
