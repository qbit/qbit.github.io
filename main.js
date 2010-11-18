var createSubPage = function( data ) {
	console.log( data );
	var id = data.name.replace( /\./g, '_' );
	var watch = $( '<button></button>' );
	var title = $( '<h3></h3>' );

	title.html( $('<a></a>').attr( 'href', data.url ).val( data.name ) );
	watch.addClass( 'watchers' );
	watch.html( data.watchers + ' watching' );
	watch.click( function() {

	});
	$('#'+id).append( title ).append( data.description ).append( watch );
};

$(function() {
	var name = 'qbit';
	var url = "http://github.com/api/v2/json/repos/show/" + name + "/" ;
	$.ajax({
		type: "GET",
		url: url,
		dataType: "jsonp",
		success: function( result ) {
			var ul = $( '<ul></ul>' );
			$('#tabs').append( ul );
			$.each( result, function( i, val ) {
				$.each( val, function( i, r ) {
					var friendly_name = r.name.replace( /\./g, '_' );
					var a = $( '<a></a>' );
					var li = $('<li></li>');
					var div = $('<div></div>');

					div.attr( 'id', friendly_name );

					a.attr( 'href', '#' + friendly_name );
					a.html( r.name );

					li.append( a );
					ul.append( li );
					$('#tabs').append( div );
					createSubPage( r );
				});
			});
			$( "#tabs" ).tabs({ cookie: { expires: 7 } });
		}
	});
});
