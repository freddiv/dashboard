export default {
	user_data: JSON.parse('{ "gridProperties" : {"width" : "850px", "height": "500px"}, "defaultColDef": { "width": 100,      "editable": true, "filter": "agTextColumnFilter"},"columnDefs": [{"headerName":"","field":"id","hide":false,"suppressFilter": true,"suppressSorting": true,"width":50, "cellRendererFramework": "EditUserLink","autoHeight": true},{"headerName":"Last Name","headerTooltip":"Last Name","field":"last_name","hide":false,"filter":"agTextColumnFilter"},{"headerName":"First Name","headerTooltip":"First Name","field":"first_name","hide":false,"filter":"agTextColumnFilter","width":100},{"headerName":"Email Address","headerTooltip":"Email Address","field":"email","hide":false,"filter":"agTextColumnFilter","width":120},{"headerName":"Description","field":"description","hide":true,"suppressFilter": true,"suppressSorting": true,"width":100},{"headerName":"Active","headerTooltip":"Active","field":"is_active","hide":false,"suppressFilter": true,"width":100,"cellRendererFramework": "RenderIsActive"},{"headerName":"Domains","headerTooltip":"Domains","field":"domains","hide":false,"suppressFilter": false,"suppressSorting": true,"width":100},{"headerName":"Expertise","headerTooltip":"Expertise","field":"expertises","hide":false,"suppressFilter": false,"suppressSorting": true,"width":100},{"headerName":"Sources","field":"sources","hide":false,"suppressFilter": true,"suppressSorting": true,"width":120},{"headerName":"Date Created","field":"date_created","hide":false}],  "rowData" :[{ "id": 1,"first_name": "Frederick","last_name": "Valone", "email": "valone.carlf@epa.gov", "description": "none","is_active": true,"domains": ["NCCT","TOX50"],"expertise": ["exp1","exp2"],  "sources": ["source1","source2"],"date_created": "2018-11-23"}, {"id": 2,"first_name": "Frederick","last_name": "Valone",  "email": "valone.carlf@epa.gov", "description": "none","is_active": true,"domains": ["NCCT","TOX50"], "expertise": ["exp1","exp2"],"sources": ["source1","source2"],"date_created": "2018-11-23"}, {"id": 3,"first_name": "Frederick","last_name": "Valone","email": "valone.carlf@epa.gov", "description": "none", "is_active": true, "domains": ["NCCT","TOX50"], "expertise": ["exp1","exp2"],"sources": ["source1","source2"],"date_created": "2018-11-23"}, { "id": 4,"first_name": "Frederick", "last_name": "Valone","email": "valone.carlf@epa.gov","description": "none", "is_active": true, "domains": ["NCCT","TOX50"], "expertise": ["exp1","exp2"], "sources": ["source1","source2"], "date_created": "2018-11-23"}, { "id": 5, "first_name": "Frederick","last_name": "Valone", "email": "valone.carlf@epa.gov", "description": "none", "is_active": true, "domains": ["NCCT","TOX50"],"expertise": ["exp1","exp2"],"sources": ["source1","source2"],"date_created": "2018-11-23"}, {"id": 6,"first_name": "Jeff", "last_name": "Edwards", "email": "edwards.jeff@epa.gov","description": "none",    "is_active": true,"domains": ["NCCT","TOX50"],"expertise": ["exp1","exp2"],"sources": ["source1","source2"],   "date_created": "2018-11-23"},{"id": 7,"first_name": "Jeremy","last_name": "Dunne","email": "dunne.jeremy@epa.gov",   "description": "none","is_active": true,"domains": ["NCCT","TOX50"],"expertise": ["exp1","exp2"],"sources": ["source1","source2"],   "date_created": "2018-11-23" }] }'),
}