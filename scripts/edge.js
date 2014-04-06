function Edge( begin, end, weignt ) {
	this.b = begin; this.e = end; this.w = weignt;
	this.getBegin = function() {
		return begin;
	};

	this.getEnd = function() {
		return end;
	};
}