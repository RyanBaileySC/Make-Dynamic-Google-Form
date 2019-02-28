function DynamicFields() {
    
    var label = 'Dynamic Fields'; 
    console.time(label);
    var form = FormApp.create('Dynamic Form');
	var ss = SpreadsheetApp.getActive()
	var sheet = ss.getSheetByName('DynamicPages');
	var sheet_2 = ss.getSheetByName('Values');
    var sheet_3 = ss.getSheetByName('Content')
	var lastC = sheet.getLastColumn();
    var lastR = sheet.getLastRow();
    var content = sheet_3.getRange(1, 2, 9, 1).getValues()
    var c = -1 ; c++
    
    form.setTitle(content[c++][0])
    .setDescription(content[c++][0])
    .setConfirmationMessage(content[c++][0])
    
    var options = form.addPageBreakItem().setTitle(content[c++][0]);
    options.setHelpText(content[c++][0]);
    var opt = form.addListItem();
    opt.setRequired(true);

    
    var collectInfo = form.addPageBreakItem().setTitle(content[c++][0]);
    collectInfo.setHelpText(content[c++][0]);
    
	var pageNav = [];
    var data = sheet.getRange(1, 1, lastR, lastC).getValues();
    var data_2 = sheet_2.getRange(1, 2, lastC, 1).getValues();
	for (var i = 0; i < lastC; i++) {
	
		var pageName = data [0][i];
        var page = form.addPageBreakItem().setTitle(pageName);

		var item = form.addListItem();
		item.setTitle(content[c++][0]);
		item.setHelpText(content[c][0]);
		item.setRequired(true);
        c -= 1

		var numRows = data_2 [i][0];
        
        Logger.log(numRows);
		var schools = [];
            for (var j = 1; j <= numRows; j++) {
            
            var school = data [j][i];
            schools.push(school);
            }
        item.setChoiceValues(schools);

		var other = form.addTextItem();
		other.setTitle("Other:");
        page.setGoToPage(collectInfo);
		pageNav.push(page); 
	}
        
    var choices = []
    
    for (var k = 0; k < lastC; k++) {
      
        choices[k] = opt.createChoice(data [0][k], pageNav[k])
    }
    opt.setChoices(choices);
    var start = collectInfo.getIndex();
    var allItems = form.getItems();
    var finish = allItems.length - 1
    var lastPage = page.length - 1
    page.setGoToPage(collectInfo)
    form.moveItem(start, finish)   
    console.timeEnd(label);

}

      
      
      
      
		
