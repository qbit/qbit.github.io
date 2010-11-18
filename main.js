var config = {
	name: 'qbit',
	url: "http://github.com/api/v2/json/repos/show/"
};

var createSubPage = function( data ) {
	console.log( data );

	var statul = $('<ul></ul>' );
	statul.addClass( 'repo-stats' );

	var wli = $( '<li></li>' );
	wli.addClass( 'watchers watching' );
	wli.html( $('<a></a>').addClass(  'tooltipped downwards' ).html( data.watchers ) );
	wli.html( $('<a></a>').attr( 'href', 'https://github.com/' + config.name + '/' + data.name + '/watchers' ).addClass(  'tooltipped downwards' ).html( data.watchers ) );

	var fli = $( '<li></li>' );
	fli.addClass( 'forks' );
	fli.html( $('<a></a>').attr( 'href', 'https://github.com/' + config.name + '/' + data.name + '/network' ).addClass(  'tooltipped downwards' ).html( data.forks ) );

	statul.append( wli ).append( fli );

	var descdiv = $( '<div></div>' );
	descdiv.html( data.description );

	var id = data.name.replace( /\./g, '_' );
	var title = $( '<h3></h3>' );
	title.addClass( 'normal' );

	title.html( data.name );
	$('#'+id).append( title )
		.append( statul )
		.append( descdiv );
};

$(function() {
	$.ajax({
		type: "GET",
		url: config.url + config.name,
		dataType: "jsonp",
		success: function( result ) {
			var ul = $( '<ul></ul>' );
			$('#tabs').append( ul );
			$.each( result, function( i, val ) {
				$.each( val, function( i, r ) {
					// Populate the tabs 
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
