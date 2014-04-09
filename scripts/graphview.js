function GraphView( vertices, edges ) {

	var verticesToDraw = initVerticesToDraw(),
		edgesToDraw = initEdgesToDraw();

	/**
	 * Нарисовать граф и его минимальное остовное дерево
	 */
	this.draw = function() {
		drawEdges();
		drawVertices();
	}


	/**
	 * Инициализирует массив объектов, содержащих svg-элементы, которые отображают вершины графа и их номера
	 * @returns {Array} Массив объектов для функции GraphView.drawVertices()
	 */
	function initVerticesToDraw() {
		verticesToDraw = [];
		var GRAPH_RADIUS = 330;
		var VERTEX_RADIUS = 17;

		var xCenter = parseInt( $('svg').css('width') ) / 2,
			yCenter = parseInt( $('svg').css('height') ) / 2;

		var angularStep = 2 * Math.PI / vertices.length;

		for( var i = 0, angle = 0; i < vertices.length;  ) {
			var vertex = vertices[i];
			var x = GRAPH_RADIUS * Math.cos(angle) + xCenter,
				y = GRAPH_RADIUS * Math.sin(angle) + yCenter;

			var newVertice = createNewVertice( x, y, VERTEX_RADIUS ),
				newVertNumber = createNewVertNumber( vertex.getNumber(), x, y );

			verticesToDraw.push( {
				'vertice': newVertice,
				'number': newVertNumber
			});

			i++; angle += angularStep;
		}

		return verticesToDraw;
	}

	/**
	 * Создает svg-элемент, который будет отображать вершину графа
	 * @param x
	 * @param y
	 * @param rad
	 * @returns {HTMLElement}
	 */
	function createNewVertice( x, y, rad ) {
		var newVertice = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		newVertice.setAttribute( 'cx', x + 'px' );
		newVertice.setAttribute( 'cy', y + 'px' );
		newVertice.setAttribute( 'r', rad + 'px' );
		newVertice.setAttribute( 'stroke', 'darkred' );
		newVertice.setAttribute( 'fill', '#EEB5AA' );
		newVertice.setAttribute( 'fill', '#EEB5AA' );

		return newVertice;
	}

	/**
	 * Создает svg-элемент, который будет отображать номер вершины графа
	 * @param num
	 * @param x
	 * @param y
	 * @returns {HTMLElement}
	 */
	function createNewVertNumber( num, x, y ) {
		var X_SHIFT = -6;
		var newNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		newNumber.setAttribute('x', (x + X_SHIFT) + 'px' );
		newNumber.setAttribute('y', y );

		var textNode = document.createTextNode( num );
		newNumber.appendChild(textNode);

		return newNumber;
	}

	/**
	 * Инициализирует массив объектов, содержащих svg-элементы, которые отображают вершины ребра графа и их веса
	 * @returns {Array} Массив объектов для функции GraphView.drawEdges()
	 */
	function initEdgesToDraw() {
		edgesToDraw = [];

		for( var i = 0; i < edges.length; i++ ) {
			var edge = edges[i];
			var x1 = verticesToDraw[ edge.getBegin().getNumber() ].vertice.getAttribute('cx'),
				x2 = verticesToDraw[ edge.getEnd().getNumber() ].vertice.getAttribute('cx'),
				y1 = verticesToDraw[ edge.getBegin().getNumber() ].vertice.getAttribute('cy'),
				y2 = verticesToDraw[ edge.getEnd().getNumber() ].vertice.getAttribute('cy');
			var col = edge.isInSpanTree() ? '#f00' : '#c0c0c0';

			var newEdge = createNewEdge( x1, x2, y1, y2, col );
			var newEdgeWeight = createNewEdgeWeight( (parseInt(x1)+parseInt(x2))/2, (parseInt(y1)+parseInt(y2))/2, edge.getWeight() );

			edgesToDraw.push({
				'edge': newEdge,
				'weight': newEdgeWeight
			});
		}

		return edgesToDraw;
	}

	/**
	 * Создает svg-элемент, который будет отображать ребро графа
	 * @param x1
	 * @param x2
	 * @param y1
	 * @param y2
	 * @param col
	 * @returns {HTMLElement}
	 */
	function createNewEdge( x1, x2, y1, y2, col ) {
		var newEdge = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		newEdge.setAttribute( 'x1', x1 );
		newEdge.setAttribute( 'x2', x2 );
		newEdge.setAttribute( 'y1', y1 );
		newEdge.setAttribute( 'y2', y2 );
		newEdge.setAttribute( 'stroke', col );
		newEdge.setAttribute( 'fill', col );

		return newEdge;
	}

	/**
	 * Создать svg-элемент, который будет отображать вес ребра
	 * @param x
	 * @param y
	 * @param weight
	 * @returns {HTMLElement}
	 */
	function createNewEdgeWeight( x, y, weight ) {
		var X_SHIFT = -6, Y_SHIFT = 3;
		var newNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		newNumber.setAttribute('x', (x + X_SHIFT) + 'px' );
		newNumber.setAttribute('y', (y + Y_SHIFT) + 'px');

		var textNode = document.createTextNode( weight );
		newNumber.appendChild(textNode);

		return newNumber;
	}

	/**
	 * Отрисовать вершины графа и их номера
	 */
	function drawVertices() {
		var svg = document.getElementsByTagName('svg')[0];

		for( var i = 0; i < verticesToDraw.length; i++ ) {
			var v = verticesToDraw[i];
			svg.appendChild( v.vertice );
			svg.appendChild( v.number );
		}
	}

	/**
	 * Отрисовать ребра графа и их веса
	 */
	function drawEdges() {
		var svg = document.getElementsByTagName('svg')[0];

		for( var i = 0; i < edgesToDraw.length; i++ ) {
			var e = edgesToDraw[i];
			svg.appendChild( e.edge );
			svg.appendChild( e.weight );
		}
	}

}