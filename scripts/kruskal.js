function Kruskal() {

	var adjMatrix = [
		[0, 7, 0, 5, 0, 0, 0],
		[7, 0, 8, 9, 7, 0, 0],
		[0, 8, 0, 0, 5, 0, 0],
		[5, 9, 0, 0, 15, 6, 0],
		[0, 7, 5, 15, 0, 8, 9],
		[0, 0, 0, 6, 8, 0, 11],
		[0, 0, 0, 0, 9, 11, 0]
	];

	this.start = function() {
		var edges = createEdgeList();
	}

	function createEdgeList() {
		var edges = [];
		for ( var i = 0; i < adjMatrix.length; i++ ) {
			for ( var j = 0; j <= i; j++ ) {
				if( adjMatrix[i][j] == 0 ) //если вершины несмежные
					continue;
				var vertice1 = new Vertice(j),
					vertice2 = new Vertice(i);
				var edge = new Edge( vertice1, vertice2, adjMatrix[i][j] );
				edges.push( edge );
			}
		}
		return edges;
	}

}

