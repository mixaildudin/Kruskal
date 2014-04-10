function Controller() {

	/**
	 * (Пере)создать таблицу для ввода матрицы смежности
	 * @param n Размерность
	 */
	this.createAdjMatrix = function( n ) {
		var $matrix = $('#adj_matrix');

		var $tr = $('<tr></tr>').appendTo( $matrix );
		$tr.append( '<td></td>' );
		for( var i = 0; i < n; i++ ) {
			$tr.append( '<td align="center">' + i + '</td>' );
		}

		for( var i = 0; i < n; i++ ) {
			var $tr = $('<tr></tr>').appendTo( $matrix );
			$tr.append( '<td align="center">' + i + '</td>' );
			for( var j = 0; j < n; j++ ) {
				$tr.append( '<td align="center"><input class="adj_matr_input" type="text" /></td>');
			}
		}
		addChangeHandler();
	}

	this.deleteAdjMatrix = function() {
		$('#adj_matrix').empty();
	}

	/**
	 * Функция для ускорения заполнения матрицы (т.к. она симметричная)
	 */
	function addChangeHandler() {
		$('#adj_matrix input').keyup( function() {
			var i = $(this).parent().parent().index();
			var j = $(this).parent().index();

			$('#adj_matrix tr:eq(' + j + ') td:eq(' + i + ') > input').val( $(this).val() );
		});
	}

	var adjMatrix;
	var vertices, edges;
	
	this.start = function() {
		adjMatrix = retrieveAdjMatrix();
		vertices = createVertexList();
		edges = createEdgeList();

		var kruskal = new Kruskal( vertices, edges );
		var spanningTree = kruskal.getSpanningTree();

		console.log( spanningTree );

		var view = new GraphView( vertices, edges );
		view.draw();

		alert( "Найдено минимальное остовное дерево длины " + kruskal.getSpanningTreeWeight() );
	}

	/**
	* Забрать с формы матрицу смежности
	* @returns {Array} Матрица смежности графа
	*/
	function retrieveAdjMatrix() {
		var adj = [];

		$('#adj_matrix tr').each( function(i) {
			if( $(this).find('input').length > 0 ) {
				adj.push( [] );
				$(this).find('input').each( function(j) {
					if( $(this).val() == '' )
						adj[ adj.length-1 ].push( 0 );
					else
						adj[ adj.length-1 ].push( +$(this).val() );
				});
			}
		});

		return adj;
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
	
}