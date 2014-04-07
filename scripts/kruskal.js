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

	var verticesInSpanTree; //множество вершин в остовном дереве (для быстрой проверки на цикл)
	var edgesInSpanTree;
	var edges;

	this.start = function() {
		verticesInSpanTree = {};
		edgesInSpanTree = [];

		edges = createEdgeList();
		edges = qsort( edges, compareEdges, null );

		for( var i = 0; i < edges.length; i++ ) {
			var edge = edges[i];
			var containsLoop = checkLoops( edge );
			if( !containsLoop ) {
				edgesInSpanTree.push( edge );
				verticesInSpanTree[ edge.getBegin().getNumber() ] = edge.getBegin().getNumber();
				verticesInSpanTree[ edge.getEnd().getNumber() ] = edge.getEnd().getNumber();
			}
			else
				continue;
		}

		return edgesInSpanTree;
	}

	/**
	 * Функция сравнения вершин для быстрой сортировки
	 * @param e1 Edge
	 * @param e2 Edge
	 * @returns {number} 0, или -1, или 1
	 */
	function compareEdges( e1, e2 ) {
		var w1 = e1.getWeight(); var w2 = e2.getWeight();

		if( w1 == w2 )
			return 0;

		return (w1 < w2) ? (-1) : (1);
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
				var vertice1 = new Vertice(j),
					vertice2 = new Vertice(i);
				var edge = new Edge( vertice1, vertice2, adjMatrix[i][j] );
				edges.push( edge );
			}
		}
		return edges;
	}

	function checkLoops( edge ) {
		var begin = edge.getBegin().getNumber(),
			end = edge.getEnd().getNumber();

		return ( begin in verticesInSpanTree ) && ( end in verticesInSpanTree );
	}

	/**
	 * Проинициализировать множества вершин, находящихся в остове, и ненаходящихся
	 * @param edges Array - Список всех ребер
	 */
	/*function initVerticeSets( edges ) {
		inSpanTree = {}; notInSpanTree = {};

		for ( var i = 0; i < edges.length; i++ ) {
			var edge = edges[i];
			var begin = edge.getBegin().getNumber(),
				end = edge.getEnd().getNumber();

			notInSpanTree[begin] = begin;
			notInSpanTree[end] = end;
		}
		return notInSpanTree;
	}*/

}