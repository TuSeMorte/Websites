// JavaScript Document
jQuery(function($){
	var vm = new viewModel();
    function Rangers(data){
		var self = this;
        this.ID = ko.observable(data.ID);
		this.FirstName = ko.observable(data.firstname);
        this.LastName = ko.observable(data.lastname);
		this.MI = ko.observable(data.mi || '');
        this.Rank = ko.observable(data.rank);
        this.Type = ko.observable(data.type);
        this.InductionYear = ko.observable(data.inductionyear);
        this.Citation = ko.observable(data.citation);
        this.PhotoName = ko.observable(data.photoname);
		
        this.filteredLastNameAlpha = ko.computed(function() {		
			var filters = vm.FilterNameAlpha().toLowerCase();
			if(!filters && filters.length < 1) {
				return true;
			} else {
				if(self.LastName().toLowerCase().indexOf(filters) > -1){
					return true;
				} else {
					return false;
				}
			}
		});
        this.filteredLastNameSearch = ko.computed(function() {		
			var filters = vm.FilterNameSearch().toLowerCase();
			if(!filters && filters.length < 3) {
				return true;
			} else {
				if(self.LastName().toLowerCase().indexOf(filters) > -1){
					return true;
				} else {
					return false;
				}
			}
		});
        this.filteredYear = ko.computed(function() {		
			var filters = vm.chosenYears();
			if(!filters || filters.length < 1) {
				return true;
			} else {
				if(filters.includes(self.InductionYear())){
					return true;
				} else {
					return false;
				}
			}
		});
	};
	

    
	function viewModel(){
		var self = this;
		this.rangers = ko.observableArray();
		this.FilterNameAlpha = ko.observable('');
        this.FilterNameSearch = ko.observable('');
        this.availableYears = ko.observableArray(['1992', '1993', '1994', '1995', '1996', '1997','1998','1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017','2018','2019','2020','2021']);
                                                 //]),
        this.chosenYears = ko.observableArray([]) // Initially, only Germany is selected

	};
    
    function GetXMLData(){

        
 		var json, json2;
		$.ajax({
			type: "POST",
			url: 'parse-xml.php',
			dataType: 'text',
			async: false,
			cache: false,
			success: function(response) {
				json = response;
				//json2=xmlToJsonCustom(response);
				
			}
		}).done(function(data){
				json = data 
		});
		return json;
	};      
        
    
	$.when(
		GetXMLData()
	).done(function(data){
        console.log(JSON.parse(data).RANGERS);
        vm.rangers(ko.utils.arrayMap(JSON.parse(data).RANGERS.RECORD || [], function(r){
                return new Rangers(r); 
            }));
////		//alert(data);
//		vm.orgUnit(ko.utils.arrayMap(data || [], function(OU){
//						return new OrgUnit(OU); 
//					}));
	});	
	
		ko.applyBindings(vm);
	//});
    
    
});