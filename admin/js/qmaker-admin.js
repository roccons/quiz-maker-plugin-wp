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
		
	})

	$( window ).load(function() {
		// console.log('hola')
	});

	var urlAddQuestions = "?page=qmaker&action=addquestions&idQuiz="
	var urlhome = "?page=qmaker"
	var $name = $('#inputName')
	var $descrition = $('#inputdescription')

	$('#create-quiz').on('click', function(e){
		e.preventDefault();
		console.log('name: ', $name.val() )
		console.log('descrition: ', $descrition.val() )
		if(!$name.val()){
			alert('Debes Agregar un nombre al Quiz')
		}else{
			//Evento ajax
			$.ajax({
				url:		qmaker.url,
				type:		'post',
				datatype:	'json',
				data: 		{
					action: 		'qm_add_quiz',
					nonce:			qmaker.seguridad,
					name:			$name.val(),
					description:	$descrition.val(),
					tipo:			'add'
				},
				success: function(data){
					data = JSON.parse(data);
					if(data.result){
						console.log('Todo Ok!');
						urlAddQuestions += data.insert_id;
						setTimeout(function(){
							location.href = urlAddQuestions;
						}, 200);
					}
					console.log('Resultado: ', data);
				},
				error: function(d, x, v){
					console.log(d)
					console.log(x)
					console.log(v)
				}
			})
		}
	 })


	 var $btnAddResponse = $('.addresponse-btn')
	 var $btnDeleResponse = $('.delete-answer-btn')
	 var $btnSaveResponse = $('.save-question-btn')

	 $btnAddResponse.live('click', function(e){
		var cont = $('.wrapper_anws').children().length + 1
		
		$( '.wrapper_anws' ).append(`
		 <div class="form-row border border-secondary mx-0 mt-2 py-2 px-4 item_answer">
			<div class="col-md-2 custom-checkbox d-flex align-items-center is_correct_response">
				<input type="checkbox" class="custom-control-input response_iscorrect" id="customCheck_${cont}">
				<label class="custom-control-label ml-3" for="customCheck_${cont}">Correcta</label>
			</div>
			<div class="col-md-8 text_response">
				<label for="inputName_${cont}">Respuesta:</label>
				<input type="text" class="form-control response_text" id="inputName_${cont}" placeholder="Respuesta">
			</div>
			<div class="col-md-2 d-flex align-items-center pt-2">
				<button type="button" class="btn btn-outline-danger delete-answer-btn">Quitar</button>
			</div>
		</div>
		 	`);
	 })


	 $btnDeleResponse.live('click', function(){
		console.log('del response 3')
		$(this).parent().parent().remove()
	 })

	 $btnSaveResponse.on('click', function(){
		var questionObj = new Object()
		var hasError = false
		var hasAnswerCorrect = false
		questionObj.idQuiz = $('.quiz_id').val()
		questionObj.questionName = $('.question_text').val()
		var responses = Array()
		$('.item_answer').each(function() {
			var responseObj = new Object()
			var responseCorrect = $(this).find(".is_correct_response input")
			var responseText = $(this).find(".response_text")
			if(responseText.val() === ''){
				hasError = true
			}
			if(responseCorrect.is(':checked')){
				hasAnswerCorrect = true
			}
			responseObj.isCorrect = responseCorrect.is(':checked') ? 1 : 0;
			responseObj.responseText = responseText.val()
			responses.push(responseObj)
		});
		questionObj.response = responses
		console.info(questionObj)
		
		if(questionObj.questionName === ''){
			hasError = true
		}
		
		if(!hasError && hasAnswerCorrect){
			console.log('Todo OK!')
				//Evento ajax
			$.ajax({
				url:		qmaker.url,
				type:		'post',
				datatype:	'json',
				data: 		{
					action: 		'qm_questions_manager',
					nonce:			qmaker.seguridad,
					question:		JSON.parse(JSON.stringify(questionObj)),
					tipo:			'add'
				},
				success: function(data){
					data = JSON.parse(data);
					if(data.result){
						console.log('Todo Ok!');
						var r = confirm("Pregunta agregada correctamente. ¿Deseas agregar más?")
						if(r === true){
							urlAddQuestions += $('.quiz_id').val()
							location.href = urlAddQuestions;
						}else{
							location.href = urlhome;
						}
					}
					console.log('Algo salió mal... ', data)
				},
				error: function(d, x, v){
					console.log(d)
					console.log(x)
					console.log(v)
				}
			})
		}else{
			console.log('No funciona correctamente.. ', hasError , hasAnswerCorrect)
			alert('Debes agregar una pregunta y marcar al menos una respuesta como correcta.')
			hasError = false
			hasAnswerCorrect = false
		}
	 })
	
})( jQuery );


function addItemQuestion(idWrapp, idtemp){
	// console.log('hola..', idtemp)
	var cont = jQuery('.wrapper_anws_'+idWrapp).children().length + 1
	var ans_id = `${idWrapp}_${cont}_${idtemp}`
	jQuery( '.wrapper_anws_'+idWrapp ).append(`
		 <div class="form-row border border-secondary mx-0 mt-2 py-2 px-4 item_answer">
			<div class="col-md-2 custom-checkbox d-flex align-items-center is_correct_response">
				<input type="checkbox" class="custom-control-input response_iscorrect" id="customCheck_${ans_id}">
				<label class="custom-control-label ml-3" for="customCheck_${ans_id}">Correcta</label>
			</div>
			<div class="col-md-8 text_response">
				<label for="inputName_${ans_id}">Respuesta:</label>
				<input type="text" class="form-control response_text" id="inputName_${ans_id}" placeholder="Respuesta">
			</div>
			<div class="col-md-2 d-flex align-items-center pt-2">
				<button type="button" class="btn btn-outline-danger delete-answer-btn">Quitar</button>
			</div>
		</div>
			 `);
 }

 function deleteQuestion(id){
	var r = confirm("La pregunta será removida, ¿esta seguro?")
	if(r === true){
		jQuery('.wrapp_manager_question_'+id).remove()
	}
	 
 }

 function saveChangesQuestions(idQuiz){
	var questions = Array()
	var quiz = new Object()
	quiz.name = jQuery('.name_quiz').val()
	quiz.description = jQuery('.description_quiz').val()
	quiz.total_questions = jQuery('.wrap_main_questions').children().length
	quiz.idQuiz = idQuiz
	jQuery('.wrapper_question').each(function() {
		var questionText = jQuery(this).find('.question_text')
		var questionNmbr = jQuery(this).find('.question_number')
		var questionObj = new Object()
		questionObj.questionName = questionText.val()
		questionObj.questionNmbr = questionNmbr.val()
		var responses = Array()
		jQuery(this).find('.item_answer').each(function(){
			var responseObj = new Object()
			var responseCorrect = jQuery(this).find('.is_correct_response input')
			var responseText = jQuery(this).find('.response_text')
			responseObj.isCorrect = responseCorrect.is(':checked') ? 1 : 0;
			responseObj.responseText = responseText.val()
			responses.push(responseObj)
		})
		questionObj.response = responses
		questions.push(questionObj)
	})
	quiz.questions = questions
	quiz.questions.map(q =>{
		q.response.forEach(anws => {
			//TODO: Validar que al menos una respuesta vaya marcada como correcta, en cada pregunta
			// console.log(anws)
		});
	})
	// console.info(quiz)
	//Evento ajax
	jQuery.ajax({
		url:		qmaker.url,
		type:		'post',
		datatype:	'json',
		data: 		{
			action: 		'qm_questions_manager',
			nonce:			qmaker.seguridad,
			quiz:			JSON.parse(JSON.stringify(quiz)),
			tipo:			'update'
		},
		success: function(data){
			data = JSON.parse(data);
			if(data.result){
				console.info(data)
				alert('Actualizado exitosamente.')
			}
			console.info(data)
		},
		error: function(d, x, v){
			console.log(d)
			console.log(x)
			console.log(v)
		}
	})
 }

 function uniqueid() {
	return Math.random().toString(36).substr(2, 9);
}

 function addQuestionWrap(idQuiz){
	var nmbrQuestion = 	jQuery('.wrap_main_questions').children().length + 1
	var wrapAns = 	(jQuery('.wrap_main_questions').children().length + 1) + uniqueid()
	var ans_id = `${idQuiz}_${nmbrQuestion}_${uniqueid()}`
	console.log('hola....')

	var uid = uniqueid()
	jQuery('.wrap_main_questions').append(`
		<div class="wrapper_question wrapp_manager_question_${nmbrQuestion}  mb-2">
			<div id="question_${nmbrQuestion}" class="border border-primary px-4 py-3">
				<div class="form-group">					
					<label class="counter_question font-weight-bold" for="inputName">Pregunta ${nmbrQuestion}:</label>
					<input type="text" class="form-control question_text" id="inputName" placeholder="Nombre de la pregunta">
					<input type="hidden" class="question_number" value="${nmbrQuestion}">
					<div class="wrapper_anws_${wrapAns}">
						<div class="form-row border border-secondary mx-0 mt-2 py-2 px-4 item_answer">
							<div class="col-md-2 custom-checkbox d-flex align-items-center is_correct_response">
								<input type="checkbox" class="custom-control-input response_iscorrect" id="customCheck_${ans_id}">
								<label class="custom-control-label ml-3" for="customCheck_${ans_id}">Correcta</label>
							</div>
							<div class="col-md-8 text_response">
								<label for="inputName_${nmbrQuestion}">Respuesta: 1</label>
								<input type="text" class="form-control response_text" id="inputName_${nmbrQuestion}" placeholder="respuesta">
							</div>
							<div class="col-md-2 d-flex align-items-center pt-2">
								<button type="button" class="btn btn-outline-danger delete-answer-btn">Quitar</button>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group d-flex justify-content-end">
					<button type="button" onclick="addItemQuestion('${wrapAns}', '${uid}')" class="btn btn-info btn-sm addresponse-btn-edit mr-2">Agregar Respuesta</button>
					<button type="button" onclick="deleteQuestion(${nmbrQuestion})" class="btn btn-danger btn-sm">Quitar pregunta</button>
				</div>
			</div>
		</div>
	`)
	jQuery('.question_text').focus()
 }

