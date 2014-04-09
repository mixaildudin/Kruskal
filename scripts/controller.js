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

	this.start = function() {
		var adj = retrieveAdjMatrix();

		var kruskal = new Kruskal( adj );
		var spanningTree = kruskal.getSpanningTree();

		console.log( spanningTree );

		var view = new GraphView( kruskal.getVertices(), kruskal.getEdges() );
		view.draw();

		alert( "Найдено минимальное остовное дерево длины " + kruskal.getSpanningTreeWeight() );
	}

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
}