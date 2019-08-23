var FrameConfig = {
	view: {
		label: "View Document",
		load_schema: false, //should we load the document schema or just use the document frame
		editor: false,
		mode: "view",
		viewer: "html",
		hide_disabled_buttons: true,
		rules: [{
				pattern: { renderer: "object"},
				output: {facet: "page", features: ["body", "type"]}
			},
			{
				pattern: { renderer: "property"},
				output: {facet: "multiline", features: ["body", "label"]}
			},
			{
				pattern: { renderer: "value"},
				output: {facet: "line", features: ["body"]}
			}
		]
	},
	edit: {
		label: "Edit Document",
		load_schema: true, //should we load the document schema or just use the document frame
		hide_disabled_buttons: true,
		editor: true,
		rules: [
			{
				pattern: { renderer: "object"},
				output: {facet: "page"}
			},
			{
				pattern: { renderer: "property"},
				output: {facet: "multiline"}
			},
			{
				pattern: { renderer: "value"},
				output: {facet: "line"}
			}
		],
		mode: "edit",
		features: ["body", "label", "control"],
		viewer: "html"			
	},
	create: {
		label: "Create Document",
		hide_disabled_buttons: true,
		rules: [
			{
				pattern: { renderer: "object", depth: ">0"},
				output: {
					facet: "page",	
					features: ["type", "comment", "body", "control"],
					controls: ["add", "delete"]
				}
				
			},
			{
				pattern: { renderer: "object", depth: 0},
				output: {
					facet: "page",	
					features: ["type", "id", "body", "control"],
					controls: ["add", "update", "cancel"]
				}
				
			},
			{
				pattern: { renderer: "property"},
				output: {
					facet: "multiline",
					features: ["label", "body", "control"],
					controls: ["add"]
				}
			},
			{
				pattern: { renderer: "value"},
				output: {
					facet: "line",
					features: ["body"]
				}
			},
			{
				pattern: { renderer: "value", property: "rdfs:comment"},
				output: {
					viewerType: "HTMLStringEditor",
					viewerOptions: { big: true},
					features: ["body"],
				}
			},
			{
				pattern: { renderer: "object", property: "dcog:temporality"},
				output: {
					facet: "summary",
					features: ["body", "control"],
					controls: ["view"]
				}
			}


		],
		editor: true,
		mode: "edit",
		viewer: "html"			
	},
	model: {
		label: "Class Frame Schema",
		rules: [
			{
				pattern: { renderer: "object"},
				output: {
					facet: "page",	
					features: ["type", "comment", "body"]
				}
			},
			{
				pattern: { renderer: "property"},
				output: {
					features: ["label", "id", "type", "comment", "body"]
				}
			},
			{
				pattern: { renderer: "value"},
				output: {
					features: []
				}
			}
		],
		editor: true,
		facet: "page",
		mode: "view",
		viewer: "html"			
	},
	expert: {
		label: "Expert Mode",
		features: ["body", "id", "type", "summary", "status", "label", "facet", "control", "viewer", "view", "comment"],
		controls: ["delete", "clone", "add", "reset", "cancel", "update", "mode", "show", "hide"],
		editor: true,
		facet: "page",
		mode: "edit",
		viewer: "html"						
	}
};
