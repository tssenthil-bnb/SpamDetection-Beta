

(function ( $ ) //IIFE 
{
	$.fn.spamDetector = function(options) 
	{	
		var thisObj 	=	this;
		var is_spam 	=	0;


		var settings = $.extend({
			spamWordsInUri  : ['free', 'vote', 'play'],
			bannedWords 	: ['Levitra', 'viagra', 'casino', '*'],
			alertText       : 'Sorry, your content seems spammy , please check',
			onlyReturnStatus: false, 
			spamLevel       : 2,
			checkOnType     : true,
			textLimit 		: 200,
			displayWarning 	: true,
			formObj 		: false,
			warningStyle 	: { 'color': 'red', 'background-color': 'snow', 'padding': '1px','border': '2px solid red'}
		}, options );

		$(settings.errorTextContainer).html('<span id="error_text" style="display:none;">'+settings.alertText+'</span>');
		$('#error_text').css(settings.warningStyle);

		var calculateSpam 		= function(){
			var text	 		= thisObj.val();
			var source   		= (text || '').toString();	
			var spam_point 		= 0;
			var spamWordsInUri;
			var urlArray 		= [];
			var url;
			var matchArray;
			var return_array 	= [];
			var regexToken 		= /(www\.|https?:\/\/)?[a-z0-9]+\.[a-z0-9]{2,4}\S*/gi;

			while( (matchArray = regexToken.exec( source )) !== null )
			{
				var token = matchArray[0];
				urlArray.push( token );
			}

			var number_of_url 	=	urlArray.length;

			if(number_of_url > 0)
			{
				if(number_of_url >= settings.maxUrlAllowed)
				{
					spam_point +=	number_of_url ;
				}
				else
				{
					spamWordsInUri  = ['free', 'vote', 'play'];

					$.each( urlArray, function( index, value )
					{
						if(value.length > settings.maxUrlLength)
							spam_point += 1;

						$.each( settings.spamWordsInUri, function( index, value_spams )
						{

							if (value.toLowerCase().indexOf(value_spams) >= 0)
							{
								spam_point += 1;
							}

						}); 

					}); 

				}
			}

			bannedWords 	  =	['Levitra', 'viagra', 'casino', '*']; 


			$.each( settings.bannedWords, function( index, value )
			{
				if (text.toLowerCase().indexOf(value) >= 0)
				{
					spam_point += 1;
				}


			});

			if(settings.textLimit && settings.textLimit != '')
			{
				if(text.length > settings.textLimit)
				{
					spam_point += settings.spamLevel;
				}
		    }



			if(spam_point >= settings.spamLevel)
			{
				if(! settings.onlyReturnStatus)
				{
					if(settings.displayWarning)
					{
						$('#error_text').show();
					}
				}

				is_spam = 1;

			}
			else
			{
				if(settings.displayWarning)
				{
					$('#error_text').hide();
				}

				is_spam = 0;
			}

			return is_spam;
		};

		if(! settings.onlyReturnStatus)
		{

			if(settings.checkOnType)
			{
				$( thisObj ).bind( "keyup keydown", function(e) {

					calculateSpam();

					if(settings.textLimit && settings.textLimit != '')
					{
						$(settings.limitTextContainer).html("<span id='limit_box'></span>");
						$('#limit_box').css(settings.limitStyle);

						if(thisObj.val().length > settings.textLimit)
						{
							if( e.keyCode === 8 || e.keyCode === 46 ) {
							        return; // backspace (8) / delete (46)
							    }

							if( e.keyCode >= 37 && e.keyCode <= 40 ) {
						        return; // arrow keys
						    }

							e.preventDefault();
							$('#limit_box').text("you can not exceed "+ ((settings.textLimit))+' characters limit');
						}
						else
						{
							$('#limit_box').text("you have " + ((settings.textLimit)-thisObj.val().length)+' characters left');
						}
						
					}

				});
			}

			if($(settings.formObj))
			{
				$( settings.formObj).bind( "submit", function() {

					if(calculateSpam())
						return false;
				});
			}		
			
		}
		else
		{
			return calculateSpam();
		}


	};


}( jQuery ));

