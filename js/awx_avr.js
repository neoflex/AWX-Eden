/*---------------------------*/
/* AV Receiver communication */
/*---------------------------*/

var avrs = {};

(function($) {
	$.extend(avrs, {
	
	GetAVRInfos: function()  {
				var useDenon = mkf.cookieSettings.get('AVR_Denon', 'no')=='yes'? true : false;
			    if(useDenon) {
					var denonip = mkf.cookieSettings.get('AVR_Denon_IP', '192.168.1.93');
					var denonquickmusic = mkf.cookieSettings.get('AVR_Denon_QuickMusic', '0');
					var denonquickmovie = mkf.cookieSettings.get('AVR_Denon_QuickMovies', '0');
					var denonquicktvshow = mkf.cookieSettings.get('AVR_Denon_QuickTVShows', '0');
					avr.push({type: "denon", ip: denonip, quickmusic: denonquickmusic,quickmovie: denonquickmovie,quicktvshow: denonquicktvshow});				
				}
				return avr;				
	},

	ExecuteCommands: function(settings){
		var avrs = this.GetAVRInfos();
			for(i in avrs ){
				var avr = avrs[i];
				
				switch (avr.type){
					case "denon":
					     
							//switch the avr on
							 var jqxhr = $.ajax({
							 	url: 'http://'+ avr.ip +'/MainZone/index.put.asp?cmd0=PutSystem_OnStandby/ON',
							 })
							 //then switch to the correct settings
							 .complete(function(msg) {
		  						if(settings.mode == "playmusic")
					     		{       
					     			var quick = avr.quickmusic;
					     		}
					     		if(settings.mode == "playmovie")
					     		{       
					     			var quick = avr.quickmovie;
					     		}
					     		if(settings.mode == "playtv")
					     		{       
					     			var quick = avr.quicktvshow;
					     		}
					     	    var jqxhr2 = $.get('http://'+ avr.ip +'/QuickSelect/index.put.asp?cmd0=PutUserMode/Quick'+ quick);
	
							 });
	
	    					 break;
	    			    default:
	    			       break;
				}
			}	
	}
		
	});
})(jQuery);