var config = {
	name: 'qbit',
	url: "https://github.com/api/v2/json/repos/show/"
};


var createSubPage = function( data, fn ) {

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

	var readmediv = $( '<div>' );
	readmediv.load( 'https://github.com/' + config.name +'/' + data.name + '/master/README.md' );

	var id = data.name.replace( /\./g, '_' );
	var title = $( '<h3></h3>' );
	title.addClass( 'normal' );

	title.html( data.name );
	$('#'+id).append( title )
		.append( statul )
		.append( descdiv )
		.append( readmediv );

	if ( fn ) {
		fn.call();
	}
};


$( 'document' ).ready( function() {
	var tabs = $( '#tabs' );
	var tc = $( '#tc' );
	var tt = $( '#tt' );
	var count = 0;

	tt.addClass( 'nav nav-tabs' );
	tc.addClass( 'tab-content' );

	tabs.addClass( 'tabbable tabs-left' );
	$.ajax({
		type: "GET",
		url: config.url + config.name,
		dataType: "jsonp",
		success: function( result ) {

			result.repositories = result.repositories.sort( function( a, b ) {
				var da = new Date( a.pushed_at ),
					db = new Date( b.pushed_at );
				if ( da > db ) return -1;
				if ( da < db ) return 1;
				return 0;
			});

			$.each( result, function( i, val ) {
				$.each( val, function( i, r ) {
					// Populate the tabs 
					var friendly_name = r.name.replace( /\./g, '_' );
					var a = $( '<a></a>' );
					var li = $('<li></li>');
					var div = $('<div></div>');

					a.attr( 'data-toggle', 'tab' );

					div.attr( 'id', friendly_name );

					div.addClass( 'tab-pane' );

					a.attr( 'href', '#' + friendly_name );
					a.html( r.name );

					if ( count === 0 ) {
					}

					li.append( a );
					tt.append( li );
					tc.append( div );

					createSubPage( r );

					count++;
				});
			});
		}
	});
});
