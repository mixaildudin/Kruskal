function Edge( begin, end, weight ) {

	var inSpanTree = false;

	this.getBegin = function() {
		return begin;
	};

	this.getEnd = function() {
		return end;
	};

	this.getWeight = function() {
		return weight;
	}

	this.setInSpanTree = function() {
		inSpanTree = true;
	}

	this.isInSpanTree = function() {
		return inSpanTree;
	}

}