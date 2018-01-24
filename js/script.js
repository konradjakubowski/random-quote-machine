var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
	$.getJSON(quoteUrl, createTweet);
	$.ajaxSetup({ cache: false });
}

function createTweet(input) {
	var data = input[0];
	
	// z zawartości klucza data: wyciągamy dane/content za pomocą metody .text() i .trim(). trim() ucina space na początku / końcu stringa.
	var quoteText = $(data.content).text().trim();
	var quoteAuthor = data.title;
	
	// jesli dlugosc znaków Author to zero (negacja length) to wyswietl "Unknown author".
	if (!quoteAuthor.length) {
		quoteAuthor = "Unknow author";	
	}
	var tweetText = "Quote of the day - " + quoteText + "Author: " + quoteAuthor;
	
	 // wywołanie funkcji getQuote() --> $.getJSON(quoteUrl, createTweet);
	if (tweetText.length > 140) {
		getQuote();
	}
	else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.quote').text(quoteText);  						// tresc cytatu
		$('.author').text("Author: " + quoteAuthor);		// autor cytatu
		$('.tweet').attr('href', tweet);
	}
}

$(document).ready(function() {
    getQuote();
    $('.trigger').click(function() {
        getQuote();
    })
});

/* 
$.ajax({
    dataType: "json",
    url: quoteUrl,
    data: null,
    success: createTweet
});

to samo co:

function getQuote() {
	$.getJSON(quoteUrl, createTweet);
}
*/