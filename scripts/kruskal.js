function Kruskal( vertices, edges ) {

	/*var adjMatrix = [
		[0, 7, 0, 5, 0, 0, 0],
		[7, 0, 8, 9, 7, 0, 0],
		[0, 8, 0, 0, 5, 0, 0],
		[5, 9, 0, 0, 15, 6, 0],
		[0, 7, 5, 15, 0, 8, 9],
		[0, 0, 0, 6, 8, 0, 11],
		[0, 0, 0, 0, 9, 11, 0]
	];*/

	var spanTree, spanTreeWeight;

	this.getSpanningTree = function() {
		edges = edges.sort( compareEdges );

		spanTree = kruskalStart();

		return spanTree;
	}

	/**
	 * Построить остовное дерево, используя алгоритм с окрашиванием вершин графа
	 * @returns {Array} Массив ребер, входящих в остовное дерево
	 */
	function kruskalStart() {
		spanTree = [];
		spanTreeWeight = 0;

		for( var i = 0; i < edges.length; i++ ) {
			var edge = edges[i];
			var beginColor = edge.getBegin().getColor(),
				endColor = edge.getEnd().getColor();

			if( beginColor == endColor )
				continue;
			else {
				spanTree.push( edge );
				edge.setInSpanTree();
				spanTreeWeight += edge.getWeight();

				for( var j = 0; j < vertices.length; j++ ) {
					var vertex = vertices[j];
					if( vertex.getColor() == endColor )
						vertex.setColor( beginColor );
				}
				continue;
			}
		}

		return spanTree;
	}

	/**
	 * Функция сравнения вершин для быстрой сортировки
	 * @param e1 Edge
	 * @param e2 Edge
	 * @returns {number} 0, или -1, или 1
	 */
	function compareEdges( e1, e2 ) {
		var w1 = e1.getWeight(),
			w2 = e2.getWeight();

		if( w1 == w2 )
			return 0;

		return (w1 < w2) ? (-1) : (1);
	}

	this.getSpanningTreeWeight = function() {
		return spanTreeWeight;
	}

}