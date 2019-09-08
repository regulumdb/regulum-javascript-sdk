function WOQLTextboxGenerator(tq, qman, ui){
	this.query = tq;
	this.wquery = qman.wquery;
	this.ui = ui;
	// default datatable settings if datatable plug in available
	this.datatable = {};
	this.datatable.pageLength = 5;
	this.datatable.start = 0;
}

WOQLTextboxGenerator.prototype.gatherDatatableSettings = function(txtArea, queryName){
	this.datatable.qTextDom =  txtArea;
	this.datatable.query =  queryName;
	this.datatable.chosenValue = null;
}

WOQLTextboxGenerator.prototype.getAsDOM = function(q){
	var qbox = document.createElement("div");
	qbox.setAttribute("class", "terminus-query-textbox-input");
	var qip = document.createElement("textarea");
	qip.setAttribute("class", "terminus-query-box");
	qip.setAttribute("placeholder", "Enter new query or load queries from example buttons provided below ...");
	qip.setAttribute("style", "min-width: 400px; min-height: 60px;");
	if(q) qip.value = q;
	qbox.appendChild(qip);
	stylizeEditor(this.ui, qip);
	var self = this;
	var qbut = document.createElement("button");
	qbut.setAttribute("class", "terminus-control-button terminus-btn")
	qbut.appendChild(document.createTextNode("Send Query"));
	qbut.addEventListener("click", function(){
		if(self.ui.pluginAvailable("datatables")){
			self.gatherDatatableSettings(qip, 'Any_Query');
			self.query(qip.value, self.datatable);
		}
		else self.query(qip.value);
	})
	var qbuts = document.createElement("div");
	qbuts.setAttribute("class", "terminus-control-buttons");
	qbuts.appendChild(qbut);
	qbox.appendChild(qbuts);
	var qexs = document.createElement("div");
	qexs.setAttribute("class", "terminus-query-examples terminus-db-list-title ");
	var qh = document.createElement("H3");
	qh.appendChild(document.createTextNode("Examples"));
	qh.setAttribute('class', 'terminus-full-css-margin-top terminus-module-head');
	qexs.appendChild(qh);
	var nqbut = document.createElement("button");
	nqbut.appendChild(document.createTextNode("Show All Classes"));
	nqbut.setAttribute("class", "terminus-control-button terminus-btn");
	nqbut.addEventListener("click", function(){
		deleteStylizedEditor(self.ui, qip);
		qip.value = self.wquery.getClassMetaDataQuery(null, self.datatable.pageLength, self.datatable.start);
		stylizeEditor(self.ui, qip);
		if(self.ui.pluginAvailable("datatables")){
			self.gatherDatatableSettings(qip, 'Show_All_Classes');
			self.query(qip.value, self.datatable);
		}
		else self.query(qip.value);
	})

	var aqbut = document.createElement("button");
	aqbut.appendChild(document.createTextNode("Show Document Classes"));
	aqbut.setAttribute("class", "terminus-control-button terminus-btn");
	aqbut.addEventListener("click", function(){
		deleteStylizedEditor(self.ui, qip);
		qip.value = self.wquery.getClassMetaDataQuery(self.wquery.getSubclassQueryPattern("Class", "dcog/'Document'")
														+ ", not(" + self.wquery.getAbstractQueryPattern("Class") + ")",
														self.datatable.pageLength, self.datatable.start);
		stylizeEditor(self.ui, qip);
		if(self.ui.pluginAvailable("datatables")){
			self.gatherDatatableSettings(qip, 'Show_Document_Classes');
			self.query(qip.value, self.datatable);
		}
		else self.query(qip.value);
	})

	var ebut = document.createElement("button");
	ebut.appendChild(document.createTextNode("Show All Schema Elements"));
	ebut.setAttribute("class", "terminus-control-button terminus-btn");
	var self = this;
	ebut.addEventListener("click", function(){
		deleteStylizedEditor(self.ui, qip);
		qip.value = self.wquery.getElementMetaDataQuery(null, self.datatable.pageLength, self.datatable.start);
		stylizeEditor(self.ui, qip);
		if(self.ui.pluginAvailable("datatables")){
			self.gatherDatatableSettings(qip, 'Show_All_Schema_Elements');
			self.query(qip.value, self.datatable);
		}
		else self.query(qip.value);
	})
	var dbut = document.createElement("button");
	dbut.appendChild(document.createTextNode("Show All Documents"));
	dbut.setAttribute("class", "terminus-control-button terminus-btn");
	dbut.addEventListener("click", function(){
		deleteStylizedEditor(self.ui, qip);
		qip.value = self.wquery.getAllDocumentQuery(null, self.datatable.pageLength, self.datatable.start);
		stylizeEditor(self.ui, qip);
		if(self.ui.pluginAvailable("datatables")){
			self.gatherDatatableSettings(qip, 'Show_All_Documents');
			self.query(qip.value, self.datatable);
		}
		else self.query(qip.value);
	})
	var pbut = document.createElement("button");
	pbut.appendChild(document.createTextNode("Show All Data"));
	pbut.setAttribute("class", "terminus-control-button terminus-btn");
	pbut.addEventListener("click", function(){
		deleteStylizedEditor(self.ui, qip);
		qip.value = self.wquery.getEverythingQuery(null, self.datatable.pageLength, self.datatable.start);
		stylizeEditor(self.ui, qip);
		if(self.ui.pluginAvailable("datatables")){
			self.gatherDatatableSettings(qip, 'Show_All_Data');
			self.query(qip.value, self.datatable);
		}
		else self.query(qip.value);
	})

	var prbut = document.createElement("button");
	prbut.appendChild(document.createTextNode("Show All Properties"));
	prbut.setAttribute("class", "terminus-control-button terminus-btn");
	prbut.addEventListener("click", function(){
		deleteStylizedEditor(self.ui, qip);
		qip.value = self.wquery.getPropertyListQuery(null, self.datatable.pageLength, self.datatable.start);
		stylizeEditor(self.ui, qip);
		if(self.ui.pluginAvailable("datatables")){
			self.gatherDatatableSettings(qip, 'Show_All_Properties');
			self.query(qip.value, self.datatable);
		}
		else self.query(qip.value);
	})

	var termcc = new TerminusClassChooser(this.ui);
	termcc.empty_choice = "View data of type...";
	var self = this;
	termcc.change = function(new_class){
		if(new_class){
			deleteStylizedEditor(self.ui, qip);
			qip.value = self.wquery.getDataOfChosenClassQuery(new_class, self.datatable.pageLength, self.datatable.start);
			stylizeEditor(self.ui, qip);
			if(self.ui.pluginAvailable("datatables")){
				self.gatherDatatableSettings(qip, 'Show_Data_Class');
				self.datatable.chosenValue = new_class; // set chosen val from drop down
				self.query(qip.value, self.datatable);
			}
			else self.query(qip.value);
		}
	}
	var tcdom = termcc.getAsDOM();

	var termpc = new TerminusPropertyChooser(this.ui);
	termpc.empty_choice = "Show data for property...";
	var self = this;
	termpc.change = function(new_property){
		if(new_property){
			deleteStylizedEditor(self.ui, qip);
			qip.value = self.wquery.getDataOfChosenPropertyQuery(new_property, self.datatable.pageLength, self.datatable.start);
			stylizeEditor(self.ui, qip);
			if(self.ui.pluginAvailable("datatables")){
				self.gatherDatatableSettings(qip, 'Show_Property_Class');
				self.datatable.chosenValue = new_property; // set chosen val from drop down
				self.query(qip.value, self.datatable);
			}
			else self.query(qip.value);
		}
	}
	var pdom = termpc.getAsDOM();

	var dcip = document.createElement("input");
	dcip.setAttribute("class", "terminus-form-value terminus-document-chooser terminus-doc-input-text");
	dcip.setAttribute("placeholder", "Enter Document ID");
	dcip.addEventListener('keypress', function(e){
		// on enter
		var key = e.which || e.keyCode;
		if (key === 13) { // 13 is enter
			deleteStylizedEditor(self.ui, qip);
    		qip.value = self.wquery.getDocumentQuery(dcip.value, self.datatable.pageLength, self.datatable.start);
    		stylizeEditor(self.ui, qip);
			if(self.ui.pluginAvailable("datatables")){
				self.gatherDatatableSettings(qip, 'Show_Document_Info_by_Id');
				self.datatable.chosenValue = dcip.value; // store entred id
				self.query(qip.value, self.datatable);
			}
			else self.query(qip.value);
		}
	})

	qexs.appendChild(ebut);
	qexs.appendChild(nqbut);
	qexs.appendChild(aqbut);
	qexs.appendChild(prbut);
	qexs.appendChild(dbut);
	qexs.appendChild(pbut);
	qbox.appendChild(qexs);
	qbox.appendChild(tcdom);
	qbox.appendChild(pdom);
	qbox.appendChild(dcip);

	return qbox;
}
