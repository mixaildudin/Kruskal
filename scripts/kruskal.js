function Kruskal( adjMatrix ) {

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
	var edges, vertices;

	this.getSpanningTree = function() {
		vertices = createVertexList();
		edges = createEdgeList();
		edges = qsort( edges, compareEdges, null );

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

	/**
	 * Создать список всех вершин графа, попутно присвоив им номера и неповтоярющиеся цвета
	 * @returns {Array} Список вершин
	 */
	function createVertexList() {
		var vert = [];
		for ( var i = 0; i < adjMatrix.length; i++ )
			vert.push( new Vertex(i, i) );

		return vert;
	}

	/**
	 * Пройтись по матрице смежности и вернуть список ребер с их весами
	 * @returns {Array} Массив объектов Edge
	 */
	function createEdgeList() {
		var edges = [];
		for ( var i = 0; i < adjMatrix.length; i++ ) {
			for ( var j = 0; j <= i; j++ ) {
				if( adjMatrix[i][j] == 0 ) //если вершины несмежные
					continue;
				else
					edges.push( new Edge( vertices[j], vertices[i], adjMatrix[i][j] ) );
			}
		}
		return edges;
	}

	this.getEdges = function() {
		return edges;
	}

	this.getVertices = function() {
		return vertices;
	}

	this.getSpanningTreeWeight = function() {
		return spanTreeWeight;
	}

}