/**
 * Алгоритм быстрой сортировки
 *
 * @param data Array
 * @param compare function(a, b) - возвращает 0 если a=b, -1 если a<b и 1 если a>b (необязательная)
 * @param change function(a, i, j) - меняет местами i-й и j-й элементы массива а (необязательная)
 *
 */
function qsort(data, compare, change) {
	var a = data,
		f_compare = compare,
		f_change  = change;

	if (!a instanceof Array) { // Данные не являются массивом
		return undefined;
	};
	if (f_compare == undefined) { // Будем использовать простую функцию (для чисел)
		f_compare = function(a, b) {return ((a == b) ? 0 : ((a > b) ? 1 : -1));};
	};
	if (f_change == undefined) { // Будем использовать простую смены (для чисел)
		f_change = function(a, i, j) {var c = a[i];a[i] = a[j];a[j] = c;};
	};

	var qs = function (l, r)  {
		var i = l,
			j = r,
			x = a[l+r>>1];
		//x = a[Math.floor(Math.random()*(r-l+1))+l];
		// x = a[l]; // Если нет желания использовать объект Math


		while(i <= j) {
			while(f_compare(a[i], x) == -1) {i++;}
			while(f_compare(a[j], x) == 1) {j--;}
			if(i <= j) {f_change(a, i++, j--);}
		};
		if(l < j) {qs(l, j);}
		if(i < r) {qs(i, r);}
	};

	qs(0, a.length-1);

	return a;
};