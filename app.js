$('form').submit(function(e) {
	e.preventDefault();
	var postUrl = $('#post-url').val();
	var autoReply = $('#auto-reply').val();
	// Use AJAX to send the data to the server
	$.ajax({
		type: 'POST',
		url: '/api/auto-reply',
		data: { postUrl: postUrl, autoReply: autoReply },
		success: function(data) {
			alert(data.message);
		},
		error: function(xhr, status, error) {
			alert(xhr.responseText);
		}
	});
});
