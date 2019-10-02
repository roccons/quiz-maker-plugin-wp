(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	 
	$(function() {
		var urlAddQuestions = "?page=qmaker&action=addQuestions&idQuiz="
	})

	$( window ).load(function() {
		console.log('hola')
	});

	 $('#create-quiz').on('click', function(e){
		e.preventDefault();
		console.log('hola btn..')

		//Evento ajax
		$.ajax({
			url:		qmaker.url,
			type:		'post',
			datatype:	'json',
			data: 		{
				action: 	'qm_add_quiz',
				nonce:		qmaker.seguridad,
				nombre:		'valor',
				tipo:		'add'
			},
			success: function(data){
				data = JSON.parse(data);
				if(data.result){
					console.log('Todo Ok!');
					// urlAddQuestions += data.insert_id;
					// setTimeout(function(){
					// 	location.href = urlAddQuestions;
					// }, 1300);
				}
				console.log('Resultado: ', data);
			},
			error: function(d, x, v){
				console.log(d)
				console.log(x)
				console.log(v)
			}
		})
	 })
})( jQuery );
