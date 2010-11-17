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
					// set info for the divs
					div.append( $('<p></p>').html( r.name + " was created on: " + r.created_at ));
					div.append( $('<p></p>').html( r.description ));
					div.append( $('<p></p>').html( "git clone git@github.com:" + name + "/" + r.name + ".git" ));

					a.attr( 'href', '#' + friendly_name );
					a.html( r.name );

					li.append( a );
					ul.append( li );
					$('#tabs').append( div );
				});
			});
			$( '#tabs').tabs();
		}
	});
});
